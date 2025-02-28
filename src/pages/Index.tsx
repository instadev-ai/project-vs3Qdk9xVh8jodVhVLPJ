import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-2xl px-4">
        <h1 className="text-4xl font-bold mb-4">Modern E-Commerce Store</h1>
        <p className="text-xl text-gray-600 mb-8">
          Welcome to our store featuring a beautiful product page with image gallery, 
          variant selection, reviews, and related products.
        </p>
        <Link to="/product">
          <Button size="lg" className="gap-2">
            <ShoppingBag className="h-5 w-5" />
            View Product Page
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;