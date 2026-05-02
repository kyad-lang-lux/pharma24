import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const user = await db.select().from(users).where(eq(users.email, email)).get();

    if (!user) {
      return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 });
    }

    if (!user.isValidated) {
      return NextResponse.json(
        { error: "Votre compte est en attente de validation par l'administrateur." },
        { status: 403 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Mot de passe incorrect" }, { status: 401 });
    }

    const oneWeek = 7 * 24 * 60 * 60 * 1000;
    const cookieStore = await cookies();

    // COOKIE 1: Session (ID)
    cookieStore.set("pharma_session", String(user.id), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: oneWeek,
      path: "/",
    });

    // COOKIE 2: Email (Pour identifier l'utilisateur lors du changement de mot de passe)
    cookieStore.set("user_email", user.email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: oneWeek,
      path: "/",
    });

    return NextResponse.json({ 
      message: "Connexion réussie", 
      userId: user.id 
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}