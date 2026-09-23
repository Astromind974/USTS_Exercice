"use client";

import { Email } from "@/lib/types/email";
import ReplyModal from "@/components/reply/ReplyModal";
import { useState } from "react";

export default function EmailCard({ email }: { email: Email }) {
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);

  return (
    <div className="email-card">
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-md-lg truncate text-slate-800 dark:text-slate-100">
            {email.subject}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            De : {email.sender}
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            {new Date(email.date).toLocaleString("fr-FR")}
          </p>
        </div>

        <button
          onClick={() => setIsReplyModalOpen(true)}
          className="flex-shrink-0 ml-2 px-2 py-1 text-xs-sm
                     bg-blue-600 text-white rounded-md
                     hover:bg-blue-700 transition-colors
                     dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          Répondre
        </button>
      </div>

      <p className="mt-2 text-slate-700 dark:text-slate-300 line-clamp-3 text-sm-md">
        {email.content}
      </p>

      <ReplyModal
        isOpen={isReplyModalOpen}
        onClose={() => setIsReplyModalOpen(false)}
        email={email}
      />
    </div>
  );
}
