import { Reply } from "@/lib/types/email";

export async function sendReply(reply: Reply): Promise<void> {
  const res = await fetch("http://localhost:3000/api/reply", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reply),
  });
  if (!res.ok) throw new Error("Failed to send reply");
}
