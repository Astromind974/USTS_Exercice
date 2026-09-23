import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import fs from "fs";
import path from "path";

// 1. Récupération des e-mails (inchangée)
export async function GET() {
  try {
    const emails = await prisma.email.findMany({
      orderBy: { date: "desc" },
      include: { replies: true },
    });
    return NextResponse.json(emails);
  } catch (error) {
    console.error("Erreur:", error);
    return NextResponse.json({ error: "Impossible de charger les e-mails" }, { status: 500 });
  }
}

// 2. Enregistrement des e-mails + Sauvegarde dans mails-today.json
export async function POST(request: Request) {
  try {
    const { emails } = await request.json();

    if (!Array.isArray(emails)) {
      return NextResponse.json({ error: "Le champ 'emails' doit être un tableau" }, { status: 400 });
    }

    // --- Sauvegarde locale dans mails-today.json ---
    try {
      const filePath = path.join(process.cwd(), "mails-today.json");
      fs.writeFileSync(filePath, JSON.stringify(emails, null, 2), "utf-8");
    } catch (fileError) {
      console.error("Erreur lors de l'écriture du fichier mails-today.json:", fileError);
    }

    // --- Enregistrement / Upsert en BDD avec Prisma ---
    const created = await prisma.$transaction(
      emails.map((e) =>
        prisma.email.upsert({
          where: { id: e.id },
          update: {
            sender: e.sender,
            subject: e.subject,
            content: e.content,
            date: new Date(e.date),
          },
          create: {
            id: e.id,
            sender: e.sender,
            subject: e.subject,
            content: e.content,
            date: new Date(e.date),
          },
        })
      )
    );

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("Erreur:", error);
    return NextResponse.json({ error: "Impossible de créer l'e-mail" }, { status: 500 });
  }
}
