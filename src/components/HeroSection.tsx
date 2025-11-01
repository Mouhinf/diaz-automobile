"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link'; // Import de Link pour la navigation

export const HeroSection = () => {
  return (
    <section className="relative h-[60vh] md:h-[70vh] bg-cover bg-center flex items-center justify-center text-center" style={{ backgroundImage: "url('/placeholder.svg')" }}>
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative z-10 text-white p-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
          Trouvez Votre Véhicule Idéal Chez Diaz Automobile
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Vente et location de voitures neuves et d'occasion avec un service exceptionnel.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/vente" passHref> {/* Ajout du Link pour la navigation */}
            <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              Nos voitures en vente {/* Texte du bouton modifié */}
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
            Louer une voiture
          </Button>
        </div>
      </div>
    </section>
  );
};