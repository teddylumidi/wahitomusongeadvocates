import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { ArrowLeft, Check, Eye, FilePlus2, LayoutDashboard, LogOut, Pencil, Search, Trash2 } from 'lucide-react';

type CmsPost = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string | null;
  category: string;
  tags: string[];
  author: string;
  status: 'draft' | 'published';
  publicationDate: string | null;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  seoTitle: string;
  seoDescription: string;
  canonicalUrl: string;
};

const baseUrl = import.meta.env.BASE_URL;

function csrfToken() {
  return sessionStorage.getItem('cms_csrf') ?? '';
}

async function api<T>(path: string, options: RequestInit = {}) {
  const headers = new Headers(options.headers);
  if (options.body && !(options.body instanceof FormData)) headers.set('Content-Type', 'application/json');
  const token = csrfToken();
  if (token) headers.set('x-csrf-token', token);
  const response = await fetch(path, { ...options, headers, credentials: 'include' });
  const body = response.status === 204 ? null : await response.json().catch(() => null);
  if (!response.ok) throw new Error(body?.error || 'The request could not be completed.');
  return body as T;
}

function useAdminSession() {
  const [ready, setReady] = useState(false);
  const [email, setEmail] = useState('');
  useEffect(() => {
    api<{ authenticated: boolean; email?: string; csrfToken?: string }>('/api/auth/session')
      .then((session) => {
        if (!session.authenticated) {
          window.location.href = `${baseUrl}admin/login`;
          return;
        }
        if (session.csrfToken) sessionStorage.setItem('cms_csrf', session.csrfToken);
        setEmail(session.email ?? '');
        setReady(true);
      })
      .catch(() => {
        window.location.href = `${baseUrl}admin/login`;
      });
  }, []);
  return { ready, email };
}

