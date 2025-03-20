
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Cookies from "./pages/Cookies";
import RedirectRules from "./pages/RedirectRules";
import CancelRules from "./pages/CancelRules";
import CustomRules from "./pages/CustomRules";
import NotFound from "./pages/NotFound";
import { BlurBackground } from "./components/ui/BlurBackground";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BlurBackground>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/cookies" element={<Cookies />} />
            
            {/* Redirect Rules Routes */}
            <Route path="/redirect-rules" element={<RedirectRules />} />
            <Route path="/redirect-rules/new" element={<RedirectRules />} />
            <Route path="/redirect-rules/:id/edit" element={<RedirectRules />} />
            <Route path="/redirect-rules/:id/view" element={<RedirectRules />} />
            
            {/* Cancel Rules Routes */}
            <Route path="/cancel-rules" element={<CancelRules />} />
            <Route path="/cancel-rules/new" element={<CancelRules />} />
            <Route path="/cancel-rules/:id/edit" element={<CancelRules />} />
            <Route path="/cancel-rules/:id/view" element={<CancelRules />} />
            
            {/* Custom Rules Routes */}
            <Route path="/custom-rules" element={<CustomRules />} />
            <Route path="/custom-rules/new" element={<CustomRules />} />
            <Route path="/custom-rules/:id/edit" element={<CustomRules />} />
            <Route path="/custom-rules/:id/view" element={<CustomRules />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </BlurBackground>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
