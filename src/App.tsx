import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { DataProvider } from "@/context/DataContext";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PencilFilters } from "@/components/decor/PencilFilters";
import Landing from "./pages/Landing";
import Lands from "./pages/Lands";
import LandDetail from "./pages/LandDetail";
import Reserve from "./pages/Reserve";
import Auth from "./pages/Auth";
import Marketplace from "./pages/Marketplace";
import Cultures from "./pages/Cultures";
import Services from "./pages/Services";
import NotFound from "./pages/NotFound";

// Dashboards (role shells)
import Dashboard from "./pages/Dashboard";
import Farmer from "./pages/Farmer";
import Admin from "./pages/Admin";

// Client pages
import ClientOverview from "./pages/client/Overview";
import ClientReservations from "./pages/client/Reservations";
import ClientOrders from "./pages/client/Orders";
import ClientProfile from "./pages/client/Profile";

// Farmer pages
import FarmerOverview from "./pages/farmer/Overview";
import FarmerLands from "./pages/farmer/Lands";
import FarmerReservations from "./pages/farmer/Reservations";
import FarmerTasks from "./pages/farmer/Tasks";
import FarmerServices from "./pages/farmer/Services";
import FarmerProducts from "./pages/farmer/Products";
import FarmerOrders from "./pages/farmer/Orders";

// Admin pages
import AdminOverview from "./pages/admin/Overview";
import AdminUsers from "./pages/admin/Users";
import AdminCompanies from "./pages/admin/Companies";
import AdminLands from "./pages/admin/Lands";
import AdminReservations from "./pages/admin/Reservations";
import AdminActivity from "./pages/admin/Activity";
import AdminModeration from "./pages/admin/Moderation";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <DataProvider>
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <PencilFilters />
            <BrowserRouter>
              <Routes>
                {/* Public site */}
                <Route element={<SiteLayout />}>
                  <Route path="/" element={<Landing />} />
                  <Route path="/lands" element={<Lands />} />
                  <Route path="/lands/:id" element={<LandDetail />} />
                  <Route path="/reserve/:id" element={<Reserve />} />
                  <Route path="/marketplace" element={<Marketplace />} />
                  <Route path="/cultures" element={<Cultures />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/login" element={<Auth mode="login" />} />
                  <Route path="/register" element={<Auth mode="register" />} />
                </Route>

                {/* Client dashboard */}
                <Route path="/dashboard" element={<Dashboard />}>
                  <Route index element={<ClientOverview />} />
                  <Route path="reservations" element={<ClientReservations />} />
                  <Route path="orders" element={<ClientOrders />} />
                  <Route path="profile" element={<ClientProfile />} />
                </Route>

                {/* Farmer dashboard */}
                <Route path="/farmer" element={<Farmer />}>
                  <Route index element={<FarmerOverview />} />
                  <Route path="lands" element={<FarmerLands />} />
                  <Route path="reservations" element={<FarmerReservations />} />
                  <Route path="tasks" element={<FarmerTasks />} />
                  <Route path="services" element={<FarmerServices />} />
                  <Route path="products" element={<FarmerProducts />} />
                  <Route path="orders" element={<FarmerOrders />} />
                </Route>

                {/* Admin dashboard */}
                <Route path="/admin" element={<Admin />}>
                  <Route index element={<AdminOverview />} />
                  <Route path="users" element={<AdminUsers />} />
                  <Route path="companies" element={<AdminCompanies />} />
                  <Route path="lands" element={<AdminLands />} />
                  <Route path="reservations" element={<AdminReservations />} />
                  <Route path="activity" element={<AdminActivity />} />
                  <Route path="moderation" element={<AdminModeration />} />
                </Route>

                <Route element={<SiteLayout />}>
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </CartProvider>
      </DataProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
