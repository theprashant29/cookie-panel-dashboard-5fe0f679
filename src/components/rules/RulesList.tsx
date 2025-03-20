
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Rule, getRulesByType, deleteRule } from '@/services/rulesService';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Eye, Pencil, Trash, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface RulesListProps {
  ruleType: 'redirect' | 'cancel' | 'custom';
  title: string;
  addNewPath: string;
}

export const RulesList = ({ ruleType, title, addNewPath }: RulesListProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedRule, setSelectedRule] = useState<Rule | null>(null);

  // Fetch rules
  const { data: rules = [], isLoading } = useQuery({
    queryKey: [`${ruleType}-rules`],
    queryFn: () => getRulesByType(ruleType),
  });

  // Delete rule mutation
  const deleteMutation = useMutation({
    mutationFn: deleteRule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`${ruleType}-rules`] });
      setDeleteDialogOpen(false);
    },
  });

  // Handle delete
  const handleDelete = (rule: Rule) => {
    setSelectedRule(rule);
    setDeleteDialogOpen(true);
  };

  // Confirm delete
  const confirmDelete = () => {
    if (selectedRule) {
      deleteMutation.mutate(selectedRule.id);
    }
  };

  // Navigate to edit page
  const handleEdit = (rule: Rule) => {
    navigate(`/${ruleType}-rules/${rule.id}/edit`);
  };

  // Navigate to view page
  const handleView = (rule: Rule) => {
    navigate(`/${ruleType}-rules/${rule.id}/view`);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{title}</h2>
        <Button onClick={() => navigate(addNewPath)}>
          <Plus className="mr-2 h-4 w-4" /> Add New Rule
        </Button>
      </div>

      {isLoading ? (
        <div className="py-8 text-center">Loading rules...</div>
      ) : rules.length === 0 ? (
        <div className="py-8 text-center border rounded-md">
          <p className="text-muted-foreground">No rules found</p>
          <Button 
            variant="outline" 
            className="mt-4" 
            onClick={() => navigate(addNewPath)}
          >
            Add your first rule
          </Button>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Status</TableHead>
              {ruleType === 'redirect' && (
                <>
                  <TableHead>URL Pattern</TableHead>
                  <TableHead>Redirect To</TableHead>
                </>
              )}
              {ruleType === 'cancel' && (
                <TableHead>Cancel URL</TableHead>
              )}
              {ruleType === 'custom' && (
                <>
                  <TableHead>Action</TableHead>
                  <TableHead>Header</TableHead>
                  <TableHead>Target URL</TableHead>
                </>
              )}
              <TableHead>Apply To</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rules.map((rule) => (
              <TableRow key={rule.id}>
                <TableCell>
                  <Badge variant={rule.status === 'active' ? 'default' : 'secondary'}>
                    {rule.status === 'active' ? 'Active' : 'Inactive'}
                  </Badge>
                </TableCell>
                
                {ruleType === 'redirect' && rule.rule_type === 'redirect' && (
                  <>
                    <TableCell className="font-mono text-xs">{rule.urlPattern}</TableCell>
                    <TableCell className="font-mono text-xs">{rule.redirectUrl}</TableCell>
                  </>
                )}
                
                {ruleType === 'cancel' && rule.rule_type === 'cancel' && (
                  <TableCell className="font-mono text-xs">{rule.cancelUrl}</TableCell>
                )}
                
                {ruleType === 'custom' && rule.rule_type === 'custom' && (
                  <>
                    <TableCell>{rule.action === 'add' ? 'Add' : 'Remove'}</TableCell>
                    <TableCell className="font-mono text-xs">{rule.name}</TableCell>
                    <TableCell className="font-mono text-xs truncate max-w-[200px]">{rule.url}</TableCell>
                  </>
                )}
                
                <TableCell>
                  {rule.rule_type === 'redirect' && rule.applyTo}
                  {rule.rule_type === 'cancel' && rule.applyTo}
                  {rule.rule_type === 'custom' && 
                    (rule.applyToDomain 
                      ? 'Whole Domain' 
                      : rule.applyToSubdomains 
                        ? 'All Subdomains' 
                        : 'Specific URL')}
                </TableCell>
                
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleView(rule)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(rule)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(rule)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this rule? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
