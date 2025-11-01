import React from "react";
import { HeroSection } from "@/components/HeroSection";
import { FeaturedCarsSection } from "@/components/FeaturedCarsSection";

const IndexPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <HeroSection />
      <FeaturedCarsSection />
      {/* Vous pouvez ajouter d'autres sections ici plus tard */}
    </div>
  );
};

export default IndexPage;