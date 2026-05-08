import { NextResponse } from "next/server";
import { db } from "@/db";
import { medicaments } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

// 1. GET & POST (Gardés identiques)
export async function GET() {
  try {
    const data = await db.select().from(medicaments).orderBy(desc(medicaments.id));
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Erreur de récupération" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const nouveauMed = await db.insert(medicaments).values({
      nom: body.nom,
      categorie: body.categorie,
      indication: body.indication,
      dosageAdulte: body.dosageAdulte,
      dosageEnfant: body.dosageEnfant,
      precaution: body.precaution,
    }).returning();
    return NextResponse.json(nouveauMed);
  } catch (error) {
    return NextResponse.json({ error: "Erreur d'insertion" }, { status: 500 });
  }
}

// 2. PATCH (Pour la modification)
export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, ...updateData } = body;
    
    await db.update(medicaments)
      .set(updateData)
      .where(eq(medicaments.id, id));
      
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Erreur de mise à jour" }, { status: 500 });
  }
}

// 3. DELETE (Pour supprimer un historique)
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID manquant" }, { status: 400 });

    await db.delete(medicaments).where(eq(medicaments.id, Number(id)));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Erreur de suppression" }, { status: 500 });
  }
}