import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, ShoppingBasket, Bell, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

/**
 * Public + authenticated header.
 * Spec §3.1, §3.2:
 *  - Cream-soft background, h-16, sticky, shadow-sm on scroll
 *  - Logo: Caveat 28px in garden-500
 *  - Public nav: Terenuri / Culturi / Servicii / Marketplace
 *  - Authed nav switches by role
 *  - Right-side: cart, notifications (authed), user dropdown OR login/register CTA
 */

const PUBLIC_LINKS = [
  { to: "/lands",        label: "Terenuri" },
  { to: "/cultures",     label: "Culturi" },
  { to: "/services",     label: "Servicii" },
  { to: "/marketplace",  label: "Marketplace" },
];

const ROLE_LINKS = {
  client: [
    { to: "/dashboard",   label: "Lotul meu" },
    { to: "/services",    label: "Servicii" },
    { to: "/marketplace", label: "Marketplace" },
    { to: "/dashboard",   label: "Comenzile mele" },
  ],
  farmer: [
    { to: "/farmer",                  label: "Terenurile mele" },
    { to: "/farmer/services",         label: "Servicii oferite" },
    { to: "/farmer/products",         label: "Produsele mele" },
    { to: "/farmer/service-orders",   label: "Lucrări" },
  ],
  admin: [
    { to: "/admin",            label: "Dashboard" },
    { to: "/admin/users",      label: "Useri" },
    { to: "/admin/companies",  label: "Companii" },
    { to: "/admin/moderation", label: "Moderare" },
  ],
} as const;

export const Navbar = () => {
  const { user, logout } = useAuth();
  const { count } = useCart();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = user ? ROLE_LINKS[user.role] : PUBLIC_LINKS;
  const isActive = (to: string) => to === "/" ? pathname === "/" : pathname.startsWith(to);

  return (
    <header className={cn(
      "sticky top-0 z-40 transition-shadow duration-200 bg-cream-soft border-b border-garden-100",
      scrolled && "shadow-sm"
    )}>
      <div className="max-w-7xl mx-auto px-6 flex items-center h-16 gap-10">
        {/* Logo: Caveat 28px in garden-500 */}
        <Link to="/" className="flex items-baseline gap-1.5 shrink-0 press">
          <span className="font-script text-[28px] leading-none text-garden-500">MyGarden</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {links.map(l => (
            <NavLink
              key={l.to + l.label}
              to={l.to}
              className={cn(
                "font-ui text-[15px] font-medium text-garden-700/80 hover:text-garden-700 transition-colors",
                isActive(l.to) && "text-garden-700 nav-active"
              )}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2 ml-auto">
          {/* Cart */}
          <Link
            to="/marketplace"
            className="relative inline-flex items-center justify-center h-10 w-10 rounded-full text-garden-700 hover:bg-garden-100 press"
            aria-label="Coș"
          >
            <ShoppingBasket className="h-[18px] w-[18px]" strokeWidth={1.6} />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-4 min-w-[1rem] px-1 rounded-full bg-garden-600 text-cream-soft text-[10px] font-ui font-semibold flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>

          {user && (
            <button
              type="button"
              className="relative inline-flex items-center justify-center h-10 w-10 rounded-full text-garden-700 hover:bg-garden-100 press"
              aria-label="Notificări"
            >
              <Bell className="h-[18px] w-[18px]" strokeWidth={1.6} />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[#E8D26A]" />
            </button>
          )}

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="press inline-flex items-center gap-2 h-10 px-2 rounded-md hover:bg-garden-100">
                  <span className="h-8 w-8 rounded-full bg-garden-600 text-cream-soft grid place-items-center font-ui font-semibold text-xs">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                  <span className="hidden sm:inline font-ui text-sm font-medium text-garden-900">
                    {user.name.split(" ")[0]}
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-60 bg-cream-soft border-garden-100 rounded-lg shadow-card">
                <DropdownMenuLabel className="font-ui text-xs text-garden-700/70 truncate">
                  ✉ {user.email}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="font-ui">
                  <Link to={user.role === "farmer" ? "/farmer" : "/dashboard"}>Profilul meu</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="font-ui">Setări</DropdownMenuItem>
                <DropdownMenuItem className="font-ui">Schimbă parola</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="font-ui text-destructive focus:text-destructive">
                  🚪 Deconectare
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden sm:flex items-center gap-2 ml-2">
              <Link
                to="/login"
                className="press inline-flex items-center h-10 px-4 rounded-md font-ui text-sm font-medium text-garden-700 hover:bg-garden-100"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="press inline-flex items-center h-10 px-5 rounded-md bg-garden-600 text-cream-soft hover:bg-garden-700 font-ui text-sm font-medium"
              >
                Înregistrează-te
              </Link>
            </div>
          )}

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-md hover:bg-garden-100 press" aria-label="Meniu">
              <Menu className="h-5 w-5 text-garden-700" strokeWidth={1.6} />
            </SheetTrigger>
            <SheetContent side="right" className="bg-cream-soft border-l border-garden-100 w-[300px]">
              <span className="font-script text-[28px] text-garden-500 block mb-8">MyGarden</span>
              <nav className="flex flex-col">
                {links.map(l => (
                  <NavLink
                    key={l.to + l.label}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "font-ui text-base px-1 py-3 border-b border-garden-100 text-garden-700/80 hover:text-garden-700 inline-flex justify-between items-center",
                      isActive(l.to) && "text-garden-700 font-semibold"
                    )}
                  >
                    {l.label} <ArrowRight className="h-3 w-3 opacity-40" />
                  </NavLink>
                ))}
                {!user && (
                  <div className="flex flex-col gap-2 mt-6">
                    <Link to="/login" onClick={() => setOpen(false)} className="press inline-flex justify-center items-center h-11 rounded-md border border-garden-600 text-garden-700 font-ui">
                      Login
                    </Link>
                    <Link to="/register" onClick={() => setOpen(false)} className="press inline-flex justify-center items-center h-11 rounded-md bg-garden-600 text-cream-soft font-ui">
                      Înregistrează-te
                    </Link>
                  </div>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
