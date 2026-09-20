import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
  try {
    const summary = await prisma.summary.findFirst({ orderBy: { date: "desc" } });
    return NextResponse.json(summary || { content: "Aucun résumé disponible." });
  } catch (error) {
    console.error("Erreur:", error);
    return NextResponse.json({ error: "Impossible de charger le résumé" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { content } = await request.json();
    const summary = await prisma.summary.create({ data: { content } });
    return NextResponse.json(summary, { status: 201 });
  } catch (error) {
    console.error("Erreur:", error);
    return NextResponse.json({ error: "Impossible de créer le résumé" }, { status: 500 });
  }
}
