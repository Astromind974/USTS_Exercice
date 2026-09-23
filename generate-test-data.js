"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// generate-test-data.ts
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var fakeEmails, createdEmails, fakeSummary, emails;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("🔧 Génération des données de test...");
                    // 1. Supprimer les anciennes données (optionnel)
                    return [4 /*yield*/, prisma.reply.deleteMany()];
                case 1:
                    // 1. Supprimer les anciennes données (optionnel)
                    _a.sent();
                    return [4 /*yield*/, prisma.summary.deleteMany()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, prisma.email.deleteMany()];
                case 3:
                    _a.sent();
                    console.log("✅ Anciennes données supprimées.");
                    fakeEmails = [
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
                    return [4 /*yield*/, prisma.email.createMany({
                            data: fakeEmails,
                        })];
                case 4:
                    createdEmails = _a.sent();
                    console.log("\u2705 ".concat(createdEmails.count, " e-mails ins\u00E9r\u00E9s."));
                    fakeSummary = {
                        content: "R\u00E9sum\u00E9 des e-mails du 20/09/2026 :\n    - 10 e-mails re\u00E7us aujourd'hui.\n    - Th\u00E8mes principaux : R\u00E9unions (2), Questions techniques (3), Notifications (5).\n    - Actions requises : R\u00E9pondre \u00E0 Alice Smith (question sur n8n),Marie Dupont (collaboration), et l'admin USTS (rappel de rendu).\n    - Aucun e-mail urgent signal\u00E9.",
                        date: new Date(),
                    };
                    return [4 /*yield*/, prisma.summary.create({
                            data: fakeSummary,
                        })];
                case 5:
                    _a.sent();
                    console.log("✅ Résumé IA généré.");
                    return [4 /*yield*/, prisma.email.findMany()];
                case 6:
                    emails = _a.sent();
                    if (!(emails.length > 0)) return [3 /*break*/, 8];
                    return [4 /*yield*/, prisma.reply.createMany({
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
                        })];
                case 7:
                    _a.sent();
                    console.log("✅ 3 réponses fictives ajoutées.");
                    _a.label = 8;
                case 8:
                    console.log("🎉 Génération des données de test terminée !");
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .catch(function (e) {
    console.error("❌ Erreur lors de la génération des données :", e);
    process.exit(1);
})
    .finally(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
