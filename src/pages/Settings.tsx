
import React from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Header } from '@/components/dashboard/Header';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Save, 
  Globe, 
  Shield, 
  Bell, 
  User, 
  Users, 
  Layers 
} from 'lucide-react';
import { toast } from 'sonner';

const Settings = () => {
  const handleSave = () => {
    toast.success('Settings saved successfully');
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Settings" />
        
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-5xl mx-auto">
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid grid-cols-3 md:grid-cols-5 mb-6">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="privacy">Privacy</TabsTrigger>
                <TabsTrigger value="appearance">Appearance</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>
              </TabsList>
              
              <TabsContent value="general" className="space-y-6 animate-fade-in">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>General Settings</CardTitle>
                    <CardDescription>
                      Configure general settings for your cookie management
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="domain">Primary Domain</Label>
                        <Input id="domain" placeholder="example.com" defaultValue="example.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="expires">Default Expiration</Label>
                        <Input id="expires" placeholder="30 days" defaultValue="30 days" />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="autoScan">Auto-Scan for Cookies</Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically scan and detect cookies on your website
                        </p>
                      </div>
                      <Switch id="autoScan" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="autoBackup">Automatic Backups</Label>
                        <p className="text-sm text-muted-foreground">
                          Create backups of your cookie settings
                        </p>
                      </div>
                      <Switch id="autoBackup" defaultChecked />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button onClick={handleSave} className="gap-2">
                      <Save size={16} />
                      Save Changes
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Cookie Banner</CardTitle>
                    <CardDescription>
                      Customize the appearance and behavior of your cookie consent banner
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="bannerTitle">Banner Title</Label>
                      <Input 
                        id="bannerTitle" 
                        placeholder="We use cookies" 
                        defaultValue="We use cookies to improve your experience"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bannerMessage">Banner Message</Label>
                      <Textarea 
                        id="bannerMessage" 
                        placeholder="Cookie message..." 
                        defaultValue="This website uses cookies to ensure you get the best experience on our website. By continuing to use this site, you consent to our use of cookies."
                        className="min-h-[100px]"
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="showBanner">Show Cookie Banner</Label>
                        <p className="text-sm text-muted-foreground">
                          Display cookie consent banner to new visitors
                        </p>
                      </div>
                      <Switch id="showBanner" defaultChecked />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button onClick={handleSave} className="gap-2">
                      <Save size={16} />
                      Save Changes
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="privacy" className="space-y-6 animate-fade-in">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Privacy Settings</CardTitle>
                    <CardDescription>
                      Configure privacy and compliance settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="gdprMode">GDPR Compliance Mode</Label>
                        <p className="text-sm text-muted-foreground">
                          Enforce strict GDPR compliance rules
                        </p>
                      </div>
                      <Switch id="gdprMode" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="ccpaMode">CCPA Compliance Mode</Label>
                        <p className="text-sm text-muted-foreground">
                          Enable California Consumer Privacy Act compliance
                        </p>
                      </div>
                      <Switch id="ccpaMode" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="nonEssential">Block Non-Essential Cookies</Label>
                        <p className="text-sm text-muted-foreground">
                          Block all non-essential cookies until user consent
                        </p>
                      </div>
                      <Switch id="nonEssential" defaultChecked />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="privacyPolicy">Privacy Policy URL</Label>
                      <Input 
                        id="privacyPolicy" 
                        placeholder="https://example.com/privacy" 
                        defaultValue="https://example.com/privacy-policy"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cookiePolicy">Cookie Policy URL</Label>
                      <Input 
                        id="cookiePolicy" 
                        placeholder="https://example.com/cookies" 
                        defaultValue="https://example.com/cookie-policy"
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button onClick={handleSave} className="gap-2">
                      <Save size={16} />
                      Save Changes
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="appearance" className="space-y-6 animate-fade-in">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Appearance Settings</CardTitle>
                    <CardDescription>
                      Customize the look and feel of your cookie panel
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Primary Color</Label>
                        <div className="flex items-center gap-2">
                          <div className="h-10 w-10 rounded bg-primary"></div>
                          <Input defaultValue="#3b82f6" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Secondary Color</Label>
                        <div className="flex items-center gap-2">
                          <div className="h-10 w-10 rounded bg-secondary"></div>
                          <Input defaultValue="#f1f5f9" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bannerPosition">Banner Position</Label>
                      <select
                        id="bannerPosition"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        defaultValue="bottom"
                      >
                        <option value="top">Top</option>
                        <option value="bottom">Bottom</option>
                        <option value="bottom-left">Bottom Left</option>
                        <option value="bottom-right">Bottom Right</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="darkMode">Dark Mode Support</Label>
                        <p className="text-sm text-muted-foreground">
                          Adapt cookie panel to user's dark mode preference
                        </p>
                      </div>
                      <Switch id="darkMode" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="animations">Enable Animations</Label>
                        <p className="text-sm text-muted-foreground">
                          Show animations in the cookie panel
                        </p>
                      </div>
                      <Switch id="animations" defaultChecked />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button onClick={handleSave} className="gap-2">
                      <Save size={16} />
                      Save Changes
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="notifications" className="space-y-6 animate-fade-in">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                    <CardDescription>
                      Configure when and how you receive notifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="emailAlerts">Email Alerts</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive email notifications about important events
                        </p>
                      </div>
                      <Switch id="emailAlerts" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="cookieChange">Cookie Change Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Be notified when cookies are added or changed
                        </p>
                      </div>
                      <Switch id="cookieChange" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="complianceIssue">Compliance Issues</Label>
                        <p className="text-sm text-muted-foreground">
                          Be notified about potential compliance issues
                        </p>
                      </div>
                      <Switch id="complianceIssue" defaultChecked />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="notifyEmail">Notification Email</Label>
                      <Input 
                        id="notifyEmail" 
                        type="email"
                        placeholder="admin@example.com" 
                        defaultValue="admin@example.com"
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button onClick={handleSave} className="gap-2">
                      <Save size={16} />
                      Save Changes
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="users" className="space-y-6 animate-fade-in">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>
                      Manage access to the cookie management panel
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row justify-between gap-3 p-3 border rounded-lg">
                        <div className="flex gap-3">
                          <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                            <User size={20} />
                          </div>
                          <div>
                            <p className="font-medium">John Doe</p>
                            <p className="text-sm text-muted-foreground">admin@example.com</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Admin</span>
                          <Button variant="outline" size="sm">Edit</Button>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row justify-between gap-3 p-3 border rounded-lg">
                        <div className="flex gap-3">
                          <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                            <User size={20} />
                          </div>
                          <div>
                            <p className="font-medium">Jane Smith</p>
                            <p className="text-sm text-muted-foreground">jane@example.com</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">Editor</span>
                          <Button variant="outline" size="sm">Edit</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <Button variant="outline" className="w-full gap-2">
                        <Users size={16} />
                        Invite User
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
