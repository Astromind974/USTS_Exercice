import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "USTS Exercice 4 - Gestion des E-mails",
  description: "Interface pour consulter et répondre aux e-mails du jour.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
