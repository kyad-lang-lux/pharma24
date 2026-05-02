import { db } from "@/db";
import { users } from "@/db/schema";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { nom, email, password } = await req.json();

    // 1. Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // 2. Insérer dans Turso
    await db.insert(users).values({
      nom,
      email,
      password: hashedPassword,
      isValidated: false, // Important : attend la validation admin
      credits: 0,
    });

    return NextResponse.json({ message: "Succès" }, { status: 201 });
  } catch (error: any) {
    // Gestion de l'email déjà existant
    if (error.message.includes("UNIQUE")) {
      return NextResponse.json({ error: "Cet email est déjà utilisé." }, { status: 400 });
    }
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}