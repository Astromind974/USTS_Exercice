import prisma from "@/lib/db";
import SummarySection from "@/components/SummarySection";
import EmailList from "@/components/emails/EmailList";

export default async function Home() {
  const emails = await prisma.email.findMany({
    orderBy: { date: "desc" },
    include: { replies: true },
  });

  const summary = await prisma.summary.findFirst({
    orderBy: { date: "desc" },
  });

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="heading-responsive font-bold text-slate-800 dark:text-slate-100 mb-6">
        E-mails du jour
      </h1>
      <SummarySection summary={summary?.content || "Aucun résumé disponible."} />
      <EmailList initialEmails={emails} />
    </div>
  );
}
