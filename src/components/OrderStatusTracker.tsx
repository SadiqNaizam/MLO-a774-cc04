import React from 'react';
import { CheckCircle, Circle, Truck, Package, ShoppingBag } from 'lucide-react'; // Example icons
import { cn } from '@/lib/utils';

interface StatusStep {
  name: string;
  completed: boolean;
  timestamp?: string;
  icon?: React.ReactNode;
}

interface OrderStatusTrackerProps {
  statuses: StatusStep[];
  currentStatusName?: string; // The name of the current active status
  estimatedDeliveryTime?: string;
}

// Default icons for common statuses
const defaultIcons: { [key: string]: React.ReactNode } = {
  "Order Confirmed": <Package className="h-5 w-5" />,
  "Processing": <ShoppingBag className="h-5 w-5" />, // Example, could be different
  "Preparing Food": <ShoppingBag className="h-5 w-5" />,
  "Out for Delivery": <Truck className="h-5 w-5" />,
  "Delivered": <CheckCircle className="h-5 w-5 text-green-500" />,
};

const OrderStatusTracker: React.FC<OrderStatusTrackerProps> = ({
  statuses,
  currentStatusName,
  estimatedDeliveryTime,
}) => {
  console.log("Rendering OrderStatusTracker, current status:", currentStatusName);

  if (!statuses || statuses.length === 0) {
    return <p className="text-muted-foreground">Order status not available.</p>;
  }
  
  const activeIndex = statuses.findIndex(status => status.name === currentStatusName);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        {statuses.map((status, index) => {
          const isCompleted = status.completed || (activeIndex !== -1 && index < activeIndex);
          const isActive = status.name === currentStatusName || (!currentStatusName && index === activeIndex); // Fallback to index if name not provided
          const iconToRender = status.icon || defaultIcons[status.name] || <Circle className="h-5 w-5" />;
          
          return (
            <React.Fragment key={status.name}>
              <div className="flex flex-col items-center text-center">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center border-2",
                    isCompleted || isActive ? "border-primary bg-primary/10 text-primary" : "border-border bg-muted text-muted-foreground",
                    isActive && "ring-2 ring-primary ring-offset-2"
                  )}
                >
                  {isCompleted ? <CheckCircle className="h-5 w-5 text-primary" /> : iconToRender}
                </div>
                <p className={cn(
                    "text-xs mt-2 w-20 truncate",
                    isActive ? "font-semibold text-primary" : "text-muted-foreground"
                )}>
                    {status.name}
                </p>
                {status.timestamp && <p className="text-xs text-muted-foreground">{status.timestamp}</p>}
              </div>
              {index < statuses.length - 1 && (
                <div className={cn(
                    "flex-1 h-1",
                    isCompleted || (isActive && index < activeIndex) ? "bg-primary" : "bg-border"
                )}/>
              )}
            </React.Fragment>
          );
        })}
      </div>
      {estimatedDeliveryTime && (
        <p className="text-center text-sm text-muted-foreground">
          Estimated Delivery: <span className="font-semibold text-foreground">{estimatedDeliveryTime}</span>
        </p>
      )}
    </div>
  );
};

export default OrderStatusTracker;