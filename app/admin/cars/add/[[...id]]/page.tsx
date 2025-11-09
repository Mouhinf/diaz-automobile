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
import axios from 'axios';
import { Loader2, XCircle } from 'lucide-react';

const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

const AdminAddEditCarPage = () => {
  const router = useRouter();
  const params = useParams();
  // Ajustement pour gérer les routes catch-all optionnelles
  const carId = Array.isArray(params.id) ? params.id[0] : undefined;
  const isEditing = !!carId;

  // Check for Cloudinary configuration at the top to prevent SSR errors
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl text-center">
        <h1 className="text-4xl font-bold text-red-600 dark:text-red-400 mb-6">Erreur de Configuration</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Les variables d'environnement Cloudinary (NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME et NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET) sont manquantes.
          Veuillez les définir dans votre fichier .env.local pour utiliser cette fonctionnalité.
        </p>
        <Button onClick={() => router.push('/admin/dashboard')} className="mt-6">
          Retour au Tableau de Bord
        </Button>
      </div>
    );
  }

  const [carData, setCarData] = useState<Omit<Car, 'id'>>({
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

  const [featuresInput, setFeaturesInput] = useState<string>('');

  const [mainImageFile, setMainImageFile] = useState<File | null>(null);
  const [additionalImageFiles, setAdditionalImageFiles] = useState<File[]>([]);
  const [videoFiles, setVideoFiles] = useState<File[]>([]);

  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const fetchCar = async () => {
      if (isEditing && carId) { // Vérifier carId ici aussi
        try {
          const existingCar = await getCarById(carId);
          if (existingCar) {
            setCarData(existingCar);
            setFeaturesInput(existingCar.features.join('\n'));
          } else {
            toast.error("Véhicule non trouvé pour l'édition.");
            router.push('/admin/cars/manage');
          }
        } catch (error) {
          console.error("Erreur lors du chargement du véhicule:", error);
          toast.error("Erreur lors du chargement du véhicule.");
          router.push('/admin/cars/manage');
        }
      } else {
        setFeaturesInput('');
        // Réinitialiser carData pour un nouvel ajout si on passe de l'édition à l'ajout
        setCarData({
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
        setMainImageFile(null);
        setAdditionalImageFiles([]);
        setVideoFiles([]);
      }
    };
    fetchCar();
  }, [carId, isEditing, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setCarData(prev => {
      const updatedCarData = { ...prev, [id]: id === 'year' ? parseInt(value) || 0 : value };

      if (id === 'brand' || id === 'model') {
        const brand = id === 'brand' ? value : updatedCarData.brand;
        const model = id === 'model' ? value : updatedCarData.model;
        updatedCarData.name = `${brand} ${model}`;
      }
      return updatedCarData;
    });
  };

  const handleSelectChange = (id: keyof Omit<Car, 'id'>, value: string) => {
    setCarData(prev => ({ ...prev, [id]: value as any }));
  };

  const handleFeaturesInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFeaturesInput(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'mainImage' | 'additionalImages' | 'videos') => {
    if (!e.target.files) return;

    if (type === 'mainImage') {
      setMainImageFile(e.target.files[0]);
    } else if (type === 'additionalImages') {
      setAdditionalImageFiles(Array.from(e.target.files));
    } else if (type === 'videos') {
      setVideoFiles(Array.from(e.target.files));
    }
  };

  const uploadFileToCloudinary = async (file: File, resourceType: 'image' | 'video') => {
    // This check is now redundant but harmless, as the component will not render if variables are missing.
    // Keeping it for defensive programming within the function itself.
    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
      toast.error("Configuration Cloudinary manquante. Veuillez vérifier vos variables d'environnement.");
      throw new Error("Cloudinary configuration missing.");
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    formData.append('resource_type', resourceType);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`,
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      console.error(`Erreur lors du téléversement du ${resourceType} :`, error);
      toast.error(`Échec du téléversement du ${resourceType} : ${file.name}`);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    let newCarData = { ...carData };

    newCarData.name = `${newCarData.brand} ${newCarData.model}`;

    newCarData.features = featuresInput.split(/[\n,]/).map(s => s.trim()).filter(Boolean);

    try {
      if (mainImageFile) {
        const url = await uploadFileToCloudinary(mainImageFile, 'image');
        newCarData.imageUrl = url;
      }

      if (additionalImageFiles.length > 0) {
        const urls = await Promise.all(
          additionalImageFiles.map(file => uploadFileToCloudinary(file, 'image'))
        );
        newCarData.images = [...newCarData.images, ...urls];
      }

      if (videoFiles.length > 0) {
        const urls = await Promise.all(
          videoFiles.map(file => uploadFileToCloudinary(file, 'video'))
        );
        newCarData.videos = [...newCarData.videos, ...urls];
      }

      if (isEditing && carId) {
        await updateCar(carId, newCarData);
        toast.success('Véhicule modifié avec succès !');
      } else {
        await addCar(newCarData);
        toast.success('Véhicule ajouté avec succès !');
      }
      router.push('/admin/cars/manage');
    } catch (error) {
      toast.error("Une erreur est survenue lors du téléversement ou de la sauvegarde du véhicule.");
    } finally {
      setIsUploading(false);
    }
  };

  const removeUploadedMedia = (type: 'mainImage' | 'additionalImage' | 'video', urlToRemove?: string) => {
    if (type === 'mainImage') {
      setCarData(prev => ({ ...prev, imageUrl: '' }));
      setMainImageFile(null);
    } else if (type === 'additionalImage' && urlToRemove) {
      setCarData(prev => ({ ...prev, images: prev.images.filter(url => url !== urlToRemove) }));
    } else if (type === 'video' && urlToRemove) {
      setCarData(prev => ({ ...prev, videos: prev.videos.filter(url => url !== urlToRemove) }));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">
        {isEditing ? 'Modifier le Véhicule' : 'Ajouter un Véhicule'}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
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
          <Textarea
            id="features"
            value={featuresInput}
            onChange={handleFeaturesInputChange}
            rows={5}
            placeholder="Ex: Climatisation&#10;GPS&#10;Sièges en cuir"
          />
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

        <div className="space-y-4 border-t pt-6 mt-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Médias du véhicule</h2>

          <div>
            <Label htmlFor="mainImage">Image principale</Label>
            <Input id="mainImage" type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'mainImage')} />
            {(mainImageFile || carData.imageUrl) && (
              <div className="relative mt-2 w-32 h-32 rounded-md overflow-hidden">
                <img
                  src={mainImageFile ? URL.createObjectURL(mainImageFile) : carData.imageUrl}
                  alt="Image principale"
                  className="w-full h-full object-cover"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-1 right-1 h-6 w-6 rounded-full"
                  onClick={() => removeUploadedMedia('mainImage')}
                >
                  <XCircle className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="additionalImages">Images supplémentaires (plusieurs fichiers)</Label>
            <Input id="additionalImages" type="file" accept="image/*" multiple onChange={(e) => handleFileChange(e, 'additionalImages')} />
            {(additionalImageFiles.length > 0 || carData.images.length > 0) && (
              <div className="mt-2 grid grid-cols-3 gap-2">
                {carData.images.map((url, index) => (
                  <div key={`uploaded-img-${url}-${index}`} className="relative w-32 h-32 rounded-md overflow-hidden">
                    <img src={url} alt={`Image ${index + 1}`} className="w-full h-full object-cover" />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-1 right-1 h-6 w-6 rounded-full"
                      onClick={() => removeUploadedMedia('additionalImage', url)}
                    >
                      <XCircle className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                {additionalImageFiles.map((file, index) => (
                  <div key={`new-img-${file.name}-${index}`} className="relative w-32 h-32 rounded-md overflow-hidden">
                    <img src={URL.createObjectURL(file)} alt={`Nouvelle image ${index + 1}`} className="w-full h-full object-cover" />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-1 right-1 h-6 w-6 rounded-full"
                      onClick={() => setAdditionalImageFiles(prev => prev.filter(f => f !== file))}
                    >
                      <XCircle className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="videos">Vidéos (plusieurs fichiers)</Label>
            <Input id="videos" type="file" accept="video/*" multiple onChange={(e) => handleFileChange(e, 'videos')} />
            {(videoFiles.length > 0 || carData.videos.length > 0) && (
              <div className="mt-2 grid grid-cols-3 gap-2">
                {carData.videos.map((url, index) => (
                  <div key={`uploaded-video-${url}-${index}`} className="relative w-32 h-32 rounded-md overflow-hidden">
                    <video src={url} controls className="w-full h-full object-cover" />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-1 right-1 h-6 w-6 rounded-full"
                      onClick={() => removeUploadedMedia('video', url)}
                    >
                      <XCircle className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                {videoFiles.map((file, index) => (
                  <div key={`new-video-${file.name}-${index}`} className="relative w-32 h-32 rounded-md overflow-hidden">
                    <video src={URL.createObjectURL(file)} controls className="w-full h-full object-cover" />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-1 right-1 h-6 w-6 rounded-full"
                      onClick={() => setVideoFiles(prev => prev.filter(f => f !== file))}
                    >
                      <XCircle className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={isUploading}>
          {isUploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isEditing ? 'Modifier le véhicule' : 'Ajouter le véhicule'}
        </Button>
      </form>
    </div>
  );
};

export default AdminAddEditCarPage;