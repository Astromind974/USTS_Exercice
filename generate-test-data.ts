// generate-test-data.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🔧 Génération des données de test...");

  // 1. Supprimer les anciennes données (optionnel)
  await prisma.reply.deleteMany();
  await prisma.summary.deleteMany();
  await prisma.email.deleteMany();
  console.log("✅ Anciennes données supprimées.");

  // 2. Générer des e-mails fictifs
  const fakeEmails = [
    {
      sender: "john.doe@example.com",
      subject: "Réunion de projet - USTS",
      content: "Bonjour, je vous propose une réunion demain à 14h pour discuter de l'avancement du projet USTS. Cordialement, John.",
      date: new Date("2026-09-20T09:00:00Z"),
    },
    {
      sender: "support@company.fr",
      subject: "Votre compte a été mis à jour",
      content: "Votre compte a été mis à jour avec succès. Vous pouvez maintenant accéder aux nouvelles fonctionnalités.",
      date: new Date("2026-09-20T10:30:00Z"),
    },
    {
      sender: "alice.smith@test.org",
      subject: "Question sur l'exercice 4",
      content: "Bonjour, j'ai une question concernant la partie automatisation avec n8n. Pouvez-vous m'aider ?Merci, Alice.",
      date: new Date("2026-09-20T11:15:00Z"),
    },
    {
      sender: "no-reply@github.com",
      subject: "Nouvelle issue ouverte sur votre dépôt",
      content: "Une nouvelle issue a été ouverte sur votre dépôt USTS-Exercice-4. Titre : 'Problème avec Prisma'.",
      date: new Date("2026-09-20T12:45:00Z"),
    },
    {
      sender: "newsletter@technews.com",
      subject: "Les dernières actualités tech",
      content: "Découvrez les dernières actualités dans le monde de la tech : React 19, Next.js 16, et plus encore !",
      date: new Date("2026-09-20T14:20:00Z"),
    },
    {
      sender: "bob.johnson@work.io",
      subject: "Documentation pour le projet",
      content: "Voici la documentation mise à jour pour le projet. Vous pouvez la consulter ici : [lien fictif].",
      date: new Date("2026-09-20T15:00:00Z"),
    },
    {
      sender: "contact@service.com",
      subject: "Votre abonnement expire bientôt",
      content: "Votre abonnement Premium expire dans 3 jours. Renouvelez-le pour continuer à profiter de nos services.",
      date: new Date("2026-09-20T16:30:00Z"),
    },
    {
      sender: "marie.dupont@etudiant.fr",
      subject: "Demande de collaboration",
      content: "Bonjour, je suis étudiant en informatique et je souhaiterais collaborer sur votre projet. Voici mon portfolio : [lien fictif].",
      date: new Date("2026-09-20T17:10:00Z"),
    },
    {
      sender: "admin@usts.fr",
      subject: "Rappel : Rendu de l'exercice 4",
      content: "Rappel : Le rendu de l'exercice 4 est prévu pour demain à minuit. Pensez à pousser votre code sur GitHub.",
      date: new Date("2026-09-20T18:00:00Z"),
    },
    {
      sender: "marketing@brand.com",
      subject: "Offre spéciale pour vous",
      content: "Profitez de -20% sur tous nos produits jusqu'à la fin du mois ! Code promo : WELCOME20.",
      date: new Date("2026-09-20T19:45:00Z"),
    },
  ];

  // Insérer les e-mails dans la DB
  const createdEmails = await prisma.email.createMany({
    data: fakeEmails,
  });
  console.log(`✅ ${createdEmails.count} e-mails insérés.`);

  // 3. Générer un résumé fictif
  const fakeSummary = {
    content: `Résumé des e-mails du 20/09/2026 :
    - 10 e-mails reçus aujourd'hui.
    - Thèmes principaux : Réunions (2), Questions techniques (3), Notifications (5).
    - Actions requises : Répondre à Alice Smith (question sur n8n),Marie Dupont (collaboration), et l'admin USTS (rappel de rendu).
    - Aucun e-mail urgent signalé.`,
    date: new Date(),
  };

  await prisma.summary.create({
    data: fakeSummary,
  });
  console.log("✅ Résumé IA généré.");

  // 4. Ajouter quelques réponses fictives (optionnel)
  const emails = await prisma.email.findMany();
  if (emails.length > 0) {
    await prisma.reply.createMany({
      data: [
        {
          emailId: emails[0].id,
          content: "Merci John, je serai présent à la réunion. À demain !",
          isAuto: false,
        },
        {
          emailId: emails[2].id,
          content: "Réponse automatique : Merci pour votre question, Alice. Voici un lien vers la documentation : [lien fictif].",
          isAuto: true,
        },
        {
          emailId: emails[4].id,
          content: "Je ne suis pas intéressé par votre newsletter. Merci de me retirer de la liste.",
          isAuto: false,
        },
      ],
    });
    console.log("✅ 3 réponses fictives ajoutées.");
  }

  console.log("🎉 Génération des données de test terminée !");
}

main()
  .catch((e) => {
    console.error("❌ Erreur lors de la génération des données :", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });