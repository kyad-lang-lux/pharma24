import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/db";
import { pharmacies, users } from "@/db/schema"; // On importe les deux tables
import { eq } from "drizzle-orm";

export async function GET() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("pharma_session")?.value;

  if (!userId) {
    return NextResponse.json({ error: "Non connecté" }, { status: 401 });
  }

  const idNumeric = Number(userId);

  // 1. On récupère les infos de base (crédits) depuis la table users
  const user = await db
    .select()
    .from(users)
    .where(eq(users.id, idNumeric))
    .get();

  // 2. On récupère les infos de l'établissement depuis la table pharmacies
  const pharma = await db
    .select()
    .from(pharmacies)
    .where(eq(pharmacies.userId, idNumeric))
    .get();

  // On renvoie tout dans un seul objet JSON
  return NextResponse.json({ 
    nom: pharma?.nom || user?.nom || "Ma Pharmacie",
    credits: user?.credits || 0,
    email: user?.email,
    isValidated: user?.isValidated || false
  });
}