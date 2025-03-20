
import React, { useState } from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Header } from '@/components/dashboard/Header';
import { CookieCard, Cookie } from '@/components/cookies/CookieCard';
import { CookieForm } from '@/components/cookies/CookieForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, Plus, Search, Filter } from 'lucide-react';
import { toast } from 'sonner';

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
  },
  {
    id: '4',
    name: 'utm_source',
    domain: 'example.com',
    path: '/',
    value: 'google',
    expires: '2023-11-15T23:59:59',
    isEnabled: true,
    isEssential: false
  },
  {
    id: '5',
    name: 'auth_token',
    domain: 'api.example.com',
    path: '/',
    value: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ',
    expires: '2023-12-01T23:59:59',
    isEnabled: true,
    isEssential: true
  },
  {
    id: '6',
    name: 'language',
    domain: 'example.com',
    path: '/',
    value: 'en-US',
    expires: null,
    isEnabled: true,
    isEssential: false
  }
];

const Cookies = () => {
  const [cookies, setCookies] = useState(sampleCookies);
  const [searchQuery, setSearchQuery] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCookie, setSelectedCookie] = useState<Cookie | undefined>(undefined);
  
  const handleToggle = (id: string, enabled: boolean) => {
    setCookies(cookies.map(cookie => 
      cookie.id === id ? { ...cookie, isEnabled: enabled } : cookie
    ));
    toast(`Cookie ${enabled ? 'enabled' : 'disabled'}`);
  };

  const handleEdit = (cookie: Cookie) => {
    setSelectedCookie(cookie);
    setOpenDialog(true);
  };

  const handleDelete = (id: string) => {
    setCookies(cookies.filter(cookie => cookie.id !== id));
    toast.success('Cookie deleted');
  };

  const handleAddNew = () => {
    setSelectedCookie(undefined);
    setOpenDialog(true);
  };

  const handleFormSubmit = (data: any) => {
    if (selectedCookie) {
      // Update existing cookie
      setCookies(cookies.map(cookie => 
        cookie.id === selectedCookie.id ? { ...data, id: selectedCookie.id } : cookie
      ));
      toast.success('Cookie updated');
    } else {
      // Add new cookie
      const newCookie = {
        ...data,
        id: Date.now().toString()
      };
      setCookies([...cookies, newCookie]);
      toast.success('Cookie added');
    }
    setOpenDialog(false);
  };

  const filteredCookies = cookies.filter(cookie => 
    cookie.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cookie.domain.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Cookies" />
        
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search cookies by name or domain..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" className="gap-1.5">
                  <Filter size={14} />
                  Filter
                </Button>
                
                <Button size="sm" className="gap-1.5" onClick={handleAddNew}>
                  <Plus size={14} />
                  Add Cookie
                </Button>
              </div>
            </div>
            
            <Tabs defaultValue="all" className="mb-6">
              <TabsList>
                <TabsTrigger value="all">All Cookies ({cookies.length})</TabsTrigger>
                <TabsTrigger value="essential">Essential ({cookies.filter(c => c.isEssential).length})</TabsTrigger>
                <TabsTrigger value="non-essential">Non-Essential ({cookies.filter(c => !c.isEssential).length})</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-6">
                {filteredCookies.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No cookies found</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredCookies.map(cookie => (
                      <CookieCard 
                        key={cookie.id}
                        cookie={cookie}
                        onToggle={handleToggle}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="essential" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredCookies
                    .filter(cookie => cookie.isEssential)
                    .map(cookie => (
                      <CookieCard 
                        key={cookie.id}
                        cookie={cookie}
                        onToggle={handleToggle}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                      />
                    ))}
                </div>
              </TabsContent>
              
              <TabsContent value="non-essential" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredCookies
                    .filter(cookie => !cookie.isEssential)
                    .map(cookie => (
                      <CookieCard 
                        key={cookie.id}
                        cookie={cookie}
                        onToggle={handleToggle}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                      />
                    ))}
                </div>
              </TabsContent>
            </Tabs>
            
            <Alert className="max-w-4xl mx-auto">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Cookie Compliance Notice</AlertTitle>
              <AlertDescription>
                Ensure that all non-essential cookies are disabled by default and only enabled after explicit user consent.
              </AlertDescription>
            </Alert>
          </div>
        </main>
      </div>
      
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-[500px] p-0">
          <DialogHeader className="p-6 pb-2">
            <DialogTitle>{selectedCookie ? 'Edit Cookie' : 'Add New Cookie'}</DialogTitle>
          </DialogHeader>
          <div className="p-6 pt-2">
            <CookieForm 
              cookie={selectedCookie}
              onSubmit={handleFormSubmit}
              onCancel={() => setOpenDialog(false)}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Cookies;
