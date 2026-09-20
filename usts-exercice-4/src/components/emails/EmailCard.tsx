"use client";

import { Email } from "@/lib/types/email";
import ReplyModal from "@/components/reply/ReplyModal";
import { useState } from "react";

export default function EmailCard({ email }: { email: Email }) {
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg truncate">{email.subject}</h3>
          <p className="text-sm text-gray-500">{email.sender}</p>
          <p className="text-xs text-gray-400">
            {new Date(email.date).toLocaleString("fr-FR")}
          </p>
        </div>
        <button
          onClick={() => setIsReplyModalOpen(true)}
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          Répondre
        </button>
      </div>
      <p className="mt-2 text-gray-700 line-clamp-3">{email.content}</p>
      <ReplyModal
        isOpen={isReplyModalOpen}
        onClose={() => setIsReplyModalOpen(false)}
        email={email}
      />
    </div>
  );
}
