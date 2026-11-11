import { config } from "dotenv";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

import * as schema from "./schema/index";

const packageDirectory = dirname(fileURLToPath(import.meta.url));

config({
  path: resolve(packageDirectory, "../../../.env"),
});

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is missing. Check the repository root .env file.");
}

const globalForPostgres = globalThis as typeof globalThis & {
  preshiposPool?: Pool;
};

export const pool =
  globalForPostgres.preshiposPool ??
  new Pool({
    connectionString,
    max: 10,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 5_000,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPostgres.preshiposPool = pool;
}

export const db = drizzle(pool, { schema });
