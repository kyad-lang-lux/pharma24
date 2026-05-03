import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/db";
import { pharmacies, horairesGarde } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function GET() {
  const userId = (await cookies()).get("pharma_session")?.value;
  if (!userId) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  // Récupérer la pharma
  let pharma = await db.select().from(pharmacies).where(eq(pharmacies.userId, Number(userId))).get();
  
  if (!pharma) return NextResponse.json({ data: null });

  // Récupérer les horaires
  const horaires = await db.select().from(horairesGarde).where(eq(horairesGarde.pharmacieId, pharma.id));

  return NextResponse.json({ pharma, horaires });
}

export async function POST(req: Request) {
  const userId = (await cookies()).get("pharma_session")?.value;
  if (!userId) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const body = await req.json();
  const { info, horaires } = body;

  // 1. Update ou Insert Pharmacie
  let pharma = await db.select().from(pharmacies).where(eq(pharmacies.userId, Number(userId))).get();
  
  let pharmaId;
  if (pharma) {
    await db.update(pharmacies).set(info).where(eq(pharmacies.id, pharma.id));
    pharmaId = pharma.id;
  } else {
    const res = await db.insert(pharmacies).values({ ...info, userId: Number(userId) }).returning();
    pharmaId = res[0].id;
  }

  // 2. Update Horaires (on supprime et on remplace pour simplifier)
  await db.delete(horairesGarde).where(eq(horairesGarde.pharmacieId, pharmaId));
  for (const h of horaires) {
    await db.insert(horairesGarde).values({ ...h, pharmacieId: pharmaId });
  }

  return NextResponse.json({ message: "Sauvegardé avec succès" });
}