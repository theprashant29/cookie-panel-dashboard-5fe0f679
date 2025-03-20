
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
import { RulesList } from '@/components/rules/RulesList';
import { toast } from 'sonner';
import { createRule, getRuleById, updateRule, CancelRule } from '@/services/rulesService';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const CancelRules = () => {
  const { id, action } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isListView = !id && !action;
  const isNewView = action === 'new';
  const isEditView = action === 'edit';
  const isViewMode = action === 'view';
  
  const [formData, setFormData] = useState({
    ruleId: '',
    rule_type: 'cancel' as const,
    status: 'active' as const,
    applyTo: 'specific_url' as const,
    cancelUrl: ''
  });

  // Fetch rule if editing or viewing
  const { data: rule, isLoading: isLoadingRule } = useQuery({
    queryKey: ['cancel-rule', id],
    queryFn: () => getRuleById(id || ''),
    enabled: !!id && (isEditView || isViewMode),
  });

  // Update form data when rule is loaded
  useEffect(() => {
    if (rule && (isEditView || isViewMode) && rule.rule_type === 'cancel') {
      setFormData({
        ruleId: rule.id,
        rule_type: rule.rule_type,
        status: rule.status,
        applyTo: rule.applyTo,
        cancelUrl: rule.cancelUrl
      });
    }
  }, [rule, isEditView, isViewMode]);

  // Create mutation
  const createMutation = useMutation({
    mutationFn: (data: Omit<CancelRule, 'id' | 'createdAt' | 'updatedAt'>) => 
      createRule<CancelRule>(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cancel-rules'] });
      toast.success('Cancel rule created successfully');
      navigate('/cancel-rules');
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CancelRule> }) => 
      updateRule<CancelRule>(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cancel-rules'] });
      toast.success('Cancel rule updated successfully');
      navigate('/cancel-rules');
    },
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
    
    const { ruleId, ...ruleData } = formData;
    
    if (isEditView && ruleId) {
      updateMutation.mutate({ 
        id: ruleId, 
        data: ruleData 
      });
    } else {
      createMutation.mutate(ruleData);
    }
  };

  // Loading state
  if ((isEditView || isViewMode) && isLoadingRule) {
    return (
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header title="Cancel Rules" />
          <main className="flex-1 overflow-y-auto p-6">
            <div className="text-center py-10">Loading rule...</div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Cancel Rules" />
        <main className="flex-1 overflow-y-auto p-6">
          {isListView ? (
            <RulesList 
              ruleType="cancel" 
              title="Cancel Rules" 
              addNewPath="/cancel-rules/new" 
            />
          ) : (
            <Card className="max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle>
                  {isNewView ? 'Add New Cancel Rule' : 
                   isEditView ? 'Edit Cancel Rule' : 'View Cancel Rule'}
                </CardTitle>
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
                        disabled={isViewMode}
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
                        disabled={isViewMode}
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
                      readOnly={isViewMode}
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

                  <div className="flex justify-between">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => navigate('/cancel-rules')}
                    >
                      Cancel
                    </Button>
                    
                    {!isViewMode && (
                      <Button 
                        type="submit" 
                        className="ml-auto"
                        disabled={createMutation.isPending || updateMutation.isPending}
                      >
                        {createMutation.isPending || updateMutation.isPending ? 'Saving...' : 'Save Rule'}
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
};

export default CancelRules;
