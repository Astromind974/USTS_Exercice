"use client";

import { Email } from "@/lib/types/email";
import { sendReply } from "@/lib/api/reply";
import { useState } from "react";

interface ReplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: Email;
}

export default function ReplyModal({ isOpen, onClose, email }: ReplyModalProps) {
  const [replyContent, setReplyContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAutoReply, setIsAutoReply] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await sendReply({
        to: email.sender,
        subject: `Re: ${email.subject}`,
        content: isAutoReply
          ? `Réponse automatique à votre e-mail du ${new Date(email.date).toLocaleDateString("fr-FR")}:\n\n${email.content}`
          : replyContent,
      });
      alert("Réponse envoyée avec succès !");
      onClose();
    } catch (error) {
      alert("Erreur lors de l'envoi de la réponse.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Répondre à {email.sender}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            ✕
          </button>
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={isAutoReply}
              onChange={(e) => setIsAutoReply(e.target.checked)}
              className="mr-2 h-4 w-4"
            />
            <span className="text-sm text-gray-600">Réponse automatique (IA)</span>
          </label>
        </div>
        {!isAutoReply && (
          <div className="mb-4">
            <label htmlFor="replyContent" className="block text-sm font-medium text-gray-700 mb-1">
              Votre réponse
            </label>
            <textarea
              id="replyContent"
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md min-h-[120px]"
              placeholder="Saisissez votre réponse..."
            />
          </div>
        )}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
          >
            Annuler
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? "Envoi..." : "Envoyer"}
          </button>
        </div>
      </div>
    </div>
  );
}
