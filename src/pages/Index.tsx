import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Search, Heart, Star, X, Trash2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

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

// Cart item type
interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Calculate cart count
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  // Calculate cart total
  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

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

  const addToCart = (product) => {
    setCartItems(prevItems => {
      // Check if product is already in cart
      const existingItemIndex = prevItems.findIndex(item => item.id === product.id);
      
      if (existingItemIndex >= 0) {
        // Product exists in cart, increase quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1
        };
        return updatedItems;
      } else {
        // Product is not in cart, add it
        return [...prevItems, {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1
        }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ... keep existing code (header with search and cart) */}

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
              <h3 className="font-medium mb-3">Price Range</h3>              <div className="px-2">
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


          {/* ... keep existing code (product grid and empty state) */}

        </div>
      </div>
    </div>
  );
};

export default Index;



