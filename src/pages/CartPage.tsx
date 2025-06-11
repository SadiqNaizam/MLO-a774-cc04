import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppHeader from '@/components/layout/AppHeader';
import CartItemCard from '@/components/CartItemCard';
import BottomNavigationBar from '@/components/layout/BottomNavigationBar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Home, ShoppingCart, Package } from 'lucide-react';

interface CartItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

const initialCartItems: CartItem[] = [
  { id: 'p1', name: 'Margherita Pizza', price: 12.99, quantity: 1, imageUrl: 'https://source.unsplash.com/random/300x200?margheritapizza' },
  { id: 'd1', name: 'Coca-Cola', price: 2.50, quantity: 2, imageUrl: 'https://source.unsplash.com/random/300x200?cocacola' },
];

const bottomNavItems = [
  { path: '/', label: 'Home', icon: <Home className="h-5 w-5" />, activeIcon: <Home className="h-5 w-5" /> },
  { path: '/cart', label: 'Cart', icon: <ShoppingCart className="h-5 w-5" />, activeIcon: <ShoppingCart className="h-5 w-5" /> },
  { path: '/order-tracking', label: 'Orders', icon: <Package className="h-5 w-5" />, activeIcon: <Package className="h-5 w-5" /> },
];

const CartPage = () => {
  console.log('CartPage loaded');
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

  const handleQuantityChange = (itemId: string | number, newQuantity: number) => {
    setCartItems(items => items.map(item => item.id === itemId ? { ...item, quantity: newQuantity } : item).filter(item => item.quantity > 0));
    console.log('Quantity change:', itemId, newQuantity);
  };

  const handleRemoveItem = (itemId: string | number) => {
    setCartItems(items => items.filter(item => item.id !== itemId));
    console.log('Remove item:', itemId);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = cartItems.length > 0 ? 5.00 : 0; // Example fee
  const total = subtotal + deliveryFee;

  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader title="Your Cart" showBackButton={true} />
      <main className="flex-grow container mx-auto px-4 py-6 pb-20"> {/* Padding for bottom nav */}
        {cartItems.length === 0 ? (
          <div className="text-center py-10">
            <ShoppingCart className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-xl font-semibold">Your cart is empty</p>
            <p className="text-muted-foreground mb-6">Looks like you haven't added anything to your cart yet.</p>
            <Button onClick={() => navigate('/')}>Start Shopping</Button>
          </div>
        ) : (
          <>
            <ScrollArea className="h-[calc(100vh-300px)]"> {/* Adjust height */}
              <div className="space-y-4">
                {cartItems.map(item => (
                  <CartItemCard
                    key={item.id}
                    item={item}
                    onQuantityChange={handleQuantityChange}
                    onRemove={handleRemoveItem}
                  />
                ))}
              </div>
            </ScrollArea>
            <Separator className="my-6" />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery Fee</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <Button className="w-full mt-6" size="lg" onClick={() => navigate('/checkout')}>
              Proceed to Checkout
            </Button>
          </>
        )}
      </main>
      <BottomNavigationBar items={bottomNavItems} />
    </div>
  );
};

export default CartPage;