function AdminShell({ children, email }: { children: ReactNode; email: string }) {
  async function logout() {
    await api('/api/auth/logout', { method: 'POST' }).catch(() => undefined);
    sessionStorage.removeItem('cms_csrf');
    window.location.href = `${baseUrl}admin/login`;
  }

  return (
    <div className="min-h-screen bg-[#f7f7f5] text-primary">
      <header className="border-b border-black/10 bg-[#171717] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-8">
          <a href={`${baseUrl}admin`} className="font-serif text-xl">Wahito CMS</a>
          <div className="flex items-center gap-4 text-xs">
            <span className="hidden text-white/60 sm:inline">{email}</span>
            <button onClick={logout} className="inline-flex items-center gap-2 border border-white/25 px-3 py-2 uppercase tracking-widest hover:bg-white/10">
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>
      </header>
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-8 md:flex-row md:px-8">
        <aside className="w-full shrink-0 md:w-56">
          <nav className="grid gap-1 text-sm">
            <AdminNavLink href={`${baseUrl}admin`} icon={<LayoutDashboard size={16} />}>Dashboard</AdminNavLink>
            <AdminNavLink href={`${baseUrl}admin/posts`} icon={<Pencil size={16} />}>Manage posts</AdminNavLink>
            <AdminNavLink href={`${baseUrl}admin/posts/new`} icon={<FilePlus2 size={16} />}>Create new post</AdminNavLink>
            <AdminNavLink href={`${baseUrl}admin/account`} icon={<LogOut size={16} />}>Account security</AdminNavLink>
            <a href={`${baseUrl}`} className="mt-5 inline-flex items-center gap-2 px-3 py-2 text-primary/60 hover:text-secondary">
              <ArrowLeft size={16} /> View public site
            </a>
          </nav>
        </aside>
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}

function AdminNavLink({ href, icon, children }: { href: string; icon: ReactNode; children: ReactNode }) {
  return <a href={href} className="inline-flex items-center gap-3 border border-transparent px-3 py-3 font-medium hover:border-black/10 hover:bg-white">{icon}{children}</a>;
}

function PageHeading({ eyebrow, title, action }: { eyebrow: string; title: string; action?: ReactNode }) {
  return (
    <div className="mb-8 flex flex-col gap-5 border-b border-black/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-secondary">{eyebrow}</p>
        <h1 className="font-serif text-4xl text-primary">{title}</h1>
      </div>
      {action}
    </div>
  );
}

export function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      const result = await api<{ csrfToken: string }>('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      sessionStorage.setItem('cms_csrf', result.csrfToken);
      window.location.href = `${baseUrl}admin`;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid email or password.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#171717] px-5 py-12">
      <div className="w-full max-w-md bg-white p-8 md:p-12">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-secondary">Owner access</p>
        <h1 className="font-serif text-4xl text-primary">Sign in to the CMS</h1>
        <p className="mt-5 text-sm leading-7 text-primary/70">Manage articles and legal insights securely from one place.</p>
        <form onSubmit={submit} className="mt-8 grid gap-5">
          <label className="grid gap-2 text-xs font-semibold uppercase tracking-widest">
            Email
            <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" autoComplete="username" required className="border border-black/15 px-4 py-3 text-sm font-normal tracking-normal outline-none focus:border-secondary" />
          </label>
          <label className="grid gap-2 text-xs font-semibold uppercase tracking-widest">
            Password
            <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" autoComplete="current-password" required className="border border-black/15 px-4 py-3 text-sm font-normal tracking-normal outline-none focus:border-secondary" />
          </label>
          {error && <p role="alert" className="bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
          <button disabled={busy} className="bg-primary px-5 py-4 text-xs font-semibold uppercase tracking-widest text-white hover:bg-secondary disabled:opacity-60">
            {busy ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
        <a href={`${baseUrl}`} className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary/60 hover:text-secondary"><ArrowLeft size={14} /> Back to website</a>
      </div>
    </div>
  );
}

export function AdminDashboardPage() {
  const session = useAdminSession();
  const [data, setData] = useState<{ published: number; drafts: number; recent: CmsPost[] } | null>(null);
  useEffect(() => {
    if (session.ready) api<typeof data>('/api/admin/overview').then(setData).catch(() => undefined);
  }, [session.ready]);
  if (!session.ready || !data) return <AdminLoading />;
  return (
    <AdminShell email={session.email}>
      <PageHeading eyebrow="Overview" title="Dashboard" action={<a href={`${baseUrl}admin/posts/new`} className="bg-primary px-5 py-3 text-xs font-semibold uppercase tracking-widest text-white hover:bg-secondary">Create new post</a>} />
      <div className="grid gap-4 sm:grid-cols-2">
        <StatCard label="Published posts" value={data.published} />
        <StatCard label="Draft posts" value={data.drafts} />
      </div>
      <section className="mt-8 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center justify-between"><h2 className="font-serif text-2xl">Recently updated</h2><a href={`${baseUrl}admin/posts`} className="text-xs uppercase tracking-widest text-secondary hover:text-primary">Manage all</a></div>
        <PostTable posts={data.recent} compact />
      </section>
    </AdminShell>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return <div className="bg-white p-6 shadow-sm"><p className="text-xs uppercase tracking-widest text-primary/60">{label}</p><p className="mt-3 font-serif text-5xl text-secondary">{value}</p></div>;
}

export function AdminPostsPage() {
  const session = useAdminSession();
  const [posts, setPosts] = useState<CmsPost[]>([]);
  const [status, setStatus] = useState('');
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  async function load() {
    const params = new URLSearchParams();
    if (status) params.set('status', status);
    if (category) params.set('category', category);
    if (search) params.set('search', search);
    try { setPosts(await api<CmsPost[]>(`/api/admin/posts?${params}`)); } catch (err) { setError(err instanceof Error ? err.message : 'Unable to load posts.'); }
  }
  useEffect(() => { if (session.ready) void load(); }, [session.ready, status, category]);
  if (!session.ready) return <AdminLoading />;
  async function action(id: number, name: 'publish' | 'unpublish' | 'delete') {
    if (name === 'delete' && !window.confirm('Delete this post permanently?')) return;
    try {
      await api(`/api/admin/posts/${id}${name === 'delete' ? '' : `/${name}`}`, { method: name === 'delete' ? 'DELETE' : 'POST' });
      await load();
    } catch (err) { setError(err instanceof Error ? err.message : 'Action failed.'); }
  }
  return (
    <AdminShell email={session.email}>
      <PageHeading eyebrow="Content" title="Manage posts" action={<a href={`${baseUrl}admin/posts/new`} className="bg-primary px-5 py-3 text-xs font-semibold uppercase tracking-widest text-white hover:bg-secondary">Create new post</a>} />
      <div className="mb-6 flex flex-col gap-3 bg-white p-4 sm:flex-row">
        <label className="flex flex-1 items-center gap-2 border border-black/10 px-3"><Search size={16} className="text-primary/50" /><input value={search} onChange={(event) => setSearch(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && void load()} placeholder="Search title or slug" className="w-full py-3 text-sm outline-none" /></label>
        <select value={status} onChange={(event) => setStatus(event.target.value)} className="border border-black/10 px-3 py-3 text-sm"><option value="">All statuses</option><option value="published">Published</option><option value="draft">Drafts</option></select>
        <input value={category} onChange={(event) => setCategory(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && void load()} placeholder="Filter category" className="border border-black/10 px-3 py-3 text-sm outline-none focus:border-secondary" />
      </div>
      {error && <p className="mb-4 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
      <div className="overflow-x-auto bg-white shadow-sm"><PostTable posts={posts} onAction={action} /></div>
    </AdminShell>
  );
}

function PostTable({ posts, onAction, compact = false }: { posts: CmsPost[]; onAction?: (id: number, action: 'publish' | 'unpublish' | 'delete') => void; compact?: boolean }) {
  return (
    <table className="w-full min-w-[720px] text-left text-sm">
      <thead><tr className="border-b border-black/10 text-[10px] uppercase tracking-widest text-primary/50"><th className="px-4 py-3">Title</th><th className="px-4 py-3">Category</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Updated</th>{onAction && <th className="px-4 py-3">Actions</th>}</tr></thead>
      <tbody>
        {posts.map((post) => <tr key={post.id} className="border-b border-black/5 align-top last:border-0">
          <td className="px-4 py-4"><a href={`${baseUrl}admin/posts/${post.id}/edit`} className="font-medium hover:text-secondary">{post.title}</a><p className="mt-1 text-xs text-primary/50">/{post.slug}</p></td>
          <td className="px-4 py-4 text-primary/70">{post.category}</td>
          <td className="px-4 py-4"><span className={`inline-flex px-2 py-1 text-[10px] font-semibold uppercase tracking-widest ${post.status === 'published' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>{post.status}</span></td>
          <td className="px-4 py-4 text-primary/60">{new Date(post.updatedAt).toLocaleDateString()}</td>
          {onAction && <td className="px-4 py-4"><div className="flex flex-wrap gap-2 text-[10px] font-semibold uppercase tracking-widest">
            <a href={`${baseUrl}admin/posts/${post.id}/edit?preview=1`} className="inline-flex items-center gap-1 text-primary hover:text-secondary"><Eye size={12} /> Preview</a>
            <a href={`${baseUrl}admin/posts/${post.id}/edit`} className="inline-flex items-center gap-1 text-primary hover:text-secondary"><Pencil size={12} /> Edit</a>
            {post.status === 'published' ? <button onClick={() => onAction(post.id, 'unpublish')} className="text-amber-700">Unpublish</button> : <button onClick={() => onAction(post.id, 'publish')} className="text-green-700">Publish</button>}
            <button onClick={() => onAction(post.id, 'delete')} className="inline-flex items-center gap-1 text-red-700"><Trash2 size={12} /> Delete</button>
          </div></td>}
        </tr>)}
        {!posts.length && <tr><td colSpan={compact ? 4 : 5} className="px-4 py-12 text-center text-primary/60">No posts found.</td></tr>}
      </tbody>
    </table>
  );
}

export function AdminPostEditorPage({ id }: { id?: string }) {
  const session = useAdminSession();
  const [post, setPost] = useState<Partial<CmsPost>>({ status: 'draft', author: 'Wahito Musonge & Company Advocates LLP', category: 'Insights', tags: [] });
  const [titleTouched, setTitleTouched] = useState(Boolean(id));
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageAlt, setImageAlt] = useState('');
  const [preview, setPreview] = useState(new URLSearchParams(window.location.search).get('preview') === '1');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (session.ready && id) api<CmsPost>(`/api/admin/posts/${id}`).then((loaded) => { setPost(loaded); setContent(loaded.content); }).catch((err) => setError(err.message));
  }, [session.ready, id]);
  useEffect(() => { if (editorRef.current && !editorRef.current.innerHTML) editorRef.current.innerHTML = content; }, [content]);
  if (!session.ready) return <AdminLoading />;

  function update(field: keyof CmsPost, value: string) { setPost((current) => ({ ...current, [field]: value })); }
  function slugify(value: string) { return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''); }
  function command(name: string, value?: string) { editorRef.current?.focus(); document.execCommand(name, false, value); setContent(editorRef.current?.innerHTML ?? ''); }
  async function save(event: FormEvent) {
    event.preventDefault();
    setBusy(true); setError('');
    try {
      let featuredImageId = post.featuredImage ? Number(post.featuredImage.split('/').pop()) : undefined;
      if (imageFile) {
        const form = new FormData();
        form.append('image', imageFile);
        form.append('altText', imageAlt);
        const uploaded = await api<{ id: number }>('/api/admin/uploads', { method: 'POST', body: form });
        featuredImageId = uploaded.id;
      }
      const payload = { ...post, title: post.title ?? '', slug: post.slug ?? '', content, featuredImageId, tags: post.tags ?? [] };
      const saved = await api<CmsPost>(id ? `/api/admin/posts/${id}` : '/api/admin/posts', { method: id ? 'PUT' : 'POST', body: JSON.stringify(payload) });
      window.location.href = `${baseUrl}admin/posts/${saved.id}/edit`;
    } catch (err) { setError(err instanceof Error ? err.message : 'Unable to save post.'); } finally { setBusy(false); }
  }

  return (
    <AdminShell email={session.email}>
      <PageHeading eyebrow="Content editor" title={id ? 'Edit post' : 'Create new post'} action={<a href={`${baseUrl}admin/posts`} className="text-xs uppercase tracking-widest text-primary/60 hover:text-secondary">Back to posts</a>} />
      <form onSubmit={save} className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="grid gap-5">
          <label className="grid gap-2 text-xs font-semibold uppercase tracking-widest">Title<input value={post.title ?? ''} onChange={(event) => { update('title', event.target.value); if (!titleTouched) update('slug', slugify(event.target.value)); }} required className="border border-black/15 bg-white px-4 py-3 text-base font-normal tracking-normal outline-none focus:border-secondary" /></label>
          <label className="grid gap-2 text-xs font-semibold uppercase tracking-widest">Excerpt / summary<textarea value={post.excerpt ?? ''} onChange={(event) => update('excerpt', event.target.value)} rows={3} className="border border-black/15 bg-white px-4 py-3 text-sm font-normal tracking-normal outline-none focus:border-secondary" /></label>
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest">Article content</p>
            <div className="flex flex-wrap gap-1 border border-b-0 border-black/15 bg-white p-2">
              {(['bold', 'italic', 'underline'] as const).map((name) => <button type="button" key={name} onClick={() => command(name)} className="px-3 py-2 text-xs font-semibold uppercase hover:bg-black/5">{name}</button>)}
              <button type="button" onClick={() => command('formatBlock', 'h2')} className="px-3 py-2 text-xs font-semibold hover:bg-black/5">H2</button>
              <button type="button" onClick={() => command('formatBlock', 'h3')} className="px-3 py-2 text-xs font-semibold hover:bg-black/5">H3</button>
              <button type="button" onClick={() => command('insertUnorderedList')} className="px-3 py-2 text-xs font-semibold hover:bg-black/5">• List</button>
              <button type="button" onClick={() => command('insertOrderedList')} className="px-3 py-2 text-xs font-semibold hover:bg-black/5">1. List</button>
              <button type="button" onClick={() => command('formatBlock', 'blockquote')} className="px-3 py-2 text-xs font-semibold hover:bg-black/5">Quote</button>
              <button type="button" onClick={() => { const url = window.prompt('Link URL'); if (url) command('createLink', url); }} className="px-3 py-2 text-xs font-semibold hover:bg-black/5">Link</button>
              <button type="button" onClick={() => setPreview(!preview)} className="ml-auto inline-flex items-center gap-1 px-3 py-2 text-xs font-semibold uppercase text-secondary hover:bg-black/5"><Eye size={14} /> {preview ? 'Edit' : 'Preview'}</button>
            </div>
            {preview ? <div className="prose min-h-[360px] max-w-none border border-black/15 bg-white p-6" dangerouslySetInnerHTML={{ __html: content }} /> : <div ref={editorRef} contentEditable suppressContentEditableWarning onInput={(event) => setContent(event.currentTarget.innerHTML)} className="prose min-h-[360px] max-w-none border border-black/15 bg-white p-6 outline-none focus:border-secondary" />}
          </div>
          {error && <p role="alert" className="bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
          <button disabled={busy} className="w-fit bg-primary px-6 py-4 text-xs font-semibold uppercase tracking-widest text-white hover:bg-secondary disabled:opacity-60">{busy ? 'Saving…' : post.status === 'published' ? 'Update published post' : 'Save draft'}</button>
        </div>
        <aside className="grid content-start gap-5">
          <label className="grid gap-2 text-xs font-semibold uppercase tracking-widest">URL slug<input value={post.slug ?? ''} onChange={(event) => { setTitleTouched(true); update('slug', event.target.value); }} required className="border border-black/15 bg-white px-3 py-3 text-sm font-normal tracking-normal outline-none focus:border-secondary" /></label>
          <label className="grid gap-2 text-xs font-semibold uppercase tracking-widest">Category<input value={post.category ?? ''} onChange={(event) => update('category', event.target.value)} className="border border-black/15 bg-white px-3 py-3 text-sm font-normal tracking-normal outline-none focus:border-secondary" /></label>
          <label className="grid gap-2 text-xs font-semibold uppercase tracking-widest">Tags<input value={(post.tags ?? []).join(', ')} onChange={(event) => update('tags', event.target.value)} placeholder="employment, Kenya, compliance" className="border border-black/15 bg-white px-3 py-3 text-sm font-normal tracking-normal outline-none focus:border-secondary" /></label>
          <label className="grid gap-2 text-xs font-semibold uppercase tracking-widest">Author<input value={post.author ?? ''} onChange={(event) => update('author', event.target.value)} className="border border-black/15 bg-white px-3 py-3 text-sm font-normal tracking-normal outline-none focus:border-secondary" /></label>
          <label className="grid gap-2 text-xs font-semibold uppercase tracking-widest">Status<select value={post.status ?? 'draft'} onChange={(event) => update('status', event.target.value)} className="border border-black/15 bg-white px-3 py-3 text-sm font-normal tracking-normal outline-none focus:border-secondary"><option value="draft">Draft</option><option value="published">Published</option></select></label>
          <label className="grid gap-2 text-xs font-semibold uppercase tracking-widest">Publication date<input type="datetime-local" value={post.publicationDate ? post.publicationDate.slice(0, 16) : ''} onChange={(event) => update('publicationDate', event.target.value)} className="border border-black/15 bg-white px-3 py-3 text-sm font-normal tracking-normal outline-none focus:border-secondary" /></label>
          <div className="bg-white p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest">Featured image</p>
            {post.featuredImage && <img src={post.featuredImage} alt="" className="mb-3 aspect-video w-full object-cover" />}
            <input type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={(event) => setImageFile(event.target.files?.[0] ?? null)} className="w-full text-xs" />
            <input value={imageAlt} onChange={(event) => setImageAlt(event.target.value)} placeholder="Image alt text" className="mt-3 w-full border border-black/15 px-3 py-2 text-sm outline-none focus:border-secondary" />
          </div>
          <div className="bg-white p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest">SEO</p>
            <input value={post.seoTitle ?? ''} onChange={(event) => update('seoTitle', event.target.value)} placeholder="SEO title" className="mb-3 w-full border border-black/15 px-3 py-2 text-sm outline-none focus:border-secondary" />
            <textarea value={post.seoDescription ?? ''} onChange={(event) => update('seoDescription', event.target.value)} placeholder="SEO description" rows={4} className="w-full border border-black/15 px-3 py-2 text-sm outline-none focus:border-secondary" />
          </div>
        </aside>
      </form>
    </AdminShell>
  );
}

export function AdminAccountPage() {
  const session = useAdminSession();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  if (!session.ready) return <AdminLoading />;

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError('');
    setMessage('');
    if (newPassword !== confirmPassword) {
      setError('The new passwords do not match.');
      return;
    }
    setBusy(true);
    try {
      await api('/api/admin/account/password', {
        method: 'POST',
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setMessage('Your password was updated.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to update password.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <AdminShell email={session.email}>
      <PageHeading eyebrow="Account security" title="Change password" />
      <div className="max-w-xl bg-white p-6 shadow-sm md:p-8">
        <p className="mb-6 text-sm leading-7 text-primary/70">
          Choose a strong password with at least 12 characters. Your password is hashed before it is stored.
        </p>
        <form onSubmit={submit} className="grid gap-5">
          <label className="grid gap-2 text-xs font-semibold uppercase tracking-widest">Current password<input required type="password" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} className="border border-black/15 px-4 py-3 text-sm font-normal tracking-normal outline-none focus:border-secondary" /></label>
          <label className="grid gap-2 text-xs font-semibold uppercase tracking-widest">New password<input required minLength={12} type="password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} className="border border-black/15 px-4 py-3 text-sm font-normal tracking-normal outline-none focus:border-secondary" /></label>
          <label className="grid gap-2 text-xs font-semibold uppercase tracking-widest">Confirm new password<input required minLength={12} type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className="border border-black/15 px-4 py-3 text-sm font-normal tracking-normal outline-none focus:border-secondary" /></label>
          {error && <p role="alert" className="bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
          {message && <p role="status" className="bg-green-50 px-4 py-3 text-sm text-green-700">{message}</p>}
          <button disabled={busy} className="w-fit bg-primary px-6 py-4 text-xs font-semibold uppercase tracking-widest text-white hover:bg-secondary disabled:opacity-60">{busy ? 'Updating…' : 'Update password'}</button>
        </form>
      </div>
    </AdminShell>
  );
}

function AdminLoading() {
  return <div className="flex min-h-screen items-center justify-center bg-[#f7f7f5] text-sm uppercase tracking-widest text-primary/60"><Check size={16} className="mr-2 animate-pulse" /> Loading CMS…</div>;
}