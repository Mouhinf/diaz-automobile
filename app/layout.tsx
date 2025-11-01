import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../src/globals.css";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { QueryProvider } from "@/components/QueryProvider"; // Import du nouveau QueryProvider

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
        <QueryProvider> {/* Utilisation du QueryProvider */}
          <TooltipProvider>
            {children}
            <SonnerToaster />
          </TooltipProvider>
        </QueryProvider>
        <MadeWithDyad />
      </body>
    </html>
  );
}