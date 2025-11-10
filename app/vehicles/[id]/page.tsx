"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getCarById, Car } from '@/data/car-management';
import { CarDetails } from '@/components/CarDetails';

const VehicleDetailPage = () => {
  const params = useParams();
  const carId = params.id as string;
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCar = async () => {
      if (carId) {
        try {
          const fetchedCar = await getCarById(carId);
          setCar(fetchedCar);
        } catch (error) {
          console.error("Erreur lors du chargement du véhicule:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchCar();
  }, [carId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <p className="text-xl text-gray-600 dark:text-gray-400">Chargement du véhicule...</p>
      </div>
    );
  }

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