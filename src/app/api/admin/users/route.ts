import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

// 1. Récupérer tous les utilisateurs

export async function GET() {
  try {
    const allUsers = await db.select().from(users);
    return NextResponse.json(allUsers);
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la récupération" }, { status: 500 });
  }
}


// 2. Valider ou Refuser un utilisateur
// 2. Valider ou Refuser un utilisateur
export async function PATCH(req: Request) {
  try {
    const { id, action } = await req.json();

    if (action === "approve") {
      // On valide le compte ET on ajoute 31 crédits simultanément
      await db.update(users)
        .set({ 
          isValidated: true, 
          credits: 31 // Ajout automatique des crédits lors de la validation
        })
        .where(eq(users.id, id));
        
      return NextResponse.json({ message: "Utilisateur validé et 31 crédits ajoutés" });
    } 
    
    if (action === "reject") {
      await db.delete(users).where(eq(users.id, id));
      return NextResponse.json({ message: "Utilisateur supprimé" });
    }
    
    return NextResponse.json({ error: "Action non reconnue" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la mise à jour" }, { status: 500 });
  }
}