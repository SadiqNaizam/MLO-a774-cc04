import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppHeader from '@/components/layout/AppHeader';
import MenuItemCard from '@/components/MenuItemCard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Clock, ShoppingCart as CartIcon } from 'lucide-react'; // Renamed ShoppingCart to CartIcon

const placeholderRestaurant = {
  name: 'Luigi\'s Pizzeria',
  logoUrl: 'https://source.unsplash.com/random/100x100?pizzalogo',
  rating: 4.5,
  deliveryTime: '25-35 min',
  cuisine: 'Italian',
  menu: {
    Appetizers: [
      { id: 'a1', name: 'Garlic Bread', description: 'Crusty bread with garlic butter and herbs.', price: 5.99, imageUrl: 'https://source.unsplash.com/random/300x200?garlicbread', tags: ['Vegetarian'] },
      { id: 'a2', name: 'Bruschetta', description: 'Grilled bread rubbed with garlic and topped with olive oil and salt.', price: 7.50, imageUrl: 'https://source.unsplash.com/random/300x200?bruschetta', tags: ['Popular'] },
    ],
    Pizzas: [
      { id: 'p1', name: 'Margherita Pizza', description: 'Classic cheese and tomato pizza.', price: 12.99, imageUrl: 'https://source.unsplash.com/random/300x200?margheritapizza' },
      { id: 'p2', name: 'Pepperoni Pizza', description: 'Pizza with pepperoni and mozzarella.', price: 14.99, imageUrl: 'https://source.unsplash.com/random/300x200?pepperonipizza', tags: ['Spicy'] },
    ],
    Drinks: [
      { id: 'd1', name: 'Coca-Cola', description: 'Classic Coke.', price: 2.50, imageUrl: 'https://source.unsplash.com/random/300x200?cocacola' },
      { id: 'd2', name: 'Mineral Water', description: 'Still mineral water.', price: 1.99, imageUrl: 'https://source.unsplash.com/random/300x200?waterbottle' },
    ],
  }
};

const RestaurantMenuPage = () => {
  console.log('RestaurantMenuPage loaded');
  const navigate = useNavigate();
  const [cartItemCount, setCartItemCount] = useState(0);

  const handleAddToCart = (itemId: string | number) => {
    console.log('Added to cart:', itemId);
    setCartItemCount(prev => prev + 1);
    // Add item to actual cart state management
  };

  const handleViewCart = () => {
    navigate('/cart');
  };
  
  const restaurant = placeholderRestaurant; // In a real app, fetch this based on ID from params

  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader title={restaurant.name} showBackButton={true} />
      <main className="flex-grow pb-20"> {/* Padding for potential sticky button */}
        <section className="p-4 bg-card border-b">
          <div className="flex items-center space-x-4 mb-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={restaurant.logoUrl} alt={restaurant.name} />
              <AvatarFallback>{restaurant.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">{restaurant.name}</h1>
              <p className="text-sm text-muted-foreground">{restaurant.cuisine}</p>
              <div className="flex items-center space-x-3 mt-1">
                <div className="flex items-center text-sm">
                  <Star className="h-4 w-4 mr-1 text-yellow-500 fill-yellow-500" /> {restaurant.rating}
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 mr-1 text-muted-foreground" /> {restaurant.deliveryTime}
                </div>
              </div>
            </div>
          </div>
        </section>

        <Tabs defaultValue={Object.keys(restaurant.menu)[0]} className="w-full">
          <TabsList className="sticky top-14 z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 w-full justify-start overflow-x-auto px-4 border-b">
            {Object.keys(restaurant.menu).map(category => (
              <TabsTrigger key={category} value={category} className="whitespace-nowrap">{category}</TabsTrigger>
            ))}
          </TabsList>
          
          {Object.entries(restaurant.menu).map(([category, items]) => (
            <TabsContent key={category} value={category} className="p-0">
              <ScrollArea className="h-[calc(100vh-280px)]"> {/* Adjust height based on header/footer/info section */}
                <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(items as any[]).map(item => (
                    <MenuItemCard
                      key={item.id}
                      id={item.id}
                      name={item.name}
                      description={item.description}
                      price={item.price}
                      imageUrl={item.imageUrl}
                      tags={item.tags}
                      onAddToCart={() => handleAddToCart(item.id)}
                    />
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          ))}
        </Tabs>
      </main>
      
      {cartItemCount > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t shadow-lg z-40">
          <Button className="w-full" size="lg" onClick={handleViewCart}>
            <CartIcon className="mr-2 h-5 w-5" /> View Cart ({cartItemCount} item{cartItemCount > 1 ? 's' : ''})
          </Button>
        </div>
      )}
    </div>
  );
};

export default RestaurantMenuPage;