import { NextResponse } from "next/server";
import { db } from "@/db";
import { pharmacies, horairesGarde } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    // Récupération de toutes les pharmacies avec leurs horaires de garde
    const rows = await db
      .select()
      .from(pharmacies)
      .leftJoin(horairesGarde, eq(pharmacies.id, horairesGarde.pharmacieId))
      .all();

    // Structuration des données : On regroupe les horaires sous chaque pharmacie
    const result = rows.reduce((acc: any[], row) => {
      const { pharmacies: p, horaires_garde: h } = row;
      
      let pharma = acc.find((item) => item.id === p.id);
      if (!pharma) {
        pharma = { ...p, horaires: [] };
        acc.push(pharma);
      }
      
      if (h) {
        pharma.horaires.push(h);
      }
      
      return acc;
    }, []);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Erreur API Public:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}