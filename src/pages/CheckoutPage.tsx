import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppHeader from '@/components/layout/AppHeader';
import OrderSummaryDisplayCard from '@/components/OrderSummaryDisplayCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm, FormProvider } from 'react-hook-form'; // For shadcn Form structure
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Basic schema for form structure demonstration
const checkoutFormSchema = z.object({
  address: z.string().min(1, "Address is required"),
  paymentMethod: z.enum(["card", "cod", "paypal"]),
  promoCode: z.string().optional(),
});

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

const placeholderOrderSummary = {
  subtotal: 15.49,
  deliveryFee: 5.00,
  taxes: 1.20, // Example
  total: 21.69,
  items: [
    { name: 'Margherita Pizza', quantity: 1, price: 12.99 },
    { name: 'Coca-Cola', quantity: 1, price: 2.50 }, // Corrected quantity from summary
  ],
};

const CheckoutPage = () => {
  console.log('CheckoutPage loaded');
  const navigate = useNavigate();

  const formMethods = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      address: "existing_address_1", // Placeholder for existing address
      paymentMethod: "card",
      promoCode: "",
    },
  });

  const onSubmit = (data: CheckoutFormValues) => {
    console.log('Placing order with data:', data);
    // Simulate order placement
    alert('Order Placed Successfully!');
    navigate('/order-tracking'); // Navigate to order tracking page
  };

  return (
    <FormProvider {...formMethods}>
      <div className="flex flex-col min-h-screen">
        <AppHeader title="Checkout" showBackButton={true} />
        <ScrollArea className="flex-grow">
          <main className="container mx-auto px-4 py-6">
            <form onSubmit={formMethods.handleSubmit(onSubmit)} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Delivery Address</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Select
                    defaultValue="existing_address_1"
                    onValueChange={(value) => formMethods.setValue("address", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select an address" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="existing_address_1">123 Main St, Anytown, USA</SelectItem>
                      <SelectItem value="existing_address_2">456 Oak Ave, Otherville, USA</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button type="button" variant="outline" className="w-full">Add New Address</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    defaultValue="card"
                    onValueChange={(value) => formMethods.setValue("paymentMethod", value as "card" | "cod" | "paypal")}
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card">Credit/Debit Card</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cod" id="cod" />
                      <Label htmlFor="cod">Cash on Delivery</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label htmlFor="paypal">PayPal</Label>
                    </div>
                  </RadioGroup>
                  {/* Add button for "Add New Card" can be here */}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Promo Code</CardTitle>
                </CardHeader>
                <CardContent className="flex space-x-2">
                  <Input
                    placeholder="Enter promo code"
                    {...formMethods.register("promoCode")}
                  />
                  <Button type="button" variant="secondary">Apply</Button>
                </CardContent>
              </Card>
              
              <OrderSummaryDisplayCard summary={placeholderOrderSummary} title="Final Order Summary"/>

              <Button type="submit" className="w-full" size="lg">
                Place Order (${placeholderOrderSummary.total.toFixed(2)})
              </Button>
            </form>
          </main>
        </ScrollArea>
      </div>
    </FormProvider>
  );
};

export default CheckoutPage;