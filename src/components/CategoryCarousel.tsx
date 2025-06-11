import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface Category {
  id: string | number;
  name: string;
  imageUrl?: string;
  path?: string; // Optional path for navigation
}

interface CategoryCarouselProps {
  categories: Category[];
  onCategoryClick?: (category: Category) => void;
}

const CategoryCarousel: React.FC<CategoryCarouselProps> = ({ categories, onCategoryClick }) => {
  const [emblaRef] = useEmblaCarousel({ loop: false, align: 'start', slidesToScroll: 'auto' }, [
    Autoplay({ delay: 4000, stopOnInteraction: true }),
  ]);

  console.log("Rendering CategoryCarousel with categories:", categories.length);

  if (!categories || categories.length === 0) {
    return <p className="text-center text-muted-foreground">No categories to display.</p>;
  }

  return (
    <div className="embla overflow-hidden py-4" ref={emblaRef}>
      <div className="embla__container flex gap-4">
        {categories.map((category) => (
          <div
            className="embla__slide flex-[0_0_auto] min-w-[100px] md:min-w-[150px] cursor-pointer"
            key={category.id}
            onClick={() => onCategoryClick && onCategoryClick(category)}
          >
            <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
              <CardContent className="p-0 flex flex-col items-center text-center h-full">
                {category.imageUrl && (
                  <AspectRatio ratio={1} className="w-full">
                    <img
                      src={category.imageUrl}
                      alt={category.name}
                      className="object-cover w-full h-full rounded-t-md"
                      onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
                    />
                  </AspectRatio>
                )}
                <div className={`p-2 ${category.imageUrl ? '' : 'pt-4 pb-4'}`}>
                  <p className="text-sm font-medium truncate">{category.name}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryCarousel;