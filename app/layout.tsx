import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../src/globals.css";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MadeWithDyad } from "@/components/made-with-dyad";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Diaz Automobile",
  description: "Plateforme de vente et location de voitures",
};

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            {children}
            <SonnerToaster />
          </TooltipProvider>
        </QueryClientProvider>
        <MadeWithDyad />
      </body>
    </html>
  );
}