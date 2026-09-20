import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { emailId, content, isAuto } = await request.json();
    const reply = await prisma.reply.create({
      data: { emailId, content, isAuto },
    });
    const N8N_API_URL = process.env.N8N_API_URL || "http://localhost:5678/webhook/send-reply";
    const email = await prisma.email.findUnique({ where: { id: emailId } });
    if (!email) throw new Error("E-mail non trouvé");
    await fetch(N8N_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to: email.sender, subject: `Re: ${email.subject}`, content }),
    });
    return NextResponse.json(reply, { status: 201 });
  } catch (error) {
    console.error("Erreur:", error);
    return NextResponse.json({ error: "Impossible d'envoyer la réponse" }, { status: 500 });
  }
}
