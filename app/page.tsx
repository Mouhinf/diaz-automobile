import React from "react";
import { HeroSection } from "@/components/HeroSection";
import { FeaturedCarsSection } from "@/components/FeaturedCarsSection";
import { AboutCallToAction } from "@/components/AboutCallToAction";
import { SaleCarsSection } from "@/components/SaleCarsSection"; // Import du nouveau composant
import { RentCarsSection } from "@/components/RentCarsSection"; // Import du nouveau composant

const IndexPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <HeroSection />
      <AboutCallToAction />
      <SaleCarsSection /> {/* Ajout de la section des voitures à vendre */}
      <RentCarsSection /> {/* Ajout de la section des voitures à louer */}
      <FeaturedCarsSection />
      {/* Vous pouvez ajouter d'autres sections ici plus tard */}
    </div>
  );
};

export default IndexPage;