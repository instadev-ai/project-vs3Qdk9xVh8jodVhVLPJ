import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, CreditCard, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

// Mock cart items - in a real app, this would come from a cart context or state management
const cartItems = [
  {
    id: 1,
    name: "Premium Cotton T-Shirt",
    price: 39.99,
    image: "/placeholder.svg",
    quantity: 2,
    color: "Black",
    size: "M"
  },
  {
    id: 7,
    name: "Wireless Headphones",
    price: 129.99,
    image: "/placeholder.svg",
    quantity: 1,
    color: "Silver",
    size: null
  }
];

// Countries for shipping
const countries = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "Germany",
  "France",
  "Japan",
  "China",
  "Brazil",
  "India"
];

// States for US
const usStates = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", 
  "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", 
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", 
  "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", 
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", 
  "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", 
  "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
];

// Shipping methods
const shippingMethods = [
  { id: "standard", name: "Standard Shipping", price: 4.99, deliveryTime: "3-5 business days" },
  { id: "express", name: "Express Shipping", price: 12.99, deliveryTime: "1-2 business days" },
  { id: "overnight", name: "Overnight Shipping", price: 24.99, deliveryTime: "Next business day" }
];

// Payment methods
const paymentMethods = [
  { id: "credit-card", name: "Credit Card", icon: CreditCard },
  { id: "paypal", name: "PayPal", icon: () => (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.067 8.478c.492.526.784 1.287.784 2.133 0 2.601-2.158 4.607-4.987 4.607h-1.87c-.347 0-.644.243-.71.582l-.886 4.134a.737.737 0 01-.712.582h-2.646a.37.37 0 01-.364-.455l.12-.582" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16.885 3.734c.492.526.784 1.287.784 2.133 0 2.601-2.158 4.607-4.987 4.607h-1.87c-.347 0-.644.243-.71.582l-.886 4.134a.737.737 0 01-.712.582H6.269a.37.37 0 01-.364-.455l1.21-6.455a.734.734 0 01.712-.582h1.87c2.83 0 4.988-2.005 4.988-4.607 0-.846-.292-1.607-.784-2.133" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )},
  { id: "apple-pay", name: "Apple Pay", icon: () => (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 9.75c0-1.37.632-2.514 1.5-3.295M10.5 6.75c-.868.78-1.5 1.925-1.5 3.295 0 2.25 1.5 4.5 3 4.5.675 0 1.185-.45 1.5-.75.315.3.825.75 1.5.75 1.38 0 2.625-1.882 2.94-3.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M15 5.422c.336-.225.75-.422 1.5-.422 1.5 0 3 1.5 3 3.75 0 2.25-1.5 6-3 6-.825 0-1.155-.54-1.5-.75-.345.21-.675.75-1.5.75-1.5 0-3-3.75-3-6 0-2.25 1.5-3.75 3-3.75.75 0 1.164.197 1.5.422z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )}
];

