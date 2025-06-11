import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Assuming react-router-dom for navigation
import { cn } from '@/lib/utils'; // For conditional class names

interface NavigationItem {
  path: string;
  label: string;
  icon: React.ReactNode; // Expect a JSX element like <HomeIcon />
  activeIcon?: React.ReactNode; // Optional active state icon
}

interface BottomNavigationBarProps {
  items: NavigationItem[];
}

const BottomNavigationBar: React.FC<BottomNavigationBarProps> = ({ items }) => {
  const location = useLocation();
  console.log("Rendering BottomNavigationBar, current path:", location.pathname);

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 h-16 bg-background border-t border-border md:hidden">
      <div className="grid h-full max-w-lg grid-cols-3 mx-auto font-medium">
        {items.map((item) => {
          const isActive = location.pathname === item.path || (item.path !== "/" && location.pathname.startsWith(item.path));
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "inline-flex flex-col items-center justify-center px-5 hover:bg-muted group",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              {isActive && item.activeIcon ? item.activeIcon : item.icon}
              <span className={cn(
                  "text-xs mt-1",
                  isActive ? "font-semibold" : "font-normal group-hover:text-foreground"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigationBar;