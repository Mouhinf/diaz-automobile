"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Info } from 'lucide-react';

export const AboutCallToAction = () => {
  return (
    <section className="py-12 md:py-16 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Découvrez Diaz Automobile
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-8">
          Apprenez-en davantage sur notre engagement envers la qualité, notre parking sécurisé et notre mission de vous offrir le meilleur service de vente et de location de véhicules.
        </p>
        <Link href="/about" passHref>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
            <Info className="mr-2 h-5 w-5" /> En savoir plus sur nous
          </Button>
        </Link>
      </div>
    </section>
  );
};