
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Cookie } from './CookieCard';

const cookieSchema = z.object({
  name: z.string().min(1, 'Cookie name is required'),
  domain: z.string().min(1, 'Domain is required'),
  path: z.string().default('/'),
  value: z.string().min(1, 'Value is required'),
  expires: z.string().nullable(),
  isEnabled: z.boolean().default(true),
  isEssential: z.boolean().default(false)
});

interface CookieFormProps {
  cookie?: Cookie;
  onSubmit: (data: z.infer<typeof cookieSchema>) => void;
  onCancel: () => void;
}

export const CookieForm: React.FC<CookieFormProps> = ({ 
  cookie,
  onSubmit,
  onCancel
}) => {
  const form = useForm<z.infer<typeof cookieSchema>>({
    resolver: zodResolver(cookieSchema),
    defaultValues: cookie || {
      name: '',
      domain: window.location.hostname,
      path: '/',
      value: '',
      expires: null,
      isEnabled: true,
      isEssential: false
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 animate-slide-in">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cookie Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="cookie_name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="domain"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Domain</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="example.com" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="path"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Path</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="/" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="expires"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Expires (optional)</FormLabel>
                <FormControl>
                  <Input 
                    type="datetime-local" 
                    {...field} 
                    value={field.value || ''} 
                    onChange={(e) => field.onChange(e.target.value || null)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Value</FormLabel>
              <FormControl>
                <Textarea 
                  {...field} 
                  placeholder="Cookie value..." 
                  className="min-h-[100px] font-mono"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-8">
          <FormField
            control={form.control}
            name="isEnabled"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <FormLabel>Enabled</FormLabel>
                  <FormDescription>
                    Is this cookie active?
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isEssential"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <FormLabel>Essential</FormLabel>
                  <FormDescription>
                    Is this cookie required?
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {cookie ? 'Update Cookie' : 'Add Cookie'}
          </Button>
        </div>
      </form>
    </Form>
  );
};
