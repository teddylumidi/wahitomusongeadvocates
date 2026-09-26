import type { Express, NextFunction, Request, Response } from 'express';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import multer from 'multer';
import sanitizeHtml from 'sanitize-html';
import { fileTypeFromBuffer } from 'file-type';
import sharp from 'sharp';
import bcrypt from 'bcryptjs';
import { query } from './db';
import {
  authenticateOwner,
  createSession,
  destroySession,
  ensureOwnerAccount,
  requireAuth,
  requireCsrf,
  SESSION_COOKIE,
  type AuthenticatedRequest,
  sessionCookieOptions,
} from './security';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024, files: 1 },
});

const richTextOptions: sanitizeHtml.IOptions = {
  allowedTags: [
    'p',
    'br',
    'h2',
    'h3',
    'h4',
    'strong',
    'em',
    'u',
    'a',
    'ol',
    'ul',
    'li',
    'blockquote',
    'img',
  ],
  allowedAttributes: {
    a: ['href', 'target', 'rel'],
    img: ['src', 'alt'],
  },
  allowedSchemes: ['http', 'https', 'mailto'],
  disallowedTagsMode: 'discard',
};

function cleanText(value: unknown, maxLength: number) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function cleanSlug(value: unknown) {
  return cleanText(value, 180)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function cleanTags(value: unknown) {
  if (Array.isArray(value)) {
    return value
      .filter((tag): tag is string => typeof tag === 'string')
      .map((tag) => cleanText(tag, 40))
      .filter(Boolean)
      .slice(0, 20);
  }
  return cleanText(value, 400)
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean)
    .slice(0, 20);
}

function publicPost(row: Record<string, any>) {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    content: row.content,
    featuredImage: row.featured_image_id ? `/api/uploads/${row.featured_image_id}` : null,
    category: row.category,
    tags: row.tags ?? [],
    author: row.author,
    status: row.status,
    publicationDate: row.publication_date,
    publishedAt: row.published_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    seoTitle: row.seo_title,
    seoDescription: row.seo_description,
    canonicalUrl: row.canonical_url,
  };
}

function adminPost(row: Record<string, any>) {
  return publicPost(row);
}

function postPayload(body: Record<string, unknown>) {
  const title = cleanText(body.title, 180);
  const slug = cleanSlug(body.slug || title);
  const content = sanitizeHtml(cleanText(body.content, 500000), richTextOptions);
  const excerpt = cleanText(body.excerpt, 600);
  if (!title || !slug) throw new Error('A title and valid slug are required.');
  return {
    title,
    slug,
    excerpt,
    content,
    category: cleanText(body.category, 100) || 'Insights',
    tags: cleanTags(body.tags),
    author: cleanText(body.author, 180) || 'Wahito Musonge & Company Advocates LLP',
    status: body.status === 'published' ? 'published' : 'draft',
    publicationDate: body.publicationDate ? new Date(String(body.publicationDate)) : null,
    seoTitle: cleanText(body.seoTitle, 180) || title,
    seoDescription: cleanText(body.seoDescription, 320) || excerpt,
    canonicalUrl: cleanText(body.canonicalUrl, 500),
  };
}

function handleError(error: unknown, res: Response) {
  if (error instanceof Error && error.message.includes('duplicate key')) {
    res.status(409).json({ error: 'That slug is already in use. Choose a different slug.' });
    return;
  }
  if (error instanceof Error && error.message.includes('required')) {
    res.status(400).json({ error: error.message });
    return;
  }
  console.error(error);
  res.status(500).json({ error: 'The request could not be completed.' });
}

