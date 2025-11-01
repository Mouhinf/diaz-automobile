import { MadeWithDyad } from "@/components/made-with-dyad";
import Layout from "@/components/Layout"; // Import the new Layout component

const Index = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center py-12">
        <h1 className="text-4xl font-bold mb-4 text-primary">Welcome to Diaz Automobile</h1>
        <p className="text-xl text-foreground">
          Your platform for buying and renting cars in Senegal and West Africa.
        </p>
        <p className="text-lg text-muted-foreground mt-2">
          Start exploring our wide selection of vehicles!
        </p>
      </div>
    </Layout>
  );
};

export default Index;