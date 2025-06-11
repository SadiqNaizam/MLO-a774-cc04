import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // For quantity
import { X, Minus, Plus } from 'lucide-react';

interface CartItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

interface CartItemCardProps {
  item: CartItem;
  onQuantityChange: (itemId: string | number, newQuantity: number) => void;
  onRemove: (itemId: string | number) => void;
}

const CartItemCard: React.FC<CartItemCardProps> = ({ item, onQuantityChange, onRemove }) => {
  console.log("Rendering CartItemCard for item:", item.name, "qty:", item.quantity);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      onQuantityChange(item.id, newQuantity);
    } else if (newQuantity === 0) { // Or handle removal directly
      onRemove(item.id);
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="p-4 flex items-center gap-4">
        {item.imageUrl && (
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-16 h-16 object-cover rounded-md"
            onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
          />
        )}
        <div className="flex-grow space-y-1">
          <h3 className="font-semibold text-sm">{item.name}</h3>
          <p className="text-primary font-medium text-sm">${(item.price * item.quantity).toFixed(2)}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => handleQuantityChange(item.quantity - 1)} disabled={item.quantity <= 1}>
            <Minus className="h-3 w-3" />
          </Button>
          <Input
            type="number"
            value={item.quantity}
            onChange={(e) => handleQuantityChange(parseInt(e.target.value, 10))}
            className="w-12 h-7 text-center px-1"
            min="1"
          />
          <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => handleQuantityChange(item.quantity + 1)}>
            <Plus className="h-3 w-3" />
          </Button>
        </div>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => onRemove(item.id)}>
          <X className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default CartItemCard;