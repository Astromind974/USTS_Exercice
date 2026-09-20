import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "public", "mails-today.json");
    const fileContents = await readFile(filePath, "utf-8");
    const emails = JSON.parse(fileContents);
    return NextResponse.json(emails);
  } catch (error) {
    console.error("Erreur lors de la lecture des e-mails:", error);
    return NextResponse.json(
      { error: "Impossible de charger les e-mails" },
      { status: 500 }
    );
  }
}
