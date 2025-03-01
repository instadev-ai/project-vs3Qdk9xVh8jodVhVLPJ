import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  image: string;
  features: string[];
}

interface ProductComparisonProps {
  products: Product[];
}

const ProductComparison: React.FC<ProductComparisonProps> = ({ products }) => {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  const toggleProductSelection = (product: Product) => {
    setSelectedProducts((prevSelected) => {
      if (prevSelected.find((p) => p.id === product.id)) {
        return prevSelected.filter((p) => p.id !== product.id);
      } else {
        return [...prevSelected, product];
      }
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Compare Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <Card key={product.id} className="border p-4">
            <img src={product.image} alt={product.name} className="h-32 w-full object-cover mb-4" />
            <CardContent>
              <h3 className="font-medium text-lg mb-2">{product.name}</h3>
              <div className="flex items-center mb-2">
                <span className="text-xl font-bold mr-2">${product.price.toFixed(2)}</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={i < product.rating ? "text-yellow-400" : "text-gray-300"} />
                  ))}
                </div>
              </div>
              <ul className="list-disc pl-5 mb-4">
                {product.features.map((feature, index) => (
                  <li key={index} className="text-sm text-muted-foreground">{feature}</li>
                ))}
              </ul>
              <Button 
                variant={selectedProducts.find((p) => p.id === product.id) ? "default" : "outline"} 
                onClick={() => toggleProductSelection(product)}
              >
                {selectedProducts.find((p) => p.id === product.id) ? "Remove from Compare" : "Add to Compare"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedProducts.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Comparison</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Product</th>
                  <th className="py-2 px-4 border-b">Price</th>
                  <th className="py-2 px-4 border-b">Rating</th>
                  <th className="py-2 px-4 border-b">Features</th>
                </tr>
              </thead>
              <tbody>
                {selectedProducts.map((product) => (
                  <tr key={product.id}>
                    <td className="py-2 px-4 border-b">{product.name}</td>
                    <td className="py-2 px-4 border-b">${product.price.toFixed(2)}</td>
                    <td className="py-2 px-4 border-b">{product.rating} / 5</td>
                    <td className="py-2 px-4 border-b">
                      <ul className="list-disc pl-5">
                        {product.features.map((feature, index) => (
                          <li key={index} className="text-sm text-muted-foreground">{feature}</li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductComparison;
