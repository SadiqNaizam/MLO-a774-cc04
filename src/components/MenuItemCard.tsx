import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from '@/components/ui/badge';
import { PlusCircle } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface MenuItemCardProps {
  id: string | number;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  onAddToCart: (id: string | number) => void;
  tags?: string[];
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({
  id,
  name,
  description,
  price,
  imageUrl,
  onAddToCart,
  tags,
}) => {
  console.log("Rendering MenuItemCard:", name);

  const handleAddToCart = () => {
    console.log("Adding to cart:", id, name);
    onAddToCart(id);
  };

  return (
    <Card className="w-full flex flex-col overflow-hidden">
      {imageUrl && (
         <CardHeader className="p-0 relative">
            <AspectRatio ratio={16/9}>
                <img
                    src={imageUrl}
                    alt={name}
                    className="object-cover w-full h-full"
                    onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
                />
            </AspectRatio>
            {tags && tags.length > 0 && (
                <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                    {tags.map(tag => <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>)}
                </div>
            )}
        </CardHeader>
      )}
      <CardContent className="p-4 space-y-2 flex-grow">
        <CardTitle className="text-base font-semibold">{name}</CardTitle>
        {description && <p className="text-xs text-muted-foreground line-clamp-2">{description}</p>}
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <span className="text-md font-bold text-primary">${price.toFixed(2)}</span>
        <Button size="sm" onClick={handleAddToCart}>
          <PlusCircle className="h-4 w-4 mr-2" /> Add
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MenuItemCard;