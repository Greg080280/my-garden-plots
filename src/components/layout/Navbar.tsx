import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, ShoppingBasket, User } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { botanicals, tools } from "@/assets";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Acasă" },
  { to: "/lands", label: "Loturi" },
  { to: "/marketplace", label: "Magazin" },
  { to: "/dashboard", label: "Grădina mea" },
];

export const Navbar = () => {
  const { user, logout } = useAuth();
  const { count } = useCart();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const isActive = (to: string) => to === "/" ? pathname === "/" : pathname.startsWith(to);

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-background/85 border-b border-primary/15">
      <div className="container flex items-center h-16 gap-6">
        <Link to="/" className="flex items-center gap-2 group">
          <img src={botanicals.wreath} alt="" className="h-9 w-9 object-contain group-hover:rotate-6 transition-transform" />
          <span className="font-script text-3xl text-primary leading-none pt-1">MyGarden</span>
        </Link>

        <nav className="hidden md:flex items-center gap-7 ml-4">
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              className={cn(
                "font-display font-medium text-foreground/80 hover:text-foreground transition-colors py-1",
                isActive(l.to) && "text-primary wavy-underline"
              )}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3 ml-auto">
          <Link to="/marketplace" className="relative inline-flex items-center justify-center h-10 w-10 rounded-full hover:bg-accent press" aria-label="Coș">
            <ShoppingBasket className="h-5 w-5 text-primary-deep" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 h-5 min-w-[1.25rem] px-1 rounded-full bg-primary text-primary-foreground text-[11px] font-display font-bold flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="press inline-flex items-center gap-2 h-10 px-3 rounded-full bg-accent hover:bg-accent/80">
                  <span className="h-7 w-7 rounded-full bg-primary text-primary-foreground grid place-items-center font-display font-bold text-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                  <span className="hidden sm:inline font-display font-medium text-sm">{user.name}</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-60 bg-card border-primary/30">
                <div className="px-2 pb-2 pt-1 flex items-center gap-2">
                  <img src={botanicals.bouquetBow} alt="" className="h-12 w-12 object-contain" />
                  <div>
                    <DropdownMenuLabel className="px-0 font-script text-2xl text-primary leading-none">Bun găsit!</DropdownMenuLabel>
                    <p className="text-xs text-muted-foreground px-0">{user.email}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild><Link to="/dashboard">Grădina mea</Link></DropdownMenuItem>
                {user.role === "farmer" && <DropdownMenuItem asChild><Link to="/farmer">Panou fermier</Link></DropdownMenuItem>}
                <DropdownMenuItem asChild><Link to="/marketplace">Magazin</Link></DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-brown">Ieșire</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              to="/login"
              className="press hidden sm:inline-flex items-center gap-2 h-10 px-4 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-display font-semibold text-sm"
            >
              <User className="h-4 w-4" /> Intră
            </Link>
          )}

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-full hover:bg-accent press" aria-label="Meniu">
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="bg-paper border-l border-primary/30 w-[300px]">
              <div className="flex items-center gap-2 mb-6">
                <img src={botanicals.wreath} alt="" className="h-10 w-10 object-contain" />
                <span className="font-script text-3xl text-primary pt-1">MyGarden</span>
              </div>
              <nav className="flex flex-col gap-2">
                {links.map(l => (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "font-display font-medium text-base px-3 py-2 rounded-lg hover:bg-accent",
                      isActive(l.to) && "bg-accent text-primary"
                    )}
                  >
                    {l.label}
                  </NavLink>
                ))}
                {!user && (
                  <Link to="/login" onClick={() => setOpen(false)} className="mt-4 inline-flex justify-center items-center h-11 rounded-full bg-primary text-primary-foreground font-display font-semibold">
                    Intră în cont
                  </Link>
                )}
                <img src={tools.wateringcan2} alt="" className="mt-8 h-32 mx-auto opacity-80" />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
