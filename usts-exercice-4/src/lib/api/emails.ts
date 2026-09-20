import { Email } from "@/lib/types/email";

export async function getEmails(): Promise<Email[]> {
  const res = await fetch("http://localhost:3000/api/emails");
  if (!res.ok) throw new Error("Failed to fetch emails");
  return res.json();
}

export async function getSummary(): Promise<string> {
  const res = await fetch("http://localhost:3000/api/summary");
  if (!res.ok) throw new Error("Failed to fetch summary");
  const data = await res.json();
  return data.summary || "";
}
