interface SummarySectionProps {
  summary: string;
}

export default function SummarySection({ summary }: SummarySectionProps) {
  return (
    <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-200">
      <h2 className="text-lg font-semibold mb-2 text-blue-800">Résumé des e-mails du jour</h2>
      <p className="text-gray-800 whitespace-pre-wrap">{summary || "Aucun résumé disponible."}</p>
    </div>
  );
}
