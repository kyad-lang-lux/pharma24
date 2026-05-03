// app/api/auth/me/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("pharma_session")?.value;

  if (!userId) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  const user = await db.select().from(users).where(eq(users.id, Number(userId))).get();

  return NextResponse.json({ nom: user?.nom });
}