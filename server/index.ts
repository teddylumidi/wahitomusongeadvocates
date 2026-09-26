import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import cookieParser from 'cookie-parser';
import { createServer as createViteServer } from 'vite';
import { registerApi } from './routes';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const port = Number(process.env.PORT ?? 5000);
const app = express();

app.use(cookieParser());
await registerApi(app);

if (process.env.NODE_ENV === 'production') {
  const publicDir = path.join(root, 'dist', 'public');
  app.use(express.static(publicDir, { index: false }));
  app.use((req, res, next) => {
    if (req.method !== 'GET' || req.path.startsWith('/api/')) {
      next();
      return;
    }
    res.sendFile(path.join(publicDir, 'index.html'));
  });
} else {
  const vite = await createViteServer({
    root,
    configFile: path.join(root, 'vite.config.ts'),
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
}

app.listen(port, '0.0.0.0', () => {
  console.log(`Wahito Musonge app listening on port ${port}`);
});