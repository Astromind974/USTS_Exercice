import { NextResponse } from "next/server";
import prisma from "@/lib/db";

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

export async function POST(request: Request) {
  try {
    const { sender, subject, content, date } = await request.json();
    const email = await prisma.email.create({
      data: { sender, subject, content, date: new Date(date) },
    });
    return NextResponse.json(email, { status: 201 });
  } catch (error) {
    console.error("Erreur:", error);
    return NextResponse.json({ error: "Impossible de créer l'e-mail" }, { status: 500 });
  }
}
