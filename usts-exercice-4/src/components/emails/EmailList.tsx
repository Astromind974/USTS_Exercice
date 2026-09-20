"use client";

import { useState } from "react";
import EmailCard from "./EmailCard";
import EmailFilters from "./EmailFilters";
import { Email } from "@/lib/types/email";

export default function EmailList({ initialEmails }: { initialEmails: Email[] }) {
  const [emails, setEmails] = useState<Email[]>(initialEmails);
  const [filter, setFilter] = useState({ sender: "", keyword: "" });

  const filteredEmails = emails.filter((email) => {
    const matchSender = email.sender.toLowerCase().includes(filter.sender.toLowerCase());
    const matchKeyword =
      email.subject.toLowerCase().includes(filter.keyword.toLowerCase()) ||
      email.content.toLowerCase().includes(filter.keyword.toLowerCase());
    return matchSender && matchKeyword;
  });

  return (
    <div className="space-y-4">
      <EmailFilters filter={filter} onFilterChange={setFilter} />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredEmails.map((email) => (
          <EmailCard key={email.id} email={email} />
        ))}
      </div>
      {filteredEmails.length === 0 && (
        <p className="text-gray-500">Aucun e-mail ne correspond aux filtres.</p>
      )}
    </div>
  );
}
