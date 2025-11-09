import React from "react";
import { HeroSection } from "@/components/HeroSection";
import { FeaturedCarsSection } from "@/components/FeaturedCarsSection";
import { AboutCallToAction } from "@/components/AboutCallToAction"; // Import du nouveau composant

const IndexPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <HeroSection />
      <AboutCallToAction /> {/* Ajout de la nouvelle section ici */}
      <FeaturedCarsSection />
      {/* Vous pouvez ajouter d'autres sections ici plus tard */}
    </div>
  );
};

export default IndexPage;