
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Cookies from "./pages/Cookies";
import Settings from "./pages/Settings";
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
            <Route path="/redirect-rules" element={<RedirectRules />} />
            <Route path="/cancel-rules" element={<CancelRules />} />
            <Route path="/custom-rules" element={<CustomRules />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </BlurBackground>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
