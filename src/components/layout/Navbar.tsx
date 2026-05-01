import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, ShoppingBasket, User, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (to: string) => to === "/" ? pathname === "/" : pathname.startsWith(to);

  return (
    <header className={cn(
      "sticky top-0 z-40 transition-all duration-300",
      scrolled
        ? "bg-background/85 backdrop-blur-md border-b border-border/60"
        : "bg-background border-b border-transparent"
    )}>
      <div className="container flex items-center h-16 gap-10">
        <Link to="/" className="flex items-baseline gap-1.5 group">
          <span className="font-script text-3xl text-primary-deep leading-none">MyGarden</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              className={cn(
                "font-display text-[15px] tracking-tight text-foreground/75 hover:text-primary-deep transition-colors",
                isActive(l.to) && "text-primary-deep nav-active"
              )}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4 ml-auto">
          <Link to="/marketplace" className="relative inline-flex items-center justify-center h-10 w-10 text-primary-deep hover:text-primary press" aria-label="Coș">
            <ShoppingBasket className="h-[18px] w-[18px]" strokeWidth={1.5} />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-4 min-w-[1rem] px-1 rounded-full bg-primary text-primary-foreground text-[10px] font-ui font-semibold flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="press inline-flex items-center gap-2 h-10 px-2">
                  <span className="h-8 w-8 rounded-full bg-primary text-primary-foreground grid place-items-center font-ui font-semibold text-xs">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                  <span className="hidden sm:inline font-display text-sm">{user.name.split(" ")[0]}</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-card border-border rounded-md">
                <DropdownMenuLabel className="font-ui text-[11px] uppercase tracking-widest text-muted-foreground">{user.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="font-display"><Link to="/dashboard">Grădina mea</Link></DropdownMenuItem>
                {user.role === "farmer" && <DropdownMenuItem asChild className="font-display"><Link to="/farmer">Panou fermier</Link></DropdownMenuItem>}
                <DropdownMenuItem asChild className="font-display"><Link to="/marketplace">Magazin</Link></DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-brown font-display">Ieșire</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              to="/login"
              className="press hidden sm:inline-flex items-center gap-2 h-10 px-5 rounded-md bg-primary text-primary-foreground hover:bg-primary-deep font-display text-sm"
            >
              <User className="h-4 w-4" strokeWidth={1.5} /> Intră
            </Link>
          )}

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="md:hidden inline-flex items-center justify-center h-10 w-10 press" aria-label="Meniu">
              <Menu className="h-5 w-5" strokeWidth={1.5} />
            </SheetTrigger>
            <SheetContent side="right" className="bg-paper border-l border-border w-[300px]">
              <span className="font-script text-3xl text-primary-deep block mb-8">MyGarden</span>
              <nav className="flex flex-col gap-1">
                {links.map(l => (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "font-display text-base px-1 py-3 border-b border-border/50 hover:text-primary",
                      isActive(l.to) && "text-primary"
                    )}
                  >
                    <span className="inline-flex items-center justify-between w-full">
                      {l.label} <ArrowRight className="h-3 w-3 opacity-50" />
                    </span>
                  </NavLink>
                ))}
                {!user && (
                  <Link to="/login" onClick={() => setOpen(false)} className="mt-6 inline-flex justify-center items-center h-11 rounded-md bg-primary text-primary-foreground font-display">
                    Intră în cont
                  </Link>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
