import { useState } from "react";
import { Heart, ShoppingCart, Star, StarHalf, ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Mock data - will be replaced with Supabase data later
const product = {
  id: 1,
  name: "Premium Cotton T-Shirt",
  price: 39.99,
  description: "Our premium cotton t-shirt is made from 100% organic cotton, providing exceptional comfort and durability. Perfect for everyday wear, this versatile piece features a classic fit and is available in multiple colors and sizes.",
  features: [
    "100% organic cotton",
    "Classic fit",
    "Pre-shrunk fabric",
    "Reinforced stitching",
    "Machine washable"
  ],
  rating: 4.5,
  reviewCount: 127,
  images: [
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg"
  ],
  colors: [
    { name: "Black", value: "#000000" },
    { name: "White", value: "#ffffff" },
    { name: "Navy", value: "#0a192f" },
    { name: "Red", value: "#e11d48" }
  ],
  sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  inStock: true
};

const reviews = [
  {
    id: 1,
    author: "Alex Johnson",
    rating: 5,
    date: "2 months ago",
    content: "This is the best t-shirt I've ever owned. The fabric is soft and comfortable, and it fits perfectly. Highly recommend!"
  },
  {
    id: 2,
    author: "Sarah Miller",
    rating: 4,
    date: "1 month ago",
    content: "Great quality shirt. The material is nice and thick, and the stitching is well done. I ordered a medium and it fits as expected."
  },
  {
    id: 3,
    author: "Michael Brown",
    rating: 5,
    date: "3 weeks ago",
    content: "Excellent product! The color is exactly as shown in the pictures, and the shirt has held up well after several washes."
  }
];

const relatedProducts = [
  {
    id: 2,
    name: "Slim Fit Jeans",
    price: 59.99,
    image: "/placeholder.svg",
    rating: 4.3,
    reviewCount: 89
  },
  {
    id: 3,
    name: "Casual Hoodie",
    price: 49.99,
    image: "/placeholder.svg",
    rating: 4.7,
    reviewCount: 112
  },
  {
    id: 4,
    name: "Canvas Sneakers",
    price: 44.99,
    image: "/placeholder.svg",
    rating: 4.2,
    reviewCount: 76
  },
  {
    id: 5,
    name: "Denim Jacket",
    price: 79.99,
    image: "/placeholder.svg",
    rating: 4.6,
    reviewCount: 95
  }
];

const ProductPage = () => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[2]); // Default to Medium
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="fill-yellow-400 text-yellow-400 h-4 w-4" />);
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half-star" className="fill-yellow-400 text-yellow-400 h-4 w-4" />);
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-star-${i}`} className="text-gray-300 h-4 w-4" />);
    }

    return stars;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-muted-foreground mb-6">
        <span>Home</span>
        <ChevronRight className="h-4 w-4 mx-1" />
        <span>Clothing</span>
        <ChevronRight className="h-4 w-4 mx-1" />
        <span>T-Shirts</span>
        <ChevronRight className="h-4 w-4 mx-1" />
        <span className="text-foreground font-medium">{product.name}</span>
      </div>

      {/* Product Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg border bg-white">
            <img 
              src={product.images[activeImage]} 
              alt={product.name} 
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="flex space-x-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                className={`aspect-square w-20 rounded-md border overflow-hidden ${
                  activeImage === index ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setActiveImage(index)}
              >
                <img
                  src={image}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  className="h-full w-full object-cover object-center"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
            <div className="flex items-center mt-2">
              <div className="flex items-center">
                {renderStars(product.rating)}
                <span className="ml-2 text-sm text-muted-foreground">
                  ({product.reviewCount} reviews)
                </span>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
              {product.inStock ? (
                <Badge className="ml-3 bg-green-100 text-green-800 hover:bg-green-100">In Stock</Badge>
              ) : (
                <Badge className="ml-3 bg-red-100 text-red-800 hover:bg-red-100">Out of Stock</Badge>
              )}
            </div>
          </div>

          <p className="text-muted-foreground mb-6">{product.description}</p>

          {/* Color Selection */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-3">Color: {selectedColor.name}</h3>
            <div className="flex space-x-2">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  className={`h-8 w-8 rounded-full border ${
                    selectedColor.name === color.name ? "ring-2 ring-primary ring-offset-2" : ""
                  }`}
                  style={{ backgroundColor: color.value }}
                  onClick={() => setSelectedColor(color)}
                  aria-label={`Select ${color.name} color`}
                />
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-medium">Size: {selectedSize}</h3>
              <button className="text-sm text-primary hover:underline">Size Guide</button>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`py-2 border rounded-md text-sm font-medium ${
                    selectedSize === size
                      ? "bg-primary text-primary-foreground"
                      : "bg-background hover:bg-muted"
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-3">Quantity</h3>
            <div className="flex items-center border rounded-md w-32">
              <button
                className="px-3 py-2 text-muted-foreground hover:text-foreground"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="flex-1 text-center">{quantity}</span>
              <button
                className="px-3 py-2 text-muted-foreground hover:text-foreground"
                onClick={() => setQuantity(quantity + 1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 mt-2">
            <Button className="flex-1 gap-2">
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </Button>
            <Button variant="outline" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
          </div>

          {/* Features */}
          <div className="mt-8">
            <h3 className="font-medium mb-3">Features</h3>
            <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mb-16">
        <Tabs defaultValue="description">
          <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0">
            <TabsTrigger 
              value="description" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3"
            >
              Description
            </TabsTrigger>
            <TabsTrigger 
              value="specifications" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3"
            >
              Specifications
            </TabsTrigger>
            <TabsTrigger 
              value="shipping" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3"
            >
              Shipping & Returns
            </TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="pt-6">
            <div className="space-y-4">
              <p>
                Our premium cotton t-shirt is designed for maximum comfort and durability. Made from 100% organic cotton, 
                this t-shirt is soft against the skin and perfect for everyday wear. The classic fit is flattering for all 
                body types, and the pre-shrunk fabric ensures that it maintains its shape wash after wash.
              </p>
              <p>
                The reinforced stitching at the seams adds extra durability, making this t-shirt a long-lasting addition 
                to your wardrobe. Available in a range of colors and sizes, this versatile piece can be dressed up or down 
                for any occasion.
              </p>
              <p>
                Care instructions: Machine wash cold with like colors. Tumble dry low. Do not bleach.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="specifications" className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-medium mb-3">Materials</h3>
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                  <li>100% organic cotton</li>
                  <li>180 GSM fabric weight</li>
                  <li>Pre-shrunk</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-3">Dimensions</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="py-2 border-b">Size</div>
                  <div className="py-2 border-b">Chest (inches)</div>
                  <div className="py-2 border-b">S</div>
                  <div className="py-2 border-b">36-38</div>
                  <div className="py-2 border-b">M</div>
                  <div className="py-2 border-b">39-41</div>
                  <div className="py-2 border-b">L</div>
                  <div className="py-2 border-b">42-44</div>
                  <div className="py-2 border-b">XL</div>
                  <div className="py-2 border-b">45-47</div>
                  <div className="py-2">XXL</div>
                  <div className="py-2">48-50</div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="shipping" className="pt-6">
            <div className="space-y-4">
              <h3 className="font-medium">Shipping</h3>
              <p>
                We offer free standard shipping on all orders over $50. Standard shipping takes 3-5 business days. 
                Express shipping is available for an additional fee and takes 1-2 business days.
              </p>
              <h3 className="font-medium mt-6">Returns</h3>
              <p>
                We accept returns within 30 days of purchase. Items must be unworn, unwashed, and in their original 
                packaging with all tags attached. Return shipping is free for exchanges and store credit. A $5 return 
                fee applies for refunds to the original payment method.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Reviews Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Review Summary */}
          <div className="col-span-1">
            <div className="flex items-center mb-4">
              <div className="text-4xl font-bold mr-2">{product.rating}</div>
              <div>
                <div className="flex">{renderStars(product.rating)}</div>
                <div className="text-sm text-muted-foreground">
                  Based on {product.reviewCount} reviews
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <span className="text-sm w-8">5★</span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="bg-yellow-400 h-full rounded-full" style={{ width: "70%" }}></div>
                </div>
                <span className="text-sm w-8 text-right">70%</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm w-8">4★</span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="bg-yellow-400 h-full rounded-full" style={{ width: "20%" }}></div>
                </div>
                <span className="text-sm w-8 text-right">20%</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm w-8">3★</span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="bg-yellow-400 h-full rounded-full" style={{ width: "7%" }}></div>
                </div>
                <span className="text-sm w-8 text-right">7%</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm w-8">2★</span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="bg-yellow-400 h-full rounded-full" style={{ width: "2%" }}></div>
                </div>
                <span className="text-sm w-8 text-right">2%</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm w-8">1★</span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="bg-yellow-400 h-full rounded-full" style={{ width: "1%" }}></div>
                </div>
                <span className="text-sm w-8 text-right">1%</span>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-6">Write a Review</Button>
          </div>

          {/* Review List */}
          <div className="col-span-1 md:col-span-2">
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="border-b pb-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{review.author}</h4>
                      <div className="flex items-center">
                        <div className="flex mr-2">
                          {renderStars(review.rating)}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {review.date}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="mt-2">{review.content}</p>
                </div>
              ))}
            </div>
            <Button variant="link" className="mt-4 px-0">
              View all {product.reviewCount} reviews
            </Button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div>
        <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
        <Carousel className="w-full">
          <CarouselContent className="-ml-4">
            {relatedProducts.map((product) => (
              <CarouselItem key={product.id} className="pl-4 md:basis-1/2 lg:basis-1/4">
                <Card className="border-0 shadow-none">
                  <CardContent className="p-0">
                    <div className="aspect-square overflow-hidden rounded-lg bg-muted">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="mt-3">
                      <h3 className="font-medium">{product.name}</h3>
                      <div className="flex items-center mt-1">
                        <div className="flex">
                          {renderStars(product.rating)}
                        </div>
                        <span className="ml-2 text-xs text-muted-foreground">
                          ({product.reviewCount})
                        </span>
                      </div>
                      <div className="mt-1 font-medium">${product.price.toFixed(2)}</div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0" />
          <CarouselNext className="right-0" />
        </Carousel>
      </div>
    </div>
  );
};

export default ProductPage;