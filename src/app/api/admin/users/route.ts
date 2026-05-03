import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Configuration du transporteur Nodemailer utilisant les variables d'environnement
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

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

    // On récupère les infos de l'utilisateur pour avoir son email et son nom avant toute action
    const userToUpdate = await db.select().from(users).where(eq(users.id, id)).get();

    if (!userToUpdate) {
      return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 });
    }

    if (action === "approve") {
      // Validation du compte et ajout des 31 crédits
      await db.update(users)
        .set({ 
          isValidated: true, 
          credits: 31 
        })
        .where(eq(users.id, id));

      // Envoi de l'email de confirmation
      try {
        await transporter.sendMail({
          from: `"Pharma24" <${process.env.EMAIL_USER}>`,
          to: userToUpdate.email,
          subject: "Bienvenue sur Pharma24 - Votre compte est activé !",
          html: `
            <div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
              <h2 style="color: #157F3C; text-align: center;">Bienvenue chez Pharma24 !</h2>
              <p>Bonjour <strong>${userToUpdate.nom}</strong>,</p>
              <p>Nous avons le plaisir de vous annoncer que votre compte a été <strong>confirmé</strong> par notre équipe d'administration.</p>
              <div style="background-color: #f0fdf4; padding: 15px; border-radius: 8px; text-align: center; border: 1px dashed #157F3C; margin: 20px 0;">
                <p style="margin: 0; font-size: 18px; color: #157F3C;">🎁 Cadeau de bienvenue : <strong>31 Crédits offerts</strong></p>
              </div>
              <p>Vous pouvez dès à présent vous connecter pour gérer votre pharmacie et profiter de nos services.</p>
              <p style="text-align: center; margin-top: 30px;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL || '#'}" style="background-color: #157F3C; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Accéder à mon espace</a>
              </p>
              <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;" />
              <p style="font-size: 12px; color: #888; text-align: center;">L'équipe Pharma24</p>
            </div>
          `,
        });
      } catch (mailError) {
        console.error("Erreur lors de l'envoi de l'email:", mailError);
        // On ne bloque pas la réponse si seul l'email échoue
      }

      return NextResponse.json({ message: "Utilisateur validé, 31 crédits ajoutés et email envoyé" });
    } 
    
    if (action === "reject") {
      await db.delete(users).where(eq(users.id, id));
      return NextResponse.json({ message: "Utilisateur supprimé avec succès" });
    }

    return NextResponse.json({ error: "Action non reconnue" }, { status: 400 });
  } catch (error) {
    console.error("Erreur PATCH Admin:", error);
    return NextResponse.json({ error: "Erreur lors de la mise à jour" }, { status: 500 });
  }
}