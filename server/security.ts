import crypto from 'node:crypto';
import type { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { query } from './db';

const SESSION_COOKIE = 'wm_session';
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

export type AuthenticatedRequest = Request & {
  admin?: { id: number; email: string };
  csrfToken?: string;
};

function randomToken(bytes = 32) {
  return crypto.randomBytes(bytes).toString('hex');
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: SESSION_TTL_MS,
  };
}

export async function ensureOwnerAccount() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  let passwordHash = process.env.ADMIN_PASSWORD_HASH?.trim();
  const initialPassword = process.env.ADMIN_PASSWORD;
  if (!passwordHash && initialPassword) {
    passwordHash = await bcrypt.hash(initialPassword, 12);
  }
  if (!email || !passwordHash) {
    console.warn('CMS admin is not configured. Set ADMIN_EMAIL and ADMIN_PASSWORD_HASH (or ADMIN_PASSWORD) to enable login.');
    return;
  }

  await query(
    `INSERT INTO admins (email, password_hash)
     VALUES ($1, $2)
     ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash, updated_at = NOW()`,
    [email, passwordHash],
  );
}

export async function authenticateOwner(email: string, password: string) {
  const normalizedEmail = email.trim().toLowerCase();
  const result = await query<{ id: number; email: string; password_hash: string }>(
    'SELECT id, email, password_hash FROM admins WHERE email = $1 LIMIT 1',
    [normalizedEmail],
  );
  const admin = result.rows[0];
  const valid = admin ? await bcrypt.compare(password, admin.password_hash) : false;
  if (!valid || !admin) return null;
  return { id: admin.id, email: admin.email };
}

export async function createSession(adminId: number) {
  const sessionId = randomToken();
  const csrfToken = randomToken(24);
  await query(
    `INSERT INTO sessions (id, admin_id, csrf_token, expires_at)
     VALUES ($1, $2, $3, NOW() + INTERVAL '7 days')`,
    [sessionId, adminId, csrfToken],
  );
  return { sessionId, csrfToken };
}

export async function destroySession(sessionId?: string) {
  if (sessionId) await query('DELETE FROM sessions WHERE id = $1', [sessionId]);
}

export async function getSession(sessionId?: string) {
  if (!sessionId) return null;
  const result = await query<{ id: string; admin_id: number; email: string; csrf_token: string }>(
    `SELECT sessions.id, sessions.admin_id, admins.email, sessions.csrf_token
     FROM sessions
     INNER JOIN admins ON admins.id = sessions.admin_id
     WHERE sessions.id = $1 AND sessions.expires_at > NOW()
     LIMIT 1`,
    [sessionId],
  );
  return result.rows[0] ?? null;
}

export async function requireAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const session = await getSession(req.cookies?.[SESSION_COOKIE]);
    if (!session) {
      res.status(401).json({ error: 'Authentication required.' });
      return;
    }
    req.admin = { id: session.admin_id, email: session.email };
    req.csrfToken = session.csrf_token;
    next();
  } catch {
    res.status(401).json({ error: 'Authentication required.' });
  }
}

export function requireCsrf(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  if (!req.csrfToken || req.get('x-csrf-token') !== req.csrfToken) {
    res.status(403).json({ error: 'Invalid security token.' });
    return;
  }
  next();
}

export { SESSION_COOKIE };