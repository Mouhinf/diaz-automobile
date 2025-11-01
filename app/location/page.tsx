"use client";

import React, { useState, useEffect } from 'react';
import { CarCard } from '@/components/CarCard';
import { CarFilter } from '@/components/CarFilter';
import { featuredCars } from '@/data/cars';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const LocationPage = () => {
  const [filteredCars, setFilteredCars] = useState(featuredCars.filter(car => car.type === 'rent'));
  const [filters, setFilters] = useState({
    search: '',
    brand: '',
    minPrice: '',
    maxPrice: '',
    fuel: '',
    transmission: '',
    location: '',
  });

  useEffect(() => {
    let cars = featuredCars.filter(car => car.type === 'rent');

    if (filters.search) {
      cars = cars.filter(car =>
        car.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        car.description.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    if (filters.brand) {
      cars = cars.filter(car => car.name.includes(filters.brand));
    }
    if (filters.minPrice) {
      cars = cars.filter(car => parseFloat(car.price.replace(/[^0-9,-]+/g, "").replace(',', '.')) >= parseFloat(filters.minPrice));
    }
    if (filters.maxPrice) {
      cars = cars.filter(car => parseFloat(car.price.replace(/[^0-9,-]+/g, "").replace(',', '.')) <= parseFloat(filters.maxPrice));
    }
    if (filters.fuel) {
      cars = cars.filter(car => car.fuel === filters.fuel);
    }
    if (filters.transmission) {
      cars = cars.filter(car => car.transmission === filters.transmission);
    }
    if (filters.location) {
      cars = cars.filter(car => car.location === filters.location);
    }

    setFilteredCars(cars);
  }, [filters]);

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">
        Voitures à Louer
      </h1>

      <CarFilter onFilterChange={handleFilterChange} />

      {/* Le bouton "Ajouter un véhicule à louer" est retiré pour les clients */}
      {/* <div className="flex justify-end mb-6">
        <Link href="/location/add">
          <Button>Ajouter un véhicule à louer</Button>
        </Link>
      </div> */}

      {filteredCars.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCars.map((car) => (
            <Link key={car.id} href={`/location/${car.id}`}>
              <CarCard car={car} />
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 dark:text-gray-400 text-lg">
          Aucune voiture ne correspond à vos critères de recherche.
        </p>
      )}
    </div>
  );
};

export default LocationPage;