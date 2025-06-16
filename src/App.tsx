
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import FindBolig from "./pages/FindBolig";
import InformationTilLejere from "./pages/InformationTilLejere";
import OmOs from "./pages/OmOs";
import Kontakt from "./pages/Kontakt";
import PropertyDetail from "./pages/PropertyDetail";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Waitlist from "./pages/Waitlist";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/find-bolig" element={<FindBolig />} />
          <Route path="/information-til-lejere" element={<InformationTilLejere />} />
          <Route path="/om-os" element={<OmOs />} />
          <Route path="/kontakt" element={<Kontakt />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/waitlist" element={<Waitlist />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
