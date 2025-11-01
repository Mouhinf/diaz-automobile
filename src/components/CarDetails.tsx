"use client";

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle } from 'lucide-react';
import { CarGallery } from '@/components/CarGallery';

interface CarDetailsProps {
  car: {
    id: string;
    name: string;
    price: string;
    description: string;
    imageUrl: string;
    type: 'sale' | 'rent';
    fuel: string;
    transmission: string;
    location: string;
    images: string[];
    videos: string[];
  };
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
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">{car.name}</h1>
          <p className="text-5xl font-extrabold text-primary">{car.price}</p>

          <div className="grid grid-cols-2 gap-4 text-lg">
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

          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {car.description}
          </p>

          <div className="flex gap-4">
            <Button size="lg" className="flex-1">
              <MessageCircle className="mr-2 h-5 w-5" /> Contacter le vendeur
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