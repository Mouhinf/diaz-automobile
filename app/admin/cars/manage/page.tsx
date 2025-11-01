"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { getAllCars, deleteCar, Car } from '@/data/car-management';
import Link from 'next/link';
import { Edit, Trash2, PlusCircle } from 'lucide-react';

const AdminManageCarsPage = () => {
  const [cars, setCars] = useState<Car[]>([]);

  const fetchCars = () => {
    setCars(getAllCars());
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleDelete = (carId: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce véhicule ?")) {
      const success = deleteCar(carId);
      if (success) {
        toast.success('Véhicule supprimé avec succès !');
        fetchCars(); // Re-fetch cars after deletion
      } else {
        toast.error('Erreur lors de la suppression du véhicule.');
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
          Gérer les Véhicules
        </h1>
        <Link href="/admin/cars/add">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Ajouter un nouveau véhicule
          </Button>
        </Link>
      </div>

      {cars.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-400 text-lg">
          Aucun véhicule à gérer pour le moment.
        </p>
      ) : (
        <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Prix</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cars.map((car) => (
                <TableRow key={car.id}>
                  <TableCell className="font-medium">{car.name}</TableCell>
                  <TableCell>{car.type === 'sale' ? 'Vente' : 'Location'}</TableCell>
                  <TableCell>{car.price}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      car.status === 'available' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      car.status === 'sold' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                      'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    }`}>
                      {car.status === 'available' ? 'Disponible' : car.status === 'sold' ? 'Vendu' : 'Loué'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link href={`/admin/cars/add/${car.id}`} passHref>
                      <Button variant="ghost" size="icon" className="mr-2">
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Modifier</span>
                      </Button>
                    </Link>
                    <Button variant="destructive" size="icon" onClick={() => handleDelete(car.id)}>
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Supprimer</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default AdminManageCarsPage;