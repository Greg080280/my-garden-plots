import { type ReactNode } from "react";
import {
  Home, Sprout, ShoppingBasket, User as UserIcon, Settings, BarChart3,
  Users as UsersIcon, Building2, Map, ClipboardList, Wrench, Package,
  CalendarCheck2, Activity, Shield,
} from "lucide-react";
import { DashboardLayout } from "./DashboardLayout";
import type { SidebarItem } from "./Sidebar";
import type { Role } from "@/context/AuthContext";

const CLIENT_ITEMS: SidebarItem[] = [
  { label: "Lotul meu",     to: "/dashboard",              icon: <Home />, exact: true },
  { label: "Rezervările mele", to: "/dashboard/reservations", icon: <Sprout /> },
  { label: "Comenzile mele",   to: "/dashboard/orders",       icon: <ShoppingBasket /> },
  { label: "Profil",        to: "/dashboard/profile",      icon: <UserIcon /> },
];

const FARMER_ITEMS: SidebarItem[] = [
  { label: "Sumar",         to: "/farmer",               icon: <BarChart3 />, exact: true },
  { label: "Terenurile mele", to: "/farmer/lands",       icon: <Map /> },
  { label: "Rezervări",     to: "/farmer/reservations",  icon: <CalendarCheck2 /> },
  { label: "Lucrări",       to: "/farmer/tasks",         icon: <ClipboardList /> },
  { label: "Servicii",      to: "/farmer/services",      icon: <Wrench /> },
  { label: "Produse",       to: "/farmer/products",      icon: <Package /> },
  { label: "Comenzi",       to: "/farmer/orders",        icon: <ShoppingBasket /> },
];

const ADMIN_ITEMS: SidebarItem[] = [
  { label: "Sumar",        to: "/admin",              icon: <BarChart3 />, exact: true },
  { label: "Utilizatori",  to: "/admin/users",        icon: <UsersIcon /> },
  { label: "Companii",     to: "/admin/companies",    icon: <Building2 /> },
  { label: "Terenuri",     to: "/admin/lands",        icon: <Map /> },
  { label: "Rezervări",    to: "/admin/reservations", icon: <CalendarCheck2 /> },
  { label: "Activitate",   to: "/admin/activity",     icon: <Activity /> },
  { label: "Moderare",     to: "/admin/moderation",   icon: <Shield /> },
];

const FOOTER: SidebarItem[] = [
  { label: "Setări", to: "#", icon: <Settings /> },
];

const TITLES: Record<Role, Record<string, string>> = {
  client: {
    "/dashboard": "Lotul meu",
    "/dashboard/reservations": "Rezervările mele",
    "/dashboard/orders": "Comenzile mele",
    "/dashboard/profile": "Profil",
  },
  farmer: {
    "/farmer": "Sumar fermier",
    "/farmer/lands": "Terenurile mele",
    "/farmer/reservations": "Rezervări",
    "/farmer/tasks": "Lucrări",
    "/farmer/services": "Servicii oferite",
    "/farmer/products": "Produse",
    "/farmer/orders": "Comenzi primite",
  },
  admin: {
    "/admin": "Sumar administrator",
    "/admin/users": "Utilizatori",
    "/admin/companies": "Companii",
    "/admin/lands": "Terenuri",
    "/admin/reservations": "Rezervări",
    "/admin/activity": "Activitate",
    "/admin/moderation": "Moderare",
  },
};

const ITEMS: Record<Role, SidebarItem[]> = {
  client: CLIENT_ITEMS,
  farmer: FARMER_ITEMS,
  admin: ADMIN_ITEMS,
};

export const RoleShell = ({ role, children }: { role: Role; children?: ReactNode }) => (
  <DashboardLayout items={ITEMS[role]} footerItems={FOOTER} titles={TITLES[role]} role={role}>
    {children}
  </DashboardLayout>
);
