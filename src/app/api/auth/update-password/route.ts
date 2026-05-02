import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { newPassword } = await req.json();
    const cookieStore = await cookies();
    
    // Récupération de l'email via le cookie créé au login
    const sessionEmail = cookieStore.get("user_email")?.value;

    if (!sessionEmail) {
      return NextResponse.json(
        { error: "Session expirée. Veuillez vous reconnecter." }, 
        { status: 401 }
      );
    }

    // Hashage du nouveau mot de passe
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Mise à jour dans la base de données
    await db.update(users)
      .set({ password: hashedPassword })
      .where(eq(users.email, sessionEmail));

    return NextResponse.json({ 
      message: "Mot de passe mis à jour avec succès" 
    });
    
  } catch (error) {
    console.error("Erreur update-password:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour" }, 
      { status: 500 }
    );
  }
}