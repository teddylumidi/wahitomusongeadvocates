import type { Request, Response } from 'express';

let appPromise: Promise<import('express').Express> | undefined;

export default async function handler(request: Request, response: Response) {
  try {
    const url = new URL(request.url ?? '/', 'https://vercel.invalid');
    const apiPath = url.searchParams.get('__api_path');
    if (apiPath) {
      url.searchParams.delete('__api_path');
      const path = apiPath.split('/').filter(Boolean).map(encodeURIComponent).join('/');
      request.url = `/api/${path}${url.search ? url.search : ''}`;
    }

    appPromise ??= import('../server/create-app.js').then(({ createApp }) => createApp());
    const app = await appPromise;
    app(request, response);
  } catch (error) {
    appPromise = undefined;
    console.error('Vercel CMS API startup failed.', error);
    if (!response.headersSent) {
      response.status(503).json({ error: 'CMS API is temporarily unavailable.' });
    }
  }
}
