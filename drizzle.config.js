import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./utils/schema.js",
  dialect: "mysql",
  dialectOptions: { driver: "mysql2" },
  dbCredentials: {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  },
});
