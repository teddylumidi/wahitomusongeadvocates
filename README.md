# Wahito Musonge & Company Advocates LLP

Standalone React/Vite website for Wahito Musonge & Company Advocates LLP.

## Run locally

```bash
pnpm install
pnpm run dev
```

The production build can be created with:

```bash
pnpm run build
```

## Project structure

- `src/` — React pages, sections, components, and local insight article data
- `public/images/` — local firm imagery and partner photos
- `public/favicon.svg` — branded navy-and-gold favicon

The enquiry form submits in the background to Formspree's HTTPS endpoint
and delivers enquiries to the verified recipient configured in Formspree without
opening the visitor's email client. No API keys or private credentials are
included in the browser bundle.

## Admin blog CMS on Netlify

The CMS is available at `/admin/login`. The owner can create, edit, save drafts,
and publish posts from the admin dashboard. Netlify serves the site and routes
`/api/*` requests to a Netlify Function; blog content and account sessions are
stored in PostgreSQL. There is no default account or password.

### Initial setup

1. Create a PostgreSQL database with [Neon](https://neon.tech/) and copy its
   pooled connection string.
2. Set `DATABASE_URL` to that connection string in your local shell and run
   `npm run db:push` once to create the CMS tables. In PowerShell:

   ```powershell
   $env:DATABASE_URL = "your-Neon-connection-string"
   npm run db:push
   Remove-Item Env:DATABASE_URL
   ```

   Keep the connection string private; do not commit it or send it in chat.
3. Connect this repository to Netlify. The checked-in `netlify.toml` configures
   the site build and Functions directory. Add these site environment variables
   in Netlify's UI, for the production deploy context:
   - `DATABASE_URL`: the Neon pooled connection string
   - `ADMIN_EMAIL`: `wahitomusongeblogs@gmail.com`
   - `ADMIN_PASSWORD`: a unique initial password of at least 12 characters
4. Deploy the site. The first API request initializes the owner account if it
   does not already exist. Sign in at `/admin/login`; change the initial
   password at `/admin/account`.

The initial account is created only if it is missing, so later server starts
won't reset a password changed in the CMS. Keep all three values in Netlify
environment variables, never in the browser bundle or source control. The
existing standalone Node.js server remains available for local development.