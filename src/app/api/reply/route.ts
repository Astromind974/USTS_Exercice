import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { emailId, body: replyBody, isAuto } = await request.json();

    if (!emailId) {
      return NextResponse.json(
        { error: "Champ emailId manquant" },
        { status: 400 }
      );
    }

    // 1. Récupération de l'e-mail d'origine depuis la BDD
    const email = await prisma.email.findUnique({ where: { id: emailId } });
    if (!email) {
      return NextResponse.json({ error: "E-mail non trouvé" }, { status: 404 });
    }

    // 3. Enregistrement initial dans la table Reply
    const reply = await prisma.reply.create({
      data: {
        emailId,
        to: email.sender,
        subject: `Re: ${email.subject}`,
        body: replyBody || (isAuto ? "Génération automatique par IA..." : ""),
        isAuto: isAuto ?? false,
      },
    });

    const N8N_API_URL = process.env.N8N_API_URL || "http://localhost:5678/webhook-test/send-reply";

    // 4. Envoi des données complètes vers n8n
    try {
      await fetch(N8N_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          replyId: reply.id,
          to: email.sender,
          subject: `Re: ${email.subject}`,
          content: replyBody,           // Directives saisies dans la modale (optionnelles)
          isAuto: isAuto ?? false,      // Flag indiquant si l'IA doit être exécutée
          originalContent: email.content, // Le vrai texte de l'e-mail reçu
        }),
      });
    } catch (n8nError) {
      console.error("Impossible de joindre n8n:", n8nError);
    }

    return NextResponse.json(reply, { status: 201 });
  } catch (error) {
    console.error("Erreur:", error);
    return NextResponse.json({ error: "Impossible d'envoyer la réponse" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { replyId, gmailMessageId, finalContent } = await request.json();

    if (!replyId || !gmailMessageId) {
      return NextResponse.json(
        { error: "Champs requis manquants (replyId, gmailMessageId)" },
        { status: 400 }
      );
    }

    try {
      const reply = await prisma.reply.update({
        where: { id: replyId },
        data: {
          gmailMessageId,
          ...(finalContent ? { body: finalContent } : {}), // Remplace le placeholder par le texte IA généré
        },
      });
      return NextResponse.json(reply);
    } catch (e: any) {
      if (e?.code === "P2025") {
        return NextResponse.json(
          { error: "Réponse introuvable en base (replyId invalide)" },
          { status: 404 }
        );
      }
      throw e;
    }
  } catch (error) {
    console.error("Erreur:", error);
    return NextResponse.json({ error: "Impossible de mettre à jour la réponse" }, { status: 500 });
  }
}
