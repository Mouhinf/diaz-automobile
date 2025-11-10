import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../src/globals.css";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { QueryProvider } from "@/components/QueryProvider";
import { Header } from "@/components/Header"; // Import du Header
import { Footer } from "@/components/Footer"; // Import du Footer

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Diaz Automobile",
  description: "Plateforme de vente et location de voitures",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <QueryProvider>
          <TooltipProvider>
            <Header /> {/* Ajout du Header */}
            <main className="flex-grow"> {/* Ajout d'une balise main pour le contenu principal */}
              {children}
            </main>
            <SonnerToaster />
            <Footer /> {/* Ajout du Footer */}
          </TooltipProvider>
        </QueryProvider>
        <MadeWithDyad />
      </body>
    </html>
  );
}