// src/lib/api/reply.ts
import { Email } from "@/lib/types/email";

interface SendReplyArgs {
  email: Email;              // l'e-mail complet (pour récupérer l'ID Prisma et l'expéditeur)
  body: string;              // le texte de la réponse
  isAuto?: boolean;          // réponse automatique ?
}

export async function sendReply({ email, body, isAuto = false }: SendReplyArgs) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/reply`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      emailId: email.id,   // ✅ l'ID Prisma de l'e-mail (UUID de la table Email)
      body,                // ✅ "body" comme attendu par la route
      isAuto,
    }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.error || "Échec de l'envoi de la réponse");
  }
  return res.json();
}
