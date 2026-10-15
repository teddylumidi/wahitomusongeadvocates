import type { Request, Response } from 'express';
import { createApp } from '../server/create-app';

let appPromise: ReturnType<typeof createApp> | undefined;

export default async function handler(request: Request, response: Response) {
  try {
    const url = new URL(request.url ?? '/', 'https://vercel.invalid');
    const apiPath = url.searchParams.get('__api_path');
    if (apiPath) {
      url.searchParams.delete('__api_path');
      const path = apiPath.split('/').filter(Boolean).map(encodeURIComponent).join('/');
      request.url = `/api/${path}${url.search ? url.search : ''}`;
    }

    appPromise ??= createApp();
    const app = await appPromise;
    app(request, response);
  } catch (error) {
    console.error('Vercel CMS API startup failed.', error);
    response.status(503).json({ error: 'CMS API is temporarily unavailable.' });
  }
}
