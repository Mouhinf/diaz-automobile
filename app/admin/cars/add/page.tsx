"use client";

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { addCar, updateCar, getCarById, Car } from '@/data/car-management';
import { useParams, useRouter } from 'next/navigation';

const AdminAddEditCarPage = () => {
  const router = useRouter();
  const params = useParams();
  const carId = params.id as string;
  const isEditing = !!carId;

  const [carData, setCarData] = useState<Omit<Car, 'id'>>({
    name: '',
    brand: '',
    model: '',
    year: 0,
    mileage: '',
    price: '',
    description: '',
    imageUrl: '',
    type: 'sale',
    fuel: '',
    transmission: '',
    location: '',
    images: [],
    videos: [],
    status: 'available',
    features: [],
  });

  useEffect(() => {
    if (isEditing) {
      const existingCar = getCarById(carId);
      if (existingCar) {
        setCarData(existingCar);
      } else {
        toast.error("Véhicule non trouvé pour l'édition.");
        router.push('/admin/cars/manage');
      }
    }
  }, [carId, isEditing, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setCarData(prev => ({ ...prev, [id]: id === 'year' ? parseInt(value) || 0 : value }));
  };

  const handleSelectChange = (id: keyof Omit<Car, 'id'>, value: string) => {
    setCarData(prev => ({ ...prev, [id]: value as any }));
  };

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>, mediaType: 'images' | 'videos') => {
    const { value } = e.target;
    setCarData(prev => ({ ...prev, [mediaType]: value.split(',').map(s => s.trim()).filter(Boolean) }));
  };

  const handleFeaturesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    // Split by new line or comma, then trim and filter empty strings
    setCarData(prev => ({ ...prev, features: value.split(/[\n,]/).map(s => s.trim()).filter(Boolean) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      updateCar({ ...carData, id: carId });
      toast.success('Véhicule modifié avec succès !');
    } else {
      addCar(carData);
      toast.success('Véhicule ajouté avec succès !');
    }
    router.push('/admin/cars/manage');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">
        {isEditing ? 'Modifier le Véhicule' : 'Ajouter un Véhicule'}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <div>
          <Label htmlFor="name">Nom du véhicule</Label>
          <Input id="name" value={carData.name} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="brand">Marque</Label>
          <Input id="brand" value={carData.brand} onChange={handleChange} required placeholder="Ex: Tesla" />
        </div>
        <div>
          <Label htmlFor="model">Modèle</Label>
          <Input id="model" value={carData.model} onChange={handleChange} required placeholder="Ex: Model 3" />
        </div>
        <div>
          <Label htmlFor="year">Année</Label>
          <Input id="year" type="number" value={carData.year === 0 ? '' : carData.year} onChange={handleChange} required placeholder="Ex: 2022" />
        </div>
        <div>
          <Label htmlFor="mileage">Kilométrage</Label>
          <Input id="mileage" value={carData.mileage} onChange={handleChange} required placeholder="Ex: 25 000 km" />
        </div>
        <div>
          <Label htmlFor="type">Type d'annonce</Label>
          <Select value={carData.type} onValueChange={(value) => handleSelectChange('type', value)} required>
            <SelectTrigger id="type">
              <SelectValue placeholder="Sélectionner le type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sale">À vendre</SelectItem>
              <SelectItem value="rent">À louer</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="price">Prix (FCFA ou FCFA/jour)</Label>
          <Input id="price" value={carData.price} onChange={handleChange} required placeholder="Ex: 15000000 ou 98000 FCFA/jour" />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" value={carData.description} onChange={handleChange} required rows={5} />
        </div>
        <div>
          <Label htmlFor="features">Caractéristiques clés (une par ligne ou séparées par des virgules)</Label>
          <Textarea id="features" value={carData.features.join('\n')} onChange={handleFeaturesChange} rows={5} placeholder="Ex: Climatisation&#10;GPS&#10;Sièges en cuir" />
        </div>
        <div>
          <Label htmlFor="fuel">Carburant</Label>
          <Select value={carData.fuel} onValueChange={(value) => handleSelectChange('fuel', value)} required>
            <SelectTrigger id="fuel">
              <SelectValue placeholder="Sélectionner le type de carburant" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Essence">Essence</SelectItem>
              <SelectItem value="Diesel">Diesel</SelectItem>
              <SelectItem value="Électrique">Électrique</SelectItem>
              <SelectItem value="Hybride">Hybride</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="transmission">Transmission</Label>
          <Select value={carData.transmission} onValueChange={(value) => handleSelectChange('transmission', value)} required>
            <SelectTrigger id="transmission">
              <SelectValue placeholder="Sélectionner le type de transmission" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Manuelle">Manuelle</SelectItem>
              <SelectItem value="Automatique">Automatique</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="location">Localisation</Label>
          <Select value={carData.location} onValueChange={(value) => handleSelectChange('location', value)} required>
            <SelectTrigger id="location">
              <SelectValue placeholder="Sélectionner la localisation" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Dakar">Dakar</SelectItem>
              <SelectItem value="Thiès">Thiès</SelectItem>
              <SelectItem value="Saly">Saly</SelectItem>
              <SelectItem value="Toubab Dialaw">Toubab Dialaw</SelectItem>
              <SelectItem value="Saint-Louis">Saint-Louis</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="status">Statut</Label>
          <Select value={carData.status} onValueChange={(value) => handleSelectChange('status', value)} required>
            <SelectTrigger id="status">
              <SelectValue placeholder="Sélectionner le statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="available">Disponible</SelectItem>
              <SelectItem value="sold">Vendu</SelectItem>
              <SelectItem value="rented">Loué</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="imageUrl">URL de l'image principale</Label>
          <Input id="imageUrl" type="url" value={carData.imageUrl} onChange={handleChange} placeholder="Ex: /placeholder.svg" required />
        </div>
        <div>
          <Label htmlFor="images">URLs des images supplémentaires (séparées par des virgules)</Label>
          <Input id="images" type="text" value={carData.images.join(', ')} onChange={(e) => handleMediaChange(e, 'images')} placeholder="Ex: /img1.jpg, /img2.jpg" />
        </div>
        <div>
          <Label htmlFor="videos">URLs des vidéos (séparées par des virgules)</Label>
          <Input id="videos" type="text" value={carData.videos.join(', ')} onChange={(e) => handleMediaChange(e, 'videos')} placeholder="Ex: /video1.mp4, /video2.mp4" />
        </div>
        <Button type="submit" className="w-full">
          {isEditing ? 'Modifier le véhicule' : 'Ajouter le véhicule'}
        </Button>
      </form>
    </div>
  );
};

export default AdminAddEditCarPage;