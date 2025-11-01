"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import { getCarById } from '@/data/car-management';
import { CarDetails } from '@/components/CarDetails';

const VehicleDetailPage = () => {
  const params = useParams();
  const carId = params.id as string;

  const car = getCarById(carId);

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <p className="text-xl text-gray-600 dark:text-gray-400">Véhicule non trouvé.</p>
      </div>
    );
  }

  return <CarDetails car={car} />;
};

export default VehicleDetailPage;