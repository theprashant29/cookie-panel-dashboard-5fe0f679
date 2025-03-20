
// API service for handling rule operations
import { toast } from "sonner";

export interface BaseRule {
  id: string;
  rule_type: 'redirect' | 'cancel' | 'custom';
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface RedirectRule extends BaseRule {
  rule_type: 'redirect';
  applyTo: 'specific_url' | 'exact_domain' | 'subdomains' | 'all';
  urlPattern: string;
  redirectUrl: string;
}

export interface CancelRule extends BaseRule {
  rule_type: 'cancel';
  applyTo: 'specific_url' | 'domain' | 'all';
  cancelUrl: string;
}

export interface CustomRule extends BaseRule {
  rule_type: 'custom';
  action: 'add' | 'remove';
  url: string;
  name: string;
  value: string;
  applyToSubdomains: boolean;
  applyToDomain: boolean;
}

export type Rule = RedirectRule | CancelRule | CustomRule;

// Mock data for demo purposes
const mockRules: Rule[] = [
  {
    id: "1",
    rule_type: "redirect",
    status: "active",
    applyTo: "specific_url",
    urlPattern: "/old-page*",
    redirectUrl: "/new-page",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "2",
    rule_type: "redirect",
    status: "inactive",
    applyTo: "exact_domain",
    urlPattern: "https://old-domain.com/*",
    redirectUrl: "https://new-domain.com",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "3",
    rule_type: "cancel",
    status: "active",
    applyTo: "specific_url",
    cancelUrl: "/logout*",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "4",
    rule_type: "custom",
    status: "active",
    action: "add",
    url: "https://example.com",
    name: "X-Custom-Header",
    value: "My-Custom-Value",
    applyToSubdomains: true,
    applyToDomain: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// In a real app, this would be an API call
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Get rules by type
export const getRulesByType = async (type: 'redirect' | 'cancel' | 'custom'): Promise<Rule[]> => {
  try {
    // Simulate API call
    await delay(500);
    return mockRules.filter(rule => rule.rule_type === type);
  } catch (error) {
    console.error('Error fetching rules:', error);
    toast.error('Failed to fetch rules');
    return [];
  }
};

// Get a single rule by ID
export const getRuleById = async (id: string): Promise<Rule | null> => {
  try {
    await delay(300);
    const rule = mockRules.find(rule => rule.id === id);
    return rule || null;
  } catch (error) {
    console.error('Error fetching rule:', error);
    toast.error('Failed to fetch rule details');
    return null;
  }
};

// Create a new rule
export const createRule = async <T extends Rule>(ruleData: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T> => {
  try {
    await delay(600);
    
    const now = new Date().toISOString();
    const newRule = {
      ...ruleData,
      id: `${mockRules.length + 1}`,
      createdAt: now,
      updatedAt: now
    } as T;
    
    mockRules.push(newRule);
    toast.success('Rule created successfully');
    return newRule;
  } catch (error) {
    console.error('Error creating rule:', error);
    toast.error('Failed to create rule');
    throw error;
  }
};

// Update an existing rule
export const updateRule = async <T extends Rule>(id: string, ruleData: Partial<T>): Promise<T> => {
  try {
    await delay(600);
    const index = mockRules.findIndex(r => r.id === id);
    
    if (index === -1) {
      throw new Error('Rule not found');
    }
    
    const currentRule = mockRules[index];
    
    // Create updated rule while maintaining the correct rule_type
    const updatedRule = {
      ...currentRule,
      ...ruleData,
      rule_type: currentRule.rule_type, // Ensure rule_type doesn't change
      updatedAt: new Date().toISOString()
    } as T;
    
    mockRules[index] = updatedRule;
    toast.success('Rule updated successfully');
    return updatedRule;
  } catch (error) {
    console.error('Error updating rule:', error);
    toast.error('Failed to update rule');
    throw error;
  }
};

// Delete a rule
export const deleteRule = async (id: string): Promise<void> => {
  try {
    await delay(500);
    const index = mockRules.findIndex(r => r.id === id);
    
    if (index === -1) {
      throw new Error('Rule not found');
    }
    
    mockRules.splice(index, 1);
    toast.success('Rule deleted successfully');
  } catch (error) {
    console.error('Error deleting rule:', error);
    toast.error('Failed to delete rule');
    throw error;
  }
};
