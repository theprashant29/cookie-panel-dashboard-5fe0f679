
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Header } from '@/components/dashboard/Header';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RulesList } from '@/components/rules/RulesList';

const CustomRules = () => {
  const { id, action } = useParams();
  const isListView = !id && !action;
  
  const [formData, setFormData] = useState({
    ruleId: '',
    rule_type: 'custom',
    status: 'active',
    action: 'add',
    url: '',
    name: '',
    value: '',
    applyToSubdomains: false,
    applyToDomain: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
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
        <Header title="Custom Header Rules" />
        <main className="flex-1 overflow-y-auto p-6">
          {isListView ? (
            <RulesList 
              ruleType="custom" 
              title="Custom Header Rules" 
              addNewPath="/custom-rules/new" 
            />
          ) : (
            <Card className="max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle>Add Custom Header Rule</CardTitle>
                <CardDescription>
                  Create custom HTTP header rules for your domains
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <input type="hidden" name="ruleId" value={formData.ruleId} />
                  <input type="hidden" name="rule_type" value={formData.rule_type} />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                      <Label htmlFor="action">Action</Label>
                      <Select
                        value={formData.action}
                        onValueChange={(value) => handleSelectChange('action', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select action" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="add">Add</SelectItem>
                          <SelectItem value="remove">Remove</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="url">Target URL</Label>
                      <Input
                        id="url"
                        name="url"
                        value={formData.url}
                        onChange={handleInputChange}
                        placeholder="https://example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Header Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="X-Custom-Header"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="value">Header Value</Label>
                      <Input
                        id="value"
                        name="value"
                        value={formData.value}
                        onChange={handleInputChange}
                        placeholder="X-Custom-Header value"
                        required
                      />
                    </div>

                    <div className="space-y-3">
                      <Label>Apply To</Label>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="applyToSubdomains" 
                          checked={formData.applyToSubdomains}
                          onCheckedChange={(checked) => 
                            handleCheckboxChange('applyToSubdomains', checked as boolean)
                          }
                        />
                        <Label htmlFor="applyToSubdomains" className="cursor-pointer">
                          Apply to All Subdomains
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="applyToDomain" 
                          checked={formData.applyToDomain}
                          onCheckedChange={(checked) => 
                            handleCheckboxChange('applyToDomain', checked as boolean)
                          }
                        />
                        <Label htmlFor="applyToDomain" className="cursor-pointer">
                          Apply to Whole Domain
                        </Label>
                      </div>
                    </div>
                  </div>

                  <Button type="submit" className="w-full md:w-auto">Save Rule</Button>
                </form>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
};

export default CustomRules;