export async function registerApi(app: Express) {
  app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  }));
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: false, limit: '1mb' }));
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Cache-Control', req.path.startsWith('/api/') ? 'no-store' : 'public, max-age=300');
    next();
  });

  try {
    await ensureOwnerAccount();
  } catch (error) {
    console.error('CMS owner setup failed. Admin operations will remain unavailable until the database is ready.', error);
  }

  const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: { error: 'Too many login attempts. Try again later.' },
  });

  app.get('/api/auth/session', async (req, res) => {
    const sessionId = req.cookies?.[SESSION_COOKIE];
    if (!sessionId) {
      res.json({ authenticated: false });
      return;
    }
    try {
      const { getSession } = await import('./security');
      const session = await getSession(sessionId);
      res.json(session
        ? { authenticated: true, email: session.email, csrfToken: session.csrf_token }
        : { authenticated: false });
    } catch {
      res.json({ authenticated: false });
    }
  });

  app.post('/api/auth/login', loginLimiter, async (req, res) => {
    try {
      const email = cleanText(req.body.email, 320);
      const password = typeof req.body.password === 'string' ? req.body.password : '';
      if (!email || !password) {
        res.status(401).json({ error: 'Invalid email or password.' });
        return;
      }
      const admin = await authenticateOwner(email, password);
      if (!admin) {
        res.status(401).json({ error: 'Invalid email or password.' });
        return;
      }
      const session = await createSession(admin.id);
      res.cookie(SESSION_COOKIE, session.sessionId, sessionCookieOptions());
      res.json({ authenticated: true, email: admin.email, csrfToken: session.csrfToken });
    } catch {
      res.status(503).json({ error: 'Admin login is not configured yet.' });
    }
  });

  app.post('/api/auth/logout', requireAuth, requireCsrf, async (req: AuthenticatedRequest, res) => {
    await destroySession(req.cookies?.[SESSION_COOKIE]);
    res.clearCookie(SESSION_COOKIE, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production' });
    res.json({ authenticated: false });
  });

  app.post('/api/admin/account/password', requireAuth, requireCsrf, async (req: AuthenticatedRequest, res) => {
    const currentPassword = typeof req.body.currentPassword === 'string' ? req.body.currentPassword : '';
    const newPassword = typeof req.body.newPassword === 'string' ? req.body.newPassword : '';
    if (newPassword.length < 12) {
      res.status(400).json({ error: 'Use a password with at least 12 characters.' });
      return;
    }
    const result = await query<{ password_hash: string }>(
      'SELECT password_hash FROM admins WHERE id = $1 LIMIT 1',
      [req.admin?.id],
    );
    const admin = result.rows[0];
    if (!admin || !(await bcrypt.compare(currentPassword, admin.password_hash))) {
      res.status(401).json({ error: 'Current password is incorrect.' });
      return;
    }
    const passwordHash = await bcrypt.hash(newPassword, 12);
    await query('UPDATE admins SET password_hash = $1, updated_at = NOW() WHERE id = $2', [
      passwordHash,
      req.admin?.id,
    ]);
    res.json({ updated: true });
  });

  app.get('/api/public/posts', async (_req, res) => {
    try {
      const result = await query(
        `SELECT * FROM posts
         WHERE status = 'published' AND (publication_date IS NULL OR publication_date <= NOW())
         ORDER BY COALESCE(publication_date, published_at, created_at) DESC`,
      );
      res.json(result.rows.map(publicPost));
    } catch {
      res.status(500).json({ error: 'Articles are temporarily unavailable.' });
    }
  });

  app.get('/api/public/posts/:slug', async (req, res) => {
    try {
      const result = await query(
        `SELECT * FROM posts
         WHERE slug = $1 AND status = 'published' AND (publication_date IS NULL OR publication_date <= NOW())
         LIMIT 1`,
        [req.params.slug],
      );
      if (!result.rows[0]) {
        res.status(404).json({ error: 'Article not found.' });
        return;
      }
      res.json(publicPost(result.rows[0]));
    } catch {
      res.status(500).json({ error: 'Article is temporarily unavailable.' });
    }
  });

  app.get('/api/uploads/:id', async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id < 1) {
      res.status(404).end();
      return;
    }
    const result = await query<{ mime_type: string; data: Buffer; filename: string }>(
      'SELECT mime_type, data, filename FROM uploads WHERE id = $1 LIMIT 1',
      [id],
    );
    const file = result.rows[0];
    if (!file) {
      res.status(404).end();
      return;
    }
    res.setHeader('Content-Type', file.mime_type);
    res.setHeader('Content-Disposition', `inline; filename="${file.filename.replace(/[^a-zA-Z0-9._-]/g, '_')}"`);
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    res.send(file.data);
  });

  app.use('/api/admin', requireAuth);

  app.get('/api/admin/overview', async (_req: AuthenticatedRequest, res) => {
    const result = await query<{ status: string; count: string }>(
      'SELECT status, COUNT(*)::text AS count FROM posts GROUP BY status',
    );
    const recent = await query(
      'SELECT * FROM posts ORDER BY updated_at DESC LIMIT 5',
    );
    const counts = Object.fromEntries(result.rows.map((item) => [item.status, Number(item.count)]));
    res.json({ published: counts.published ?? 0, drafts: counts.draft ?? 0, recent: recent.rows.map(adminPost) });
  });

  app.get('/api/admin/posts', async (req: AuthenticatedRequest, res) => {
    const status = req.query.status === 'published' || req.query.status === 'draft'
      ? String(req.query.status)
      : null;
    const search = cleanText(req.query.search, 120);
    const params: unknown[] = [];
    const where: string[] = [];
    if (status) {
      params.push(status);
      where.push(`status = $${params.length}`);
    }
    if (search) {
      params.push(`%${search}%`);
      where.push(`(title ILIKE $${params.length} OR slug ILIKE $${params.length})`);
    }
    const result = await query(
      `SELECT * FROM posts ${where.length ? `WHERE ${where.join(' AND ')}` : ''}
       ORDER BY updated_at DESC`,
      params,
    );
    res.json(result.rows.map(adminPost));
  });

  app.get('/api/admin/posts/:id', async (req: AuthenticatedRequest, res) => {
    const result = await query('SELECT * FROM posts WHERE id = $1 LIMIT 1', [Number(req.params.id)]);
    if (!result.rows[0]) {
      res.status(404).json({ error: 'Post not found.' });
      return;
    }
    res.json(adminPost(result.rows[0]));
  });

  app.post('/api/admin/uploads', requireCsrf, upload.single('image'), async (req: AuthenticatedRequest, res) => {
    try {
      if (!req.file) {
        res.status(400).json({ error: 'Choose an image to upload.' });
        return;
      }
      const detected = await fileTypeFromBuffer(req.file.buffer);
      const allowed = new Set(['jpg', 'jpeg', 'png', 'webp', 'gif']);
      if (!detected || !allowed.has(detected.ext)) {
        res.status(400).json({ error: 'Only JPG, PNG, WEBP, or GIF images are allowed.' });
        return;
      }
      const output = detected.ext === 'gif'
        ? req.file.buffer
        : await sharp(req.file.buffer).rotate().webp({ quality: 82 }).toBuffer();
      const mimeType = detected.ext === 'gif' ? 'image/gif' : 'image/webp';
      const filename = `${cryptoSafeFilename(req.file.originalname)}.${detected.ext === 'gif' ? 'gif' : 'webp'}`;
      const altText = cleanText(req.body.altText, 180);
      const result = await query<{ id: number }>(
        'INSERT INTO uploads (filename, mime_type, alt_text, data) VALUES ($1, $2, $3, $4) RETURNING id',
        [filename, mimeType, altText, output],
      );
      res.status(201).json({ id: result.rows[0].id, url: `/api/uploads/${result.rows[0].id}`, altText });
    } catch (error) {
      handleError(error, res);
    }
  });

  app.post('/api/admin/posts', requireCsrf, async (req: AuthenticatedRequest, res) => {
    try {
      const payload = postPayload(req.body);
      const result = await query(
        `INSERT INTO posts
          (title, slug, excerpt, content, featured_image_id, category, tags, author, status,
           publication_date, seo_title, seo_description, canonical_url, published_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13,
           CASE WHEN $9 = 'published' THEN NOW() ELSE NULL END, NOW())
         RETURNING *`,
        [
          payload.title,
          payload.slug,
          payload.excerpt,
          payload.content,
          req.body.featuredImageId ? Number(req.body.featuredImageId) : null,
          payload.category,
          payload.tags,
          payload.author,
          payload.status,
          payload.publicationDate,
          payload.seoTitle,
          payload.seoDescription,
          payload.canonicalUrl,
        ],
      );
      res.status(201).json(adminPost(result.rows[0]));
    } catch (error) {
      handleError(error, res);
    }
  });

  app.put('/api/admin/posts/:id', requireCsrf, async (req: AuthenticatedRequest, res) => {
    try {
      const payload = postPayload(req.body);
      const id = Number(req.params.id);
      const result = await query(
        `UPDATE posts SET
          title = $1, slug = $2, excerpt = $3, content = $4, featured_image_id = $5,
          category = $6, tags = $7, author = $8, status = $9, publication_date = $10,
          seo_title = $11, seo_description = $12, canonical_url = $13,
          published_at = CASE WHEN $9 = 'published' THEN COALESCE(published_at, NOW()) ELSE NULL END,
          updated_at = NOW()
         WHERE id = $14 RETURNING *`,
        [
          payload.title,
          payload.slug,
          payload.excerpt,
          payload.content,
          req.body.featuredImageId ? Number(req.body.featuredImageId) : null,
          payload.category,
          payload.tags,
          payload.author,
          payload.status,
          payload.publicationDate,
          payload.seoTitle,
          payload.seoDescription,
          payload.canonicalUrl,
          id,
        ],
      );
      if (!result.rows[0]) {
        res.status(404).json({ error: 'Post not found.' });
        return;
      }
      res.json(adminPost(result.rows[0]));
    } catch (error) {
      handleError(error, res);
    }
  });

  app.post('/api/admin/posts/:id/publish', requireCsrf, async (req: AuthenticatedRequest, res) => {
    const result = await query(
      `UPDATE posts SET status = 'published', published_at = COALESCE(published_at, NOW()),
       publication_date = COALESCE(publication_date, NOW()), updated_at = NOW()
       WHERE id = $1 RETURNING *`,
      [Number(req.params.id)],
    );
    if (!result.rows[0]) {
      res.status(404).json({ error: 'Post not found.' });
      return;
    }
    res.json(adminPost(result.rows[0]));
  });

  app.post('/api/admin/posts/:id/unpublish', requireCsrf, async (req: AuthenticatedRequest, res) => {
    const result = await query(
      `UPDATE posts SET status = 'draft', updated_at = NOW() WHERE id = $1 RETURNING *`,
      [Number(req.params.id)],
    );
    if (!result.rows[0]) {
      res.status(404).json({ error: 'Post not found.' });
      return;
    }
    res.json(adminPost(result.rows[0]));
  });

  app.delete('/api/admin/posts/:id', requireCsrf, async (req: AuthenticatedRequest, res) => {
    const result = await query('DELETE FROM posts WHERE id = $1 RETURNING id', [Number(req.params.id)]);
    if (!result.rows[0]) {
      res.status(404).json({ error: 'Post not found.' });
      return;
    }
    res.status(204).end();
  });
}

function cryptoSafeFilename(originalName: string) {
  const base = originalName.replace(/\.[^.]+$/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  return (base || 'article-image').slice(0, 80);
}
