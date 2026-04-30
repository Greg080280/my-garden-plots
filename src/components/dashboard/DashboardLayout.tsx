import { cn } from "@/lib/utils";
import { useState, type ReactNode } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar, type SidebarItem } from "./Sidebar";
import { BellIcon } from "@/components/icons/HandDrawn";
import { useAuth, type Role } from "@/context/AuthContext";

interface Props {
  items: SidebarItem[];
  /** Map pathname → page title (script font in header). */
  titles?: Record<string, string>;
  /** Optional override: instead of route Outlet, render this. */
  children?: ReactNode;
  accent?: "light" | "olive" | "dark";
  /** Required role(s) — assumed validated by parent ProtectedRoute. */
  role?: Role | Role[];
}

export const DashboardLayout = ({ items, titles, children, accent = "olive" }: Props) => {
  const { pathname } = useLocation();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  // Find best title match (longest prefix wins).
  const title =
    titles?.[pathname] ??
    Object.entries(titles ?? {})
      .filter(([k]) => pathname.startsWith(k))
      .sort((a, b) => b[0].length - a[0].length)[0]?.[1] ??
    "";

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop sidebar */}
      <div className="hidden lg:block w-[260px] shrink-0 sticky top-0 h-screen">
        <Sidebar items={items} accent={accent} />
      </div>

      {/* Mobile sidebar via Sheet */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="p-0 w-[280px] bg-paper border-r border-primary/30">
          <Sidebar items={items.map(i => ({ ...i }))} accent={accent} />
        </SheetContent>
      </Sheet>

      {/* Main column */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-[60px] border-b border-primary/15 bg-background/85 backdrop-blur sticky top-0 z-30 flex items-center px-4 lg:px-8 gap-3">
          <SheetTrigger asChild>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="lg:hidden h-10 w-10 grid place-items-center rounded-full hover:bg-accent press"
              aria-label="Deschide meniul"
            >
              <Menu className="h-5 w-5 text-primary" />
            </button>
          </SheetTrigger>

          {title && (
            <h1 className="font-script text-3xl text-primary leading-none pt-1 truncate">{title}</h1>
          )}

          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              className="relative h-10 w-10 grid place-items-center rounded-full hover:bg-accent press text-primary"
              aria-label="Notificări"
            >
              <BellIcon size={20} />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-brown" />
            </button>
            {user && (
              <div className="h-9 w-9 rounded-full bg-primary text-primary-foreground grid place-items-center font-display font-bold text-sm">
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        </header>

        {/* Subtle wavy separator below header */}
        <div className="h-2 bg-no-repeat bg-[length:100px_8px] opacity-50 pointer-events-none"
             style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 8'><path d='M0 4 Q 12.5 0 25 4 T 50 4 T 75 4 T 100 4' stroke='%236B8E4E' stroke-width='1.2' fill='none' stroke-linecap='round'/></svg>\")" }}
             aria-hidden />

        <main className={cn("flex-1 px-4 lg:px-8 py-6 lg:py-8 max-w-[1400px] w-full mx-auto")}>
          {children ?? <Outlet />}
        </main>
      </div>
    </div>
  );
};
