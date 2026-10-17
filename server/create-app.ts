import express from 'express';
import cookieParser from 'cookie-parser';
import { registerApi } from './routes.js';

export async function createApp() {
  const app = express();
  app.use(cookieParser());
  await registerApi(app);
  return app;
}
