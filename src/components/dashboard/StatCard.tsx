
import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  description, 
  icon: Icon,
  trend,
  trendValue,
  className
}) => {
  return (
    <div className={cn(
      'glass-card rounded-xl p-5 animate-scale-in',
      className
    )}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <p className="text-2xl font-semibold mt-1">{value}</p>
        </div>
        <div className="p-2 rounded-full bg-primary/10 text-primary">
          <Icon size={20} strokeWidth={1.5} />
        </div>
      </div>
      
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      
      {trend && trendValue && (
        <div className="mt-3 flex items-center text-xs">
          <span className={cn(
            'mr-1.5 px-1.5 py-0.5 rounded',
            trend === 'up' && 'bg-green-100 text-green-700',
            trend === 'down' && 'bg-red-100 text-red-700',
            trend === 'neutral' && 'bg-blue-100 text-blue-700',
          )}>
            {trendValue}
          </span>
          <span className="text-muted-foreground">vs last month</span>
        </div>
      )}
    </div>
  );
};
