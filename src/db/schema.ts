import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  nom: text("nom").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  isValidated: integer("is_validated", { mode: "boolean" }).default(false).notNull(),
  credits: integer("credits").default(0).notNull(),
  role: text("role").default("pharmacy"),
  createdAt: text("created_at").default(new Date().toISOString()),
});