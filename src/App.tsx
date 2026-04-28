import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { SiteLayout } from "@/components/layout/SiteLayout";
import Landing from "./pages/Landing";
import Lands from "./pages/Lands";
import LandDetail from "./pages/LandDetail";
import Reserve from "./pages/Reserve";
import Dashboard from "./pages/Dashboard";
import Farmer from "./pages/Farmer";
import Auth from "./pages/Auth";
import Marketplace from "./pages/Marketplace";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route element={<SiteLayout />}>
                <Route path="/" element={<Landing />} />
                <Route path="/lands" element={<Lands />} />
                <Route path="/lands/:id" element={<LandDetail />} />
                <Route path="/reserve/:id" element={<Reserve />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/farmer" element={<Farmer />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/login" element={<Auth mode="login" />} />
                <Route path="/register" element={<Auth mode="register" />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
