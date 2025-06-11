import React from 'react';
import AppHeader from '@/components/layout/AppHeader';
import OrderStatusTracker from '@/components/OrderStatusTracker';
import OrderSummaryDisplayCard from '@/components/OrderSummaryDisplayCard';
import BottomNavigationBar from '@/components/layout/BottomNavigationBar';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Home, ShoppingCart, Package, MessageSquare, FileText } from 'lucide-react';

const placeholderOrderStatus = [
  { name: 'Order Confirmed', completed: true, timestamp: '10:30 AM' },
  { name: 'Preparing Food', completed: true, timestamp: '10:35 AM' },
  { name: 'Out for Delivery', completed: false, timestamp: '10:55 AM' }, // Current status
  { name: 'Delivered', completed: false },
];

const placeholderOrderSummary = {
  restaurantName: "Luigi's Pizzeria", // Added for context
  items: [
    { name: 'Margherita Pizza', quantity: 1, price: 12.99 },
    { name: 'Coca-Cola', quantity: 1, price: 2.50 },
  ],
  subtotal: 15.49,
  deliveryFee: 5.00,
  total: 20.49,
};

const bottomNavItems = [
  { path: '/', label: 'Home', icon: <Home className="h-5 w-5" />, activeIcon: <Home className="h-5 w-5" /> },
  { path: '/cart', label: 'Cart', icon: <ShoppingCart className="h-5 w-5" />, activeIcon: <ShoppingCart className="h-5 w-5" /> },
  { path: '/order-tracking', label: 'Orders', icon: <Package className="h-5 w-5" />, activeIcon: <Package className="h-5 w-5" /> },
];

const OrderTrackingPage = () => {
  console.log('OrderTrackingPage loaded');
  // In a real app, fetch order details using an ID from params

  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader title="Track Your Order" showBackButton={true} />
      <ScrollArea className="flex-grow">
        <main className="container mx-auto px-4 py-6 pb-20"> {/* Padding for bottom nav */}
          <div className="space-y-6">
            <section className="mb-8">
               <h2 className="text-xl font-semibold mb-1">Order from {placeholderOrderSummary.restaurantName}</h2>
               <p className="text-sm text-muted-foreground mb-4">Order ID: #ABC123XYZ</p>
               <OrderSummaryDisplayCard summary={placeholderOrderSummary} title="Order Details" />
            </section>
            
            <section>
              <OrderStatusTracker
                statuses={placeholderOrderStatus}
                currentStatusName="Out for Delivery" // This should be dynamic
                estimatedDeliveryTime="11:15 AM - 11:30 AM"
              />
            </section>

            <section className="pt-4 space-y-3">
              <Button variant="outline" className="w-full">
                <MessageSquare className="mr-2 h-4 w-4" /> Contact Support
              </Button>
              <Button variant="outline" className="w-full">
                <FileText className="mr-2 h-4 w-4" /> View Receipt
              </Button>
            </section>
            {/* Optionally, add Order History list here if combined */}
          </div>
        </main>
      </ScrollArea>
      <BottomNavigationBar items={bottomNavItems} />
    </div>
  );
};

export default OrderTrackingPage;