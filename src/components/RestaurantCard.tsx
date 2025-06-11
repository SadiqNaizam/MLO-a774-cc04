import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { Star, Clock } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface RestaurantCardProps {
  id: string | number;
  name: string;
  imageUrl?: string;
  rating?: number | string;
  deliveryTime?: string;
  cuisineTypes?: string[];
  onClick?: (id: string | number) => void;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  id,
  name,
  imageUrl,
  rating,
  deliveryTime,
  cuisineTypes,
  onClick,
}) => {
  console.log("Rendering RestaurantCard:", name);

  return (
    <Card className="w-full overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300" onClick={() => onClick && onClick(id)}>
      {imageUrl && (
        <CardHeader className="p-0">
          <AspectRatio ratio={16 / 9}>
            <img
              src={imageUrl}
              alt={name}
              className="object-cover w-full h-full"
              onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
            />
          </AspectRatio>
        </CardHeader>
      )}
      <CardContent className="p-4 space-y-2">
        <CardTitle className="text-lg font-semibold truncate">{name}</CardTitle>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          {rating && (
            <div className="flex items-center">
              <Star className="h-4 w-4 mr-1 text-yellow-500 fill-yellow-500" />
              <span>{rating}</span>
            </div>
          )}
          {deliveryTime && (
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{deliveryTime}</span>
            </div>
          )}
        </div>
        {cuisineTypes && cuisineTypes.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-1">
            {cuisineTypes.slice(0, 3).map((cuisine) => (
              <Badge key={cuisine} variant="outline" className="text-xs">
                {cuisine}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RestaurantCard;