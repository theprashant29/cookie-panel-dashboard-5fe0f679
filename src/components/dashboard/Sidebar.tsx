
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Cookie, 
  ChevronLeft, 
  ChevronRight,
  LogOut,
  ArrowRightLeft,
  X,
  FileCode
} from 'lucide-react';

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon, label, collapsed }) => {
  return (
    <NavLink 
      to={to} 
      className={({ isActive }) => cn(
        'flex items-center gap-3 px-3 py-3 rounded-md transition-all-200 group',
        collapsed ? 'justify-center' : 'justify-start',
        isActive 
          ? 'bg-primary/10 text-primary' 
          : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
      )}
    >
      <span className="text-[18px]">{icon}</span>
      {!collapsed && (
        <span className="font-medium text-sm">{label}</span>
      )}
      {collapsed && (
        <span className="absolute left-full ml-2 px-2 py-1 bg-popover rounded-md shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 text-xs">
          {label}
        </span>
      )}
    </NavLink>
  );
};

export const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <aside className={cn(
      'glass-panel h-screen flex flex-col border-r',
      collapsed ? 'w-[70px]' : 'w-[240px]',
      'transition-all duration-300 ease-in-out'
    )}>
      <div className={cn(
        'flex items-center h-16 px-4 border-b',
        collapsed ? 'justify-center' : 'justify-between'
      )}>
        {!collapsed && (
          <div className="flex items-center gap-2">
            <Cookie className="h-5 w-5 text-primary" />
            <h1 className="text-lg font-semibold">Cookie Edit</h1>
          </div>
        )}
        {collapsed && (
          <Cookie className="h-5 w-5 text-primary" />
        )}
        <button 
          onClick={toggleSidebar} 
          className="rounded-full p-1 hover:bg-secondary transition-all-200"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <nav className="flex-1 flex flex-col gap-1 p-3 overflow-y-auto">
        <SidebarLink 
          to="/dashboard" 
          icon={<LayoutDashboard size={18} />} 
          label="Dashboard" 
          collapsed={collapsed} 
        />
        <SidebarLink 
          to="/cookies" 
          icon={<Cookie size={18} />} 
          label="Cookies" 
          collapsed={collapsed} 
        />
        
        {/* Rule management links */}
        <div className={cn(
          'mt-4 mb-2 px-3',
          collapsed ? 'text-center' : 'text-left'
        )}>
          <span className="text-xs font-medium text-muted-foreground">RULES</span>
        </div>
        
        <SidebarLink 
          to="/redirect-rules" 
          icon={<ArrowRightLeft size={18} />} 
          label="Redirect Rules" 
          collapsed={collapsed} 
        />
        <SidebarLink 
          to="/cancel-rules" 
          icon={<X size={18} />} 
          label="Cancel Rules" 
          collapsed={collapsed} 
        />
        <SidebarLink 
          to="/custom-rules" 
          icon={<FileCode size={18} />} 
          label="Custom Rules" 
          collapsed={collapsed} 
        />
      </nav>

      <div className="p-3 border-t">
        <SidebarLink 
          to="/" 
          icon={<LogOut size={18} />} 
          label="Exit Dashboard" 
          collapsed={collapsed} 
        />
      </div>
    </aside>
  );
};
