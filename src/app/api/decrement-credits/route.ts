import { NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { gt, sql } from "drizzle-orm";

export async function GET(req: Request) {
  // Sécurité : On vérifie une clé secrète pour éviter que n'importe qui appelle cette URL
  const { searchParams } = new URL(req.url);
  const authHeader = req.headers.get('authorization');
  
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Non autorisé', { status: 401 });
  }

  try {
    // Requête SQL : "UPDATE users SET credits = credits - 1 WHERE credits > 0"
    const result = await db.update(users)
      .set({ 
        credits: sql`${users.credits} - 1` 
      })
      .where(gt(users.credits, 0));

    return NextResponse.json({ 
      success: true, 
      message: "Crédits mis à jour pour tous les utilisateurs actifs." 
    });
  } catch (error) {
    console.error("Erreur Cron Job:", error);
    return NextResponse.json({ error: "Échec de la mise à jour des crédits" }, { status: 500 });
  }
}