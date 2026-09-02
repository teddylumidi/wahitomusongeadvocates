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