import { featuredCars } from './cars';

export interface Car {
  id: string;
  name: string;
  brand: string; // Nouveau champ
  model: string; // Nouveau champ
  year: number; // Nouveau champ
  mileage: string; // Nouveau champ
  price: string;
  description: string;
  imageUrl: string;
  type: 'sale' | 'rent';
  fuel: string;
  transmission: string;
  location: string;
  images: string[];
  videos: string[];
  status: 'available' | 'sold' | 'rented';
  features: string[]; // Nouveau champ
}

export const addCar = (newCar: Omit<Car, 'id' | 'images' | 'videos' | 'status' | 'brand' | 'model' | 'year' | 'mileage' | 'features'> & {
  images?: string[];
  videos?: string[];
  status?: 'available' | 'sold' | 'rented';
  brand: string;
  model: string;
  year: number;
  mileage: string;
  features?: string[];
}) => {
  const id = (featuredCars.length + 1).toString(); // Simple ID generation
  const carToAdd: Car = {
    id,
    ...newCar,
    images: newCar.images || [],
    videos: newCar.videos || [],
    status: newCar.status || 'available',
    features: newCar.features || [],
  };
  featuredCars.push(carToAdd);
  return carToAdd;
};

export const updateCar = (updatedCar: Car) => {
  const index = featuredCars.findIndex(car => car.id === updatedCar.id);
  if (index !== -1) {
    featuredCars[index] = updatedCar;
    return featuredCars[index];
  }
  return null;
};

export const deleteCar = (carId: string) => {
  const initialLength = featuredCars.length;
  const carsAfterDeletion = featuredCars.filter(car => car.id !== carId);
  featuredCars.splice(0, featuredCars.length, ...carsAfterDeletion); // Update the original array
  return featuredCars.length < initialLength; // Return true if a car was deleted
};

export const getCarById = (id: string) => {
  return featuredCars.find(car => car.id === id);
};

export const getAllCars = () => {
  return [...featuredCars]; // Return a copy to prevent direct modification
};