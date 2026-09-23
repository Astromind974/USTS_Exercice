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
    if (!isAutoReply && !replyContent.trim()) {
      alert("Veuillez saisir une réponse.");
      return;
    }

    setIsLoading(true);
    try {
      await sendReply({
        email,
        body: replyContent, // Texte manuel OU consignes pour l'IA
        isAuto: isAutoReply,
      });

      alert("Réponse envoyée avec succès !");
      setReplyContent("");
      onClose();
    } catch (error: any) {
      alert(error?.message || "Erreur lors de l'envoi de la réponse.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 max-w-md w-full shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
            Répondre à {email.sender}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">✕</button>
        </div>

        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={isAutoReply}
              onChange={(e) => setIsAutoReply(e.target.checked)}
              className="mr-2 h-4 w-4 text-blue-600"
            />
            <span className="text-sm text-slate-600 dark:text-slate-400">
              Générer la réponse par IA
            </span>
          </label>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            {isAutoReply ? "Consignes particulières pour l'IA (optionnel)" : "Votre réponse"}
          </label>
          <textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 min-h-[120px] text-sm"
            placeholder={isAutoReply ? "Ex: Réponds poliment en refusant l'invitation..." : "Saisissez votre réponse..."}
          />
        </div>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 text-slate-600 dark:text-slate-400">
            Annuler
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? "Traitement..." : isAutoReply ? "Générer & Envoyer" : "Envoyer"}
          </button>
        </div>
      </div>
    </div>
  );
}
