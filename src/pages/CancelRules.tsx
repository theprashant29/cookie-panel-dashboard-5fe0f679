
import React, { useState } from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Header } from '@/components/dashboard/Header';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const CancelRules = () => {
  const [formData, setFormData] = useState({
    ruleId: '',
    rule_type: 'cancel',
    status: 'active',
    applyTo: 'specific_url',
    cancelUrl: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    // Here you would typically send the data to your backend
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Cancel Rules" />
        <main className="flex-1 overflow-y-auto p-6">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle>Manage Cancel Rule</CardTitle>
              <CardDescription>
                Define URLs that cancel cookie operations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <input type="hidden" name="ruleId" value={formData.ruleId} />
                <input type="hidden" name="rule_type" value={formData.rule_type} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="status">State</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) => handleSelectChange('status', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="applyTo">Apply To</Label>
                    <Select
                      value={formData.applyTo}
                      onValueChange={(value) => handleSelectChange('applyTo', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select where to apply" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="specific_url">Specific URL</SelectItem>
                        <SelectItem value="domain">Exact Domain</SelectItem>
                        <SelectItem value="all">Apply to All</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cancelUrl">Cancel URL</Label>
                  <Input
                    id="cancelUrl"
                    name="cancelUrl"
                    value={formData.cancelUrl}
                    onChange={handleInputChange}
                    placeholder="Enter URL pattern to cancel"
                  />
                  <div className="text-sm text-muted-foreground mt-2">
                    <p>Examples:</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <code className="px-2 py-1 bg-secondary rounded text-xs">https://abc.com/logout*</code>
                      <code className="px-2 py-1 bg-secondary rounded text-xs">/logout*</code>
                      <code className="px-2 py-1 bg-secondary rounded text-xs">*logout*</code>
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full md:w-auto">Save Rule</Button>
              </form>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default CancelRules;
