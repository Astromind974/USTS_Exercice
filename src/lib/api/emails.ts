import { Email } from "@/lib/types/email";

export async function getEmails(): Promise<Email[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/emails`);
  if (!res.ok) throw new Error("Failed to fetch emails");
  return res.json();
}

export async function getSummary(): Promise<string> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/summary`);
  if (!res.ok) throw new Error("Failed to fetch summary");
  const data = await res.json();
  return data.content || "";
}
