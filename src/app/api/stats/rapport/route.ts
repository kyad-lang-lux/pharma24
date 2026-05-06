import { NextResponse } from "next/server";
import { cookies } from "next/headers";  
import { db } from "@/db";
import { statsPharmacie, pharmacies } from "@/db/schema";
import { eq, and, sql } from "drizzle-orm";

export async function GET() {
  const userId = (await cookies()).get("pharma_session")?.value;
  if (!userId) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  // Récupérer la pharmacie liée à l'utilisateur
  const pharma = await db.select().from(pharmacies).where(eq(pharmacies.userId, Number(userId))).get();
  if (!pharma) return NextResponse.json({ error: "Pharmacie non trouvée" });

  // 1. Récupérer les totaux avec cast en INTEGER pour le JS
  const totaux = await db.select({
    type: statsPharmacie.type,
    count: sql<number>`CAST(count(*) AS INTEGER)` 
  }).from(statsPharmacie)
    .where(eq(statsPharmacie.pharmacieId, pharma.id))
    .groupBy(statsPharmacie.type);

  // 2. Récupérer les stats des 7 derniers jours
  // On filtre par 'vue' et par ID de pharmacie
  const septDerniersJours = await db.select({
    date: statsPharmacie.createdAt,
    vues: sql<number>`CAST(count(*) AS INTEGER)`
  }).from(statsPharmacie)
    .where(
      and(
        eq(statsPharmacie.pharmacieId, pharma.id), 
        eq(statsPharmacie.type, 'vue')
      )
    )
    .groupBy(statsPharmacie.createdAt)
    .orderBy(sql`created_at DESC`)
    .limit(7);

  // reverse() pour avoir l'ordre chronologique (du plus vieux au plus récent)
  return NextResponse.json({ 
    totaux, 
    graphData: septDerniersJours.reverse() 
  });
}