import { NextResponse } from "next/server";
import { db } from "@/db";
import { statsPharmacie } from "@/db/schema"; // Assure-toi de l'ajouter à ton schema.ts aussi

export async function POST(req: Request) {
  try {
    const { pharmacieId, type } = await req.json();
    const today = new Date().toISOString().split('T')[0]; // Donne 2024-05-20

    await db.insert(statsPharmacie).values({
      pharmacieId: Number(pharmacieId),
      type: type,
      createdAt: today
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Erreur" }, { status: 500 });
  }
}