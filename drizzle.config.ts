import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

// Charger les variables du fichier .env.local
dotenv.config({ path: ".env.local" });

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "sqlite",
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL!,
    token: process.env.TURSO_AUTH_TOKEN!, // Vérifie si c'est 'token' ou 'authToken' selon ta version
  },
});