import fs from 'node:fs/promises';
import pg from 'pg';

const schema = await fs.readFile(new URL('../server/schema.sql', import.meta.url), 'utf8');
const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
});

await client.connect();
await client.query(schema);
await client.end();
console.log('CMS database schema is ready.');