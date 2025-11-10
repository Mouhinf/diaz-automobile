"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface CarCardProps {
  car: {
    id: string;
    name: string;
    price: string;
    description: string;
    imageUrl: string;
    type: 'sale' | 'rent';
  };
}

export const CarCard = ({ car }: CarCardProps) => {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="p-0">
        <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
          <Image
            src={car.imageUrl}
            alt={car.name}
            fill // Utilisation de la prop 'fill'
            className="object-cover transition-transform duration-300 hover:scale-105" // Utilisation de la classe 'object-cover'
          />
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <CardTitle className="text-xl font-semibold mb-2">{car.name}</CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
          {car.description}
        </CardDescription>
        <p className="text-2xl font-bold text-primary">{car.price}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full">
          {car.type === 'sale' ? 'Voir les détails' : 'Louer maintenant'}
        </Button>
      </CardFooter>
    </Card>
  );
};