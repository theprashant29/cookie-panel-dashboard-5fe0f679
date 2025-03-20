
import React from 'react';
import { cn } from '@/lib/utils';
import { Edit, Trash2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

export interface Cookie {
  id: string;
  name: string;
  domain: string;
  path: string;
  value: string;
  expires: string | null;
  isEnabled: boolean;
  isEssential: boolean;
}

interface CookieCardProps {
  cookie: Cookie;
  onToggle: (id: string, enabled: boolean) => void;
  onEdit: (cookie: Cookie) => void;
  onDelete: (id: string) => void;
}

export const CookieCard: React.FC<CookieCardProps> = ({ 
  cookie,
  onToggle,
  onEdit,
  onDelete
}) => {
  return (
    <div className={cn(
      'glass-card rounded-xl p-5 transition-all-200 animate-slide-in',
      cookie.isEnabled ? 'border-l-4 border-l-primary' : 'border-l-4 border-l-muted'
    )}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Switch 
            checked={cookie.isEnabled} 
            onCheckedChange={(checked) => onToggle(cookie.id, checked)}
            disabled={cookie.isEssential}
          />
          <h3 className="font-medium">{cookie.name}</h3>
          {cookie.isEssential && (
            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded">
              Essential
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8" 
            onClick={() => onEdit(cookie)}
          >
            <Edit size={16} />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 text-destructive hover:text-destructive" 
            onClick={() => onDelete(cookie.id)}
            disabled={cookie.isEssential}
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </div>
      
      <div className="bg-secondary/50 rounded-md p-3 text-sm font-mono break-all text-muted-foreground">
        {cookie.value.length > 100 ? `${cookie.value.substring(0, 100)}...` : cookie.value}
      </div>
      
      <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
        <div>
          <p className="text-muted-foreground">Domain</p>
          <p>{cookie.domain}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Path</p>
          <p>{cookie.path}</p>
        </div>
      </div>
      
      {cookie.expires && (
        <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock size={14} />
          <span>Expires: {cookie.expires}</span>
        </div>
      )}
    </div>
  );
};
