import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./../styles/globals.css";
import ThemeToggle from "@/components/ThemeToggle";

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
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className}>
        <header className="flex justify-end p-4">
          <ThemeToggle />
        </header>
        <main className="min-h-screen p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </body>
    </html>
  );
}
