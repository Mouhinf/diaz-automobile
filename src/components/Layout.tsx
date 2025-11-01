import React from "react";
import { MadeWithDyad } from "@/components/made-with-dyad";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="bg-primary text-primary-foreground p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Diaz Automobile</h1>
          {/* Navigation or other header elements can go here */}
        </div>
      </header>
      <main className="flex-grow container mx-auto p-4">
        {children}
      </main>
      <footer className="p-4 text-center text-muted-foreground border-t border-border">
        <MadeWithDyad />
      </footer>
    </div>
  );
};

export default Layout;