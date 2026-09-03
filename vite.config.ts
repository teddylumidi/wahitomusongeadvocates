import path from 'path';
import { existsSync, writeFileSync } from 'node:fs';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

import runtimeErrorOverlay from '@replit/vite-plugin-runtime-error-modal';

const rawPort = process.env.PORT ?? '5173';
const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const basePath = process.env.BASE_PATH ?? '/';
const projectRoot = path.resolve(import.meta.dirname);
const entryPath = path.resolve(projectRoot, 'index.html');

if (!existsSync(entryPath)) {
  const leftBracket = String.fromCharCode(60);
  const rightBracket = String.fromCharCode(62);
  const entryTokens = [
    '!DOCTYPE html',
    'html lang="en"',
    'head',
    'meta charset="UTF-8" /',
    'meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" /',
    'title',
    '|Wahito Musonge & Company Advocates LLP',
    '/title',
    'meta name="description" content="Practical Legal Solutions for Businesses and Individuals in Kenya." /',
    'meta name="robots" content="index, follow" /',
    'meta property="og:title" content="Wahito Musonge & Company Advocates LLP" /',
    'meta property="og:description" content="Practical Legal Solutions for Businesses and Individuals in Kenya." /',
    'meta property="og:type" content="website" /',
    'meta name="twitter:card" content="summary_large_image" /',
    'meta name="twitter:title" content="Wahito Musonge & Company Advocates LLP" /',
    'meta name="twitter:description" content="Practical Legal Solutions for Businesses and Individuals in Kenya." /',
    'link rel="icon" type="image/svg+xml" href="/favicon.svg" /',
    'link rel="preconnect" href="https://fonts.googleapis.com"',
    'link rel="preconnect" href="https://fonts.gstatic.com" crossorigin',
    'link href="https://fonts.googleapis.com/css2?family=Cardo:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet"',
    '/head',
    'body',
    'div id="root"',
    '/div',
    'script type="module" src="/src/main.tsx"',
    '/script',
    '/body',
    '/html',
  ];
  const entryDocument = `${entryTokens
    .map((token) =>
      token.startsWith('|')
        ? token.slice(1)
        : `${leftBracket}${token}${rightBracket}`,
    )
    .join('\n')}\n`;

  writeFileSync(entryPath, entryDocument);
}

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== 'production' &&
    process.env.REPL_ID !== undefined
      ? [
          await import('@replit/vite-plugin-cartographer').then((m) =>
            m.cartographer({
              root: path.resolve(import.meta.dirname, '..'),
            }),
          ),
          await import('@replit/vite-plugin-dev-banner').then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
      '@assets': path.resolve(
        import.meta.dirname,
        '..',
        '..',
        'attached_assets',
      ),
    },
    dedupe: ['react', 'react-dom'],
  },
  root: projectRoot,
  build: {
    outDir: path.resolve(import.meta.dirname, 'dist/public'),
    emptyOutDir: true,
  },
  server: {
    port,
    strictPort: true,
    host: '0.0.0.0',
    allowedHosts: true,
    fs: {
      strict: true,
    },
  },
  preview: {
    port,
    host: '0.0.0.0',
    allowedHosts: true,
  },
});
