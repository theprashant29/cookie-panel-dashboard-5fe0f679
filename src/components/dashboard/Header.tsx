
import React from 'react';
import { Search, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="h-16 border-b flex items-center justify-between px-6">
      <h1 className="text-xl font-semibold">{title}</h1>
      
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Search..." 
            className="pl-10 w-[220px] bg-secondary/50 border-0 focus-visible:ring-1"
          />
        </div>
        
        <Button variant="ghost" size="icon" className="relative">
          <Bell size={18} />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary"></span>
        </Button>
        
        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium text-sm">
          JD
        </div>
      </div>
    </header>
  );
};
