interface SummarySectionProps {
  summary: string;
}

export default function SummarySection({ summary }: SummarySectionProps) {
  return (
    <div className="summary-section">
      <h2 className="text-lg font-semibold mb-2 text-blue-800 dark:text-blue-200">
        Résumé des e-mails du jour
      </h2>
      <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap text-sm-md">
        {summary || "Aucun résumé disponible."}
      </p>
    </div>
  );
}
