"use client";

import { useState } from "react";

interface ReplyFormProps {
  onSubmit: (content: string) => void;
  isLoading: boolean;
}

export default function ReplyForm({ onSubmit, isLoading }: ReplyFormProps) {
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(content);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md min-h-[120px]"
        placeholder="Saisissez votre réponse..."
      />
      <button
        type="submit"
        disabled={isLoading}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {isLoading ? "Envoi..." : "Envoyer"}
      </button>
    </form>
  );
}
