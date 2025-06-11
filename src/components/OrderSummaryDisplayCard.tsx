import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface OrderItemSummary {
  name: string;
  quantity: string | number;
  price?: number; // Optional price per item if detailed view
}
interface OrderSummary {
  subtotal: number;
  deliveryFee?: number;
  taxes?: number;
  discount?: number;
  total: number;
  items?: OrderItemSummary[]; // Optional list of items for display
}

interface OrderSummaryDisplayCardProps {
  summary: OrderSummary;
  title?: string;
}

const OrderSummaryDisplayCard: React.FC<OrderSummaryDisplayCardProps> = ({
  summary,
  title = "Order Summary",
}) => {
  console.log("Rendering OrderSummaryDisplayCard with title:", title);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {summary.items && summary.items.length > 0 && (
          <>
            <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
              {summary.items.map((item, index) => (
                <div key={index} className="flex justify-between text-sm text-muted-foreground">
                  <span>{item.name} (x{item.quantity})</span>
                  {item.price && <span>${(item.price * Number(item.quantity)).toFixed(2)}</span>}
                </div>
              ))}
            </div>
            <Separator />
          </>
        )}
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${summary.subtotal.toFixed(2)}</span>
          </div>
          {summary.deliveryFee !== undefined && (
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>${summary.deliveryFee.toFixed(2)}</span>
            </div>
          )}
          {summary.taxes !== undefined && (
            <div className="flex justify-between">
              <span>Taxes</span>
              <span>${summary.taxes.toFixed(2)}</span>
            </div>
          )}
          {summary.discount !== undefined && summary.discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>-${summary.discount.toFixed(2)}</span>
            </div>
          )}
        </div>
        <Separator />
        <div className="flex justify-between font-semibold text-base">
          <span>Total</span>
          <span>${summary.total.toFixed(2)}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummaryDisplayCard;