import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "public", "mails-today.json");
    const fileContents = await readFile(filePath, "utf-8");
    const data = JSON.parse(fileContents);
    const summary = data.summary || "Aucun résumé disponible.";
    return NextResponse.json({ summary });
  } catch (error) {
    console.error("Erreur lors de la lecture du résumé:", error);
    return NextResponse.json(
      { error: "Impossible de charger le résumé" },
      { status: 500 }
    );
  }
}
