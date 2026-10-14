import serverless from 'serverless-http';
import { createApp } from '../../server/create-app';

export const config = { path: '/api/*' };

let appHandler: ReturnType<typeof serverless> | undefined;

export async function handler(
  event: Parameters<ReturnType<typeof serverless>>[0],
  context: Parameters<ReturnType<typeof serverless>>[1],
) {
  if (!appHandler) {
    appHandler = serverless(await createApp());
  }
  return appHandler(event, context);
}
