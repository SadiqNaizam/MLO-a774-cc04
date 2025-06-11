import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Search } from 'lucide-react';

interface AppHeaderProps {
  title?: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
  showSearchButton?: boolean;
  onSearchClick?: () => void;
  children?: React.ReactNode; // For additional controls or branding
}

const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  showBackButton = false,
  onBackClick,
  showSearchButton = false,
  onSearchClick,
  children,
}) => {
  console.log("Rendering AppHeader with title:", title);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="flex items-center flex-1">
          {showBackButton && (
            <Button variant="ghost" size="icon" onClick={onBackClick || (() => window.history.back())} className="mr-2">
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Button>
          )}
          {title && <h1 className="text-lg font-semibold truncate">{title}</h1>}
          {!title && !children && (
            <Link to="/" className="font-bold text-lg">
              MyAppLogo
            </Link>
          )}
        </div>

        {children && <div className="flex flex-1 justify-center items-center">{children}</div>}

        <div className="flex flex-1 items-center justify-end space-x-2">
          {showSearchButton && (
            <Button variant="ghost" size="icon" onClick={onSearchClick}>
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          )}
          {/* Add other actions like profile, notifications etc. here */}
        </div>
      </div>
    </header>
  );
};

export default AppHeader;