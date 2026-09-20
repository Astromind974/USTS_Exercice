import EmailList from "@/components/emails/EmailList";
import SummarySection from "@/components/SummarySection";
import { getEmails, getSummary } from "@/lib/api/emails";

export default async function Home() {
  const emails = await getEmails();
  const summary = await getSummary();

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">E-mails du jour</h1>
      <SummarySection summary={summary} />
      <EmailList initialEmails={emails} />
    </div>
  );
}
