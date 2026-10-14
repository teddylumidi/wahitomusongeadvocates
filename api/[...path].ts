import type { Request, Response } from 'express';
import { createApp } from '../server/create-app';

let appPromise: ReturnType<typeof createApp> | undefined;

export default async function handler(request: Request, response: Response) {
  appPromise ??= createApp();
  const app = await appPromise;
  app(request, response);
}