
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Cookie, ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-3xl mx-auto text-center page-transition">
        <div className="flex justify-center mb-6 animate-slide-in">
          <div className="p-4 rounded-full bg-primary/10 text-primary">
            <Cookie size={40} strokeWidth={1.5} />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-slide-in" style={{ animationDelay: '50ms' }}>
          Cookie Management Dashboard
        </h1>
        
        <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-slide-in" style={{ animationDelay: '100ms' }}>
          A beautifully designed, intuitive solution for managing website cookies with precision and clarity.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-in" style={{ animationDelay: '150ms' }}>
          <Link to="/dashboard">
            <Button size="lg" className="px-8 gap-2">
              Enter Dashboard 
              <ArrowRight size={16} />
            </Button>
          </Link>
          
          <Link to="https://github.com" target="_blank">
            <Button variant="outline" size="lg">
              View Documentation
            </Button>
          </Link>
        </div>
        
        <div className="glass-card rounded-xl overflow-hidden shadow-xl animate-slide-in" style={{ animationDelay: '200ms' }}>
          <div className="aspect-[16/9] bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center">
            <div className="glass-panel rounded-lg shadow-sm px-6 py-4 flex items-center gap-3">
              <Cookie className="text-primary" />
              <span className="text-sm font-medium">Cookie settings updated successfully</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
