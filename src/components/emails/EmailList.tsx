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
    <div className="space-y-4 px-2 md:px-0">
      <EmailFilters filter={filter} onFilterChange={setFilter} />
      {filteredEmails.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredEmails.map((email) => (
            <EmailCard key={email.id} email={email} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-slate-500 dark:text-slate-400 text-sm-md">
            Aucun e-mail ne correspond aux filtres.
          </p>
        </div>
      )}
    </div>
  );
}
