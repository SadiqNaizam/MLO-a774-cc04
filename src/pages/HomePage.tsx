import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppHeader from '@/components/layout/AppHeader';
import CategoryCarousel from '@/components/CategoryCarousel';
import RestaurantCard from '@/components/RestaurantCard';
import BottomNavigationBar from '@/components/layout/BottomNavigationBar';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Home, ShoppingCart, Package } from 'lucide-react';

const placeholderCategories = [
  { id: 'pizza', name: 'Pizza', imageUrl: 'https://source.unsplash.com/random/200x200?pizza' },
  { id: 'sushi', name: 'Sushi', imageUrl: 'https://source.unsplash.com/random/200x200?sushi' },
  { id: 'burgers', name: 'Burgers', imageUrl: 'https://source.unsplash.com/random/200x200?burger' },
  { id: 'italian', name: 'Italian', imageUrl: 'https://source.unsplash.com/random/200x200?pasta' },
  { id: 'mexican', name: 'Mexican', imageUrl: 'https://source.unsplash.com/random/200x200?tacos' },
  { id: 'desserts', name: 'Desserts', imageUrl: 'https://source.unsplash.com/random/200x200?cake' },
];

const placeholderRestaurants = [
  { id: '1', name: 'Luigi\'s Pizzeria', imageUrl: 'https://source.unsplash.com/random/400x300?pizzeria', rating: 4.5, deliveryTime: '25-35 min', cuisineTypes: ['Pizza', 'Italian'] },
  { id: '2', name: 'Sushi Yama', imageUrl: 'https://source.unsplash.com/random/400x300?sushishop', rating: 4.8, deliveryTime: '30-40 min', cuisineTypes: ['Sushi', 'Japanese'] },
  { id: '3', name: 'Burger Hub', imageUrl: 'https://source.unsplash.com/random/400x300?burgerjoint', rating: 4.2, deliveryTime: '20-30 min', cuisineTypes: ['Burgers', 'Fast Food'] },
  { id: '4', name: 'Pasta Palace', imageUrl: 'https://source.unsplash.com/random/400x300?italianrestaurant', rating: 4.6, deliveryTime: '35-45 min', cuisineTypes: ['Italian', 'Pasta'] },
];

const bottomNavItems = [
  { path: '/', label: 'Home', icon: <Home className="h-5 w-5" />, activeIcon: <Home className="h-5 w-5" /> },
  { path: '/cart', label: 'Cart', icon: <ShoppingCart className="h-5 w-5" />, activeIcon: <ShoppingCart className="h-5 w-5" /> },
  { path: '/order-tracking', label: 'Orders', icon: <Package className="h-5 w-5" />, activeIcon: <Package className="h-5 w-5" /> },
];

const HomePage = () => {
  console.log('HomePage loaded');
  const navigate = useNavigate();

  const handleRestaurantClick = (id: string | number) => {
    navigate(`/restaurant-menu`); // In a real app: navigate(`/restaurant/${id}`);
    console.log('Navigate to restaurant:', id);
  };

  const handleCategoryClick = (category: any) => {
    console.log('Category clicked:', category.name);
    // Potentially filter restaurants or navigate to a category page
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader>
        <div className="w-full px-4 sm:px-0">
          <Input type="search" placeholder="Search restaurants or cuisines..." className="w-full md:w-2/3 lg:w-1/2" />
        </div>
      </AppHeader>
      <main className="flex-grow pb-20"> {/* Add padding-bottom for bottom nav */}
        <section className="py-4 px-4 md:px-8">
          <h2 className="text-2xl font-semibold mb-3">Categories</h2>
          <CategoryCarousel categories={placeholderCategories} onCategoryClick={handleCategoryClick} />
        </section>

        <section className="py-4 px-4 md:px-8">
          <h2 className="text-2xl font-semibold mb-4">Featured Restaurants</h2>
          <ScrollArea className="h-full"> {/* Adjust height as needed or remove if page scroll is enough */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {placeholderRestaurants.map(resto => (
                <RestaurantCard
                  key={resto.id}
                  id={resto.id}
                  name={resto.name}
                  imageUrl={resto.imageUrl}
                  rating={resto.rating}
                  deliveryTime={resto.deliveryTime}
                  cuisineTypes={resto.cuisineTypes}
                  onClick={() => handleRestaurantClick(resto.id)}
                />
              ))}
            </div>
          </ScrollArea>
        </section>
      </main>
      <BottomNavigationBar items={bottomNavItems} />
    </div>
  );
};

export default HomePage;