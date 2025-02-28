import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Search, Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

// Mock product data - will be replaced with Supabase data later
const products = [
  {
    id: 1,
    name: "Premium Cotton T-Shirt",
    price: 39.99,
    rating: 4.5,
    reviewCount: 127,
    image: "/placeholder.svg",
    category: "Clothing",
    tags: ["New", "Featured"],
    colors: ["Black", "White", "Navy", "Red"],
    inStock: true
  },
  {
    id: 2,
    name: "Slim Fit Jeans",
    price: 59.99,
    rating: 4.3,
    reviewCount: 89,
    image: "/placeholder.svg",
    category: "Clothing",
    tags: ["Bestseller"],
    colors: ["Blue", "Black", "Gray"],
    inStock: true
  },
  {
    id: 3,
    name: "Casual Hoodie",
    price: 49.99,
    rating: 4.7,
    reviewCount: 112,
    image: "/placeholder.svg",
    category: "Clothing",
    tags: ["Sale"],
    colors: ["Gray", "Black", "Navy", "Green"],
    inStock: true
  },
  {
    id: 4,
    name: "Canvas Sneakers",
    price: 44.99,
    rating: 4.2,
    reviewCount: 76,
    image: "/placeholder.svg",
    category: "Footwear",
    tags: [],
    colors: ["White", "Black", "Red", "Blue"],
    inStock: true
  },
  {
    id: 5,
    name: "Denim Jacket",
    price: 79.99,
    rating: 4.6,
    reviewCount: 95,
    image: "/placeholder.svg",
    category: "Clothing",
    tags: ["New"],
    colors: ["Blue", "Black"],
    inStock: true
  },
  {
    id: 6,
    name: "Leather Wallet",
    price: 29.99,
    rating: 4.4,
    reviewCount: 63,
    image: "/placeholder.svg",
    category: "Accessories",
    tags: [],
    colors: ["Brown", "Black"],
    inStock: true
  },
  {
    id: 7,
    name: "Wireless Headphones",
    price: 129.99,
    rating: 4.8,
    reviewCount: 215,
    image: "/placeholder.svg",
    category: "Electronics",
    tags: ["Bestseller", "Featured"],
    colors: ["Black", "White", "Silver"],
    inStock: true
  },
  {
    id: 8,
    name: "Smartwatch",
    price: 199.99,
    rating: 4.5,
    reviewCount: 178,
    image: "/placeholder.svg",
    category: "Electronics",
    tags: ["New", "Featured"],
    colors: ["Black", "Silver", "Rose Gold"],
    inStock: false
  }
];

// Categories for filter
const categories = ["All", "Clothing", "Footwear", "Accessories", "Electronics"];

const Index = () => {
  const [cartCount, setCartCount] = useState(0);
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter products based on selected filters
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesPrice && matchesSearch;
  });

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="fill-yellow-400 text-yellow-400 h-4 w-4" />);
      } else {
        stars.push(<Star key={i} className="text-gray-300 h-4 w-4" />);
      }
    }
    
    return stars;
  };

  const addToCart = () => {
    setCartCount(cartCount + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with search and cart */}
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-2xl font-bold">Product Catalog</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="relative">
              <Button variant="outline" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Filters sidebar */}
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-3">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center">
                    <Button
                      variant="ghost"
                      className={`w-full justify-start ${
                        selectedCategory === category ? "bg-muted font-medium" : ""
                      }`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-3">Price Range</h3>
              <div className="px-2">
                <Slider
                  defaultValue={[0, 200]}
                  max={200}
                  step={1}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="my-6"
                />
                <div className="flex items-center justify-between">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-3">Sort By</h3>
              <Select defaultValue="featured">
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Product grid */}
          <div className="md:col-span-3">
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                {filteredProducts.length} {filteredProducts.length === 1 ? "Product" : "Products"}
              </h2>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">View:</span>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                  </svg>
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="21" y1="6" x2="3" y2="6" />
                    <line x1="21" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="18" x2="3" y2="18" />
                  </svg>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden">
                  <div className="relative">
                    <Link to={`/product`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-48 w-full object-cover"
                      />
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-full h-8 w-8"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                    {product.tags.includes("Sale") && (
                      <Badge className="absolute top-2 left-2 bg-red-500">Sale</Badge>
                    )}
                    {product.tags.includes("New") && (
                      <Badge className="absolute top-2 left-2 bg-blue-500">New</Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-muted-foreground">{product.category}</span>
                      <div className="flex">
                        {renderStars(product.rating)}
                      </div>
                    </div>
                    <Link to={`/product`} className="hover:underline">
                      <h3 className="font-medium mb-1 line-clamp-1">{product.name}</h3>
                    </Link>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-bold">${product.price.toFixed(2)}</span>
                      <Button size="sm" onClick={addToCart}>Add to Cart</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No products found</h3>
                <p className="text-muted-foreground">Try adjusting your filters or search query</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;