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
export async function PATCH(req: Request) {
  try {
    const { id, action } = await req.json();

    if (action === "approve") {
      await db.update(users).set({ isValidated: true }).where(eq(users.id, id));
      return NextResponse.json({ message: "Utilisateur validé" });
    } 
    
    if (action === "reject") {
      await db.delete(users).where(eq(users.id, id));
      return NextResponse.json({ message: "Utilisateur supprimé" });
    }
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la mise à jour" }, { status: 500 });
  }
}