import type { Request, Response } from 'express';
import { createApp } from '../server/create-app';

let appPromise: ReturnType<typeof createApp> | undefined;

export default async function handler(request: Request, response: Response) {
  try {
    appPromise ??= createApp();
    const app = await appPromise;
    app(request, response);
  } catch (error) {
    console.error('Vercel CMS API startup failed.', error);
    response.status(503).json({ error: 'CMS API is temporarily unavailable.' });
  }
}