const CheckoutPage = () => {
  const [shippingMethod, setShippingMethod] = useState(shippingMethods[0].id);
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0].id);
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [orderPlaced, setOrderPlaced] = useState(false);
  
  // Calculate subtotal
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // Calculate shipping cost
  const shippingCost = shippingMethods.find(method => method.id === shippingMethod)?.price || 0;
  
  // Calculate tax (assuming 8% tax rate)
  const taxRate = 0.08;
  const tax = subtotal * taxRate;
  
  // Calculate total
  const total = subtotal + shippingCost + tax;

  const handlePlaceOrder = () => {
    // In a real app, you would validate the form and process the payment here
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Order Placed Successfully!</h1>
            <p className="text-gray-600 mb-6">
              Thank you for your purchase. Your order has been received and is being processed.
              You will receive a confirmation email shortly.
            </p>
            <p className="font-medium mb-6">Order #: {Math.floor(Math.random() * 1000000)}</p>
            <div className="flex justify-center space-x-4">
              <Link to="/">
                <Button variant="outline">Continue Shopping</Button>
              </Link>
              <Button>Track Order</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center text-sm font-medium text-primary hover:underline">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Shopping
          </Link>
        </div>
        
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main checkout form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" className="mt-1" />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="john.doe@example.com" className="mt-1" />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="address">Street Address</Label>
                  <Input id="address" placeholder="123 Main St" className="mt-1" />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="addressLine2">Apartment, suite, etc. (optional)</Label>
                  <Input id="addressLine2" placeholder="Apt 4B" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="New York" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="state">State / Province</Label>
                  <Select defaultValue="">
                    <SelectTrigger id="state" className="mt-1">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {usStates.map(state => (
                        <SelectItem key={state} value={state}>{state}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="zipCode">ZIP / Postal Code</Label>
                  <Input id="zipCode" placeholder="10001" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Select defaultValue="United States">
                    <SelectTrigger id="country" className="mt-1">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map(country => (
                        <SelectItem key={country} value={country}>{country}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="(123) 456-7890" className="mt-1" />
                </div>
              </div>
            </div>
            
            {/* Shipping Method */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Shipping Method</h2>
              <RadioGroup value={shippingMethod} onValueChange={setShippingMethod}>
                {shippingMethods.map((method) => (
                  <div key={method.id} className="flex items-center space-x-2 border rounded-md p-4 mb-3">
                    <RadioGroupItem value={method.id} id={method.id} />
                    <Label htmlFor={method.id} className="flex-1 flex justify-between cursor-pointer">
                      <div>
                        <span className="font-medium">{method.name}</span>
                        <p className="text-sm text-muted-foreground">{method.deliveryTime}</p>
                      </div>
                      <span className="font-medium">${method.price.toFixed(2)}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            
            {/* Payment Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
              
              <Tabs defaultValue="payment-details" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-4">
                  {paymentMethods.map((method) => (
                    <TabsTrigger 
                      key={method.id}
                      value={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className="flex items-center gap-2"
                    >
                      {method.icon && <method.icon className="h-4 w-4" />}
                      {method.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                <TabsContent value="credit-card" className="space-y-4">
                  <div>
                    <Label htmlFor="cardName">Name on Card</Label>
                    <Input id="cardName" placeholder="John Doe" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" className="mt-1" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input id="expiryDate" placeholder="MM/YY" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" className="mt-1" />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="paypal">
                  <div className="text-center py-8">
                    <p className="mb-4">You will be redirected to PayPal to complete your purchase securely.</p>
                    <Button className="w-full md:w-auto">Continue with PayPal</Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="apple-pay">
                  <div className="text-center py-8">
                    <p className="mb-4">You will be prompted to confirm your purchase with Apple Pay.</p>
                    <Button className="w-full md:w-auto bg-black hover:bg-gray-800">Pay with Apple Pay</Button>
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="mt-6">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="sameAsShipping" 
                    checked={sameAsShipping} 
                    onCheckedChange={(checked) => setSameAsShipping(checked as boolean)}
                  />
                  <Label htmlFor="sameAsShipping">Billing address is the same as shipping address</Label>
                </div>
              </div>
              
              {!sameAsShipping && (
                <div className="mt-4 pt-4 border-t">
                  <h3 className="font-medium mb-3">Billing Address</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="billingFirstName">First Name</Label>
                      <Input id="billingFirstName" placeholder="John" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="billingLastName">Last Name</Label>
                      <Input id="billingLastName" placeholder="Doe" className="mt-1" />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="billingAddress">Street Address</Label>
                      <Input id="billingAddress" placeholder="123 Main St" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="billingCity">City</Label>
                      <Input id="billingCity" placeholder="New York" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="billingState">State / Province</Label>
                      <Select defaultValue="">
                        <SelectTrigger id="billingState" className="mt-1">
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          {usStates.map(state => (
                            <SelectItem key={`billing-${state}`} value={state}>{state}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="billingZipCode">ZIP / Postal Code</Label>
                      <Input id="billingZipCode" placeholder="10001" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="billingCountry">Country</Label>
                      <Select defaultValue="United States">
                        <SelectTrigger id="billingCountry" className="mt-1">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map(country => (
                            <SelectItem key={`billing-${country}`} value={country}>{country}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="h-16 w-16 rounded bg-muted overflow-hidden flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      <div className="text-sm text-muted-foreground">
                        {item.color && <span>Color: {item.color}</span>}
                        {item.size && <span> | Size: {item.size}</span>}
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-sm">${item.price.toFixed(2)} × {item.quantity}</span>
                        <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${shippingCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              
              <Button 
                className="w-full mt-6" 
                size="lg"
                onClick={handlePlaceOrder}
              >
                Place Order
              </Button>
              
              <p className="text-xs text-center text-muted-foreground mt-4">
                By placing your order, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;