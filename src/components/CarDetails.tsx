"use client";

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Phone, CalendarCheck } from 'lucide-react';
import { CarGallery } from '@/components/CarGallery';
import { ContactSellerDialog } from '@/components/ContactSellerDialog';
import { ReservationDialog } from '@/components/ReservationDialog';
import { Car } from '@/data/car-management'; // Import de l'interface Car

interface CarDetailsProps {
  car: Car; // Utilisation de l'interface Car
}

export const CarDetails = ({ car }: CarDetailsProps) => {
  if (!car) {
    return <p className="text-center text-lg">Véhicule non trouvé.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Car Gallery */}
        <div>
          <CarGallery images={car.images} videos={car.videos} />
        </div>

        {/* Car Information */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">{car.brand} {car.model}</h1>
          <p className="text-5xl font-extrabold text-primary">{car.price}</p>

          <div className="grid grid-cols-2 gap-4 text-lg">
            <div>
              <span className="font-semibold">Année:</span> {car.year}
            </div>
            <div>
              <span className="font-semibold">Kilométrage:</span> {car.mileage}
            </div>
            <div>
              <span className="font-semibold">Carburant:</span> {car.fuel}
            </div>
            <div>
              <span className="font-semibold">Transmission:</span> {car.transmission}
            </div>
            <div>
              <span className="font-semibold">Localisation:</span> {car.location}
            </div>
            <div>
              <span className="font-semibold">Type:</span> {car.type === 'sale' ? 'À vendre' : 'À louer'}
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-6">Description</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {car.description}
          </p>

          {car.features && car.features.length > 0 && (
            <>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-6">Caractéristiques Clés</h2>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                {car.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </>
          )}

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            {car.type === 'sale' ? (
              <ContactSellerDialog carName={car.name}>
                <Button size="lg" className="flex-1">
                  <MessageCircle className="mr-2 h-5 w-5" /> Contacter le vendeur
                </Button>
              </ContactSellerDialog>
            ) : (
              <ReservationDialog carName={car.name}>
                <Button size="lg" className="flex-1">
                  <CalendarCheck className="mr-2 h-5 w-5" /> Réserver maintenant
                </Button>
              </ReservationDialog>
            )}
            <Button size="lg" variant="outline" className="flex-1">
              <Phone className="mr-2 h-5 w-5" /> Appeler
            </Button>
            <Button size="lg" variant="outline" className="flex-1">
              <Heart className="mr-2 h-5 w-5" /> Ajouter aux favoris
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};