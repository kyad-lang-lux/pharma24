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

export const pharmacies = sqliteTable("pharmacies", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").notNull().references(() => users.id),
  nom: text("nom").notNull(),
  departement: text("departement"),
  commune: text("commune"),
  ville: text("ville"),
  quartier: text("quartier"),
  telephone: text("telephone"),
  whatsapp: text("whatsapp"),
  momo: text("momo"),
  isOpen: integer("is_open", { mode: "boolean" }).default(true),
});

export const horairesGarde = sqliteTable("horaires_garde", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  pharmacieId: integer("pharmacie_id").notNull().references(() => pharmacies.id),
  jour: text("jour").notNull(), // Dimanche, Lundi...
  isGarde: integer("is_garde", { mode: "boolean" }).default(false),
  isFullDay: integer("is_full_day", { mode: "boolean" }).default(false),
  heureDebut: text("heure_debut").default("08:00"),
  heureFin: text("heure_fin").default("20:00"),
});