import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { to, subject, content } = await request.json();
  const N8N_API_URL = process.env.N8N_API_URL || "http://localhost:5678/webhook/send-reply";

  try {
    const response = await fetch(N8N_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ to, subject, content }),
    });

    if (!response.ok) {
      throw new Error("Erreur lors de l'appel à n8n");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur lors de l'envoi de la réponse:", error);
    return NextResponse.json(
      { error: "Impossible d'envoyer la réponse" },
      { status: 500 }
    );
  }
}
