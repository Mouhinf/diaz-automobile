"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { CarCard } from '@/components/CarCard';
import { CarFilter } from '@/components/CarFilter';
import { getCarsByType, Car } from '@/data/car-management'; // Import de getCarsByType
import Link from 'next/link';

const LocationPage = () => {
  const [allRentCars, setAllRentCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    brand: '',
    minPrice: '',
    maxPrice: '',
    fuel: '',
    transmission: '',
    location: '',
  });

  const fetchRentCars = useCallback(async () => {
    setLoading(true);
    try {
      const cars = await getCarsByType('rent');
      setAllRentCars(cars);
      setFilteredCars(cars); // Initialiser les voitures filtrées avec toutes les voitures de location
    } catch (error) {
      console.error("Erreur lors du chargement des voitures à louer:", error);
      // Gérer l'erreur
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRentCars();
  }, [fetchRentCars]);

  useEffect(() => {
    let cars = [...allRentCars]; // Travailler sur une copie

    if (filters.search) {
      cars = cars.filter(car =>
        car.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        car.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        car.brand.toLowerCase().includes(filters.search.toLowerCase()) ||
        car.model.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    if (filters.brand) {
      cars = cars.filter(car => car.brand.toLowerCase() === filters.brand.toLowerCase());
    }
    if (filters.minPrice) {
      cars = cars.filter(car => {
        const priceValue = parseFloat(car.price.replace(/[^0-9,-]+/g, "").replace(',', '.'));
        return priceValue >= parseFloat(filters.minPrice);
      });
    }
    if (filters.maxPrice) {
      cars = cars.filter(car => {
        const priceValue = parseFloat(car.price.replace(/[^0-9,-]+/g, "").replace(',', '.'));
        return priceValue <= parseFloat(filters.maxPrice);
      });
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
  }, [filters, allRentCars]);

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-lg text-gray-600 dark:text-gray-400">Chargement des voitures à louer...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">
        Voitures à Louer
      </h1>

      <CarFilter onFilterChange={handleFilterChange} />

      {filteredCars.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCars.map((car) => (
            <Link key={car.id} href={`/vehicles/${car.id}`}>
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