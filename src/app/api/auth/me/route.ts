// app/api/auth/me/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/db";
import { pharmacies } from "@/db/schema"; // On importe la table pharmacies
import { eq } from "drizzle-orm";

export async function GET() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("pharma_session")?.value;

  if (!userId) {
    return NextResponse.json({ error: "Non connecté" }, { status: 401 });
  }

  // On cherche l'entrée dans la table pharmacies liée à cet utilisateur
  const pharma = await db
    .select()
    .from(pharmacies)
    .where(eq(pharmacies.userId, Number(userId)))
    .get();

  // Si la pharmacie n'existe pas encore en base, on peut renvoyer un nom par défaut
  return NextResponse.json({ 
    nom: pharma?.nom || "Ma Pharmacie" 
  });
}