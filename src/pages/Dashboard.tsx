
import React from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Header } from '@/components/dashboard/Header';
import { StatCard } from '@/components/dashboard/StatCard';
import { CookieCard, Cookie } from '@/components/cookies/CookieCard';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Cookie as CookieIcon, 
  ShieldCheck, 
  AlertTriangle, 
  Clock, 
  ArrowRight 
} from 'lucide-react';

// Sample data
const sampleCookies: Cookie[] = [
  {
    id: '1',
    name: 'sessionid',
    domain: 'example.com',
    path: '/',
    value: 'abcdef123456',
    expires: '2023-12-31T23:59:59',
    isEnabled: true,
    isEssential: true
  },
  {
    id: '2',
    name: '_ga',
    domain: 'example.com',
    path: '/',
    value: 'GA1.2.1234567890.1234567890',
    expires: '2024-06-30T23:59:59',
    isEnabled: true,
    isEssential: false
  },
  {
    id: '3',
    name: 'preference',
    domain: 'example.com',
    path: '/',
    value: '{"theme":"dark","notifications":true}',
    expires: null,
    isEnabled: false,
    isEssential: false
  }
];

const Dashboard = () => {
  const handleToggle = (id: string, enabled: boolean) => {
    toast(`Cookie ${enabled ? 'enabled' : 'disabled'}`);
  };

  const handleEdit = (cookie: Cookie) => {
    console.log('Edit cookie', cookie);
  };

  const handleDelete = (id: string) => {
    toast.success('Cookie deleted');
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Dashboard" />
        
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatCard 
                title="Total Cookies" 
                value="12" 
                icon={CookieIcon}
                trend="up"
                trendValue="+3"
              />
              <StatCard 
                title="Essential Cookies" 
                value="4" 
                icon={ShieldCheck}
              />
              <StatCard 
                title="Expiring Soon" 
                value="2" 
                icon={Clock}
                trend="down"
                trendValue="-1"
              />
              <StatCard 
                title="Potential Issues" 
                value="3" 
                icon={AlertTriangle}
                trend="up"
                trendValue="+1"
              />
            </div>
            
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Recent Cookies</h2>
                <Link to="/cookies">
                  <Button variant="ghost" size="sm" className="gap-1 text-sm">
                    View All <ArrowRight size={14} />
                  </Button>
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sampleCookies.map(cookie => (
                  <CookieCard 
                    key={cookie.id}
                    cookie={cookie}
                    onToggle={handleToggle}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            </div>
            
            <div className="glass-card rounded-xl p-5 max-w-4xl mx-auto">
              <h2 className="text-lg font-semibold mb-3">Cookie Compliance Status</h2>
              <div className="bg-secondary/50 rounded-md p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
                  <span className="font-medium">Your site is compliant with cookie regulations</span>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <ShieldCheck size={16} className="mt-0.5 text-green-500" />
                    Essential cookies are properly implemented
                  </li>
                  <li className="flex items-start gap-2">
                    <ShieldCheck size={16} className="mt-0.5 text-green-500" />
                    Cookie banner is correctly displayed
                  </li>
                  <li className="flex items-start gap-2">
                    <ShieldCheck size={16} className="mt-0.5 text-green-500" />
                    Cookie policy page is available and accessible
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
