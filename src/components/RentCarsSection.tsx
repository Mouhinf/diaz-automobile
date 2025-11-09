"use client";

import React, { useEffect, useState } from 'react';
import { CarCard } from './CarCard';
import { getCarsByType, Car } from '@/data/car-management';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export const RentCarsSection = () => {
  const [rentCars, setRentCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRentCars = async () => {
      try {
        const cars = await getCarsByType('rent');
        setRentCars(cars.slice(0, 4)); // Afficher les 4 premières voitures à louer
      } catch (error) {
        console.error("Erreur lors du chargement des voitures à louer:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRentCars();
  }, []);

  if (loading) {
    return (
      <section className="py-12 md:py-16 bg-gray-50 dark:bg-gray-800 text-center">
        <p className="text-lg text-gray-600 dark:text-gray-400">Chargement des voitures à louer...</p>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-900 dark:text-gray-100">
          Voitures à Louer
        </h2>
        {rentCars.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {rentCars.map((car) => (
              <Link key={car.id} href={`/vehicles/${car.id}`}>
                <CarCard car={car} />
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-400 text-lg">
            Aucune voiture à louer pour le moment.
          </p>
        )}
        <div className="text-center mt-10">
          <Link href="/location" passHref>
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              Voir toutes les voitures à louer <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};