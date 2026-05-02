// app/api/auth/logout/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete("pharma_session");
  cookieStore.delete("user_email"); // Supprimez aussi celui-ci si vous l'avez ajouté
  
  return NextResponse.json({ message: "Déconnecté" });
}