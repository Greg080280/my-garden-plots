import { cn } from "@/lib/utils";
import { useState, type ReactNode } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Menu, Bell } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar, type SidebarItem } from "./Sidebar";
import { useAuth, type Role } from "@/context/AuthContext";

interface Props {
  items: SidebarItem[];
  footerItems?: SidebarItem[];
  /** Map pathname → page title. Longest prefix wins. */
  titles?: Record<string, string>;
  children?: ReactNode;
  /** Required role(s) — assumed validated by parent ProtectedRoute. */
  role?: Role | Role[];
}

/**
 * Two-pane app shell for client / farmer / admin dashboards.
 * Spec §3.3 — sidebar w-64 + main max-w-6xl on cream background.
 */
export const DashboardLayout = ({ items, footerItems, titles, children }: Props) => {
  const { pathname } = useLocation();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  const title =
    titles?.[pathname] ??
    Object.entries(titles ?? {})
      .filter(([k]) => pathname.startsWith(k))
      .sort((a, b) => b[0].length - a[0].length)[0]?.[1] ??
    "";

  return (
    <div className="min-h-screen bg-cream flex">
      {/* Desktop sidebar */}
      <div className="hidden lg:block shrink-0 sticky top-0 h-screen">
        <Sidebar items={items} footerItems={footerItems} />
      </div>

      {/* Mobile sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="p-0 w-64 bg-garden-100 border-r border-garden-400/30">
          <Sidebar items={items} footerItems={footerItems} className="w-full" />
        </SheetContent>
      </Sheet>

      {/* Main column */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 border-b border-garden-100 bg-cream-soft sticky top-0 z-30 flex items-center px-4 lg:px-8 gap-3">
          <SheetTrigger asChild>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="lg:hidden h-10 w-10 grid place-items-center rounded-md hover:bg-garden-100 press"
              aria-label="Deschide meniul"
            >
              <Menu className="h-5 w-5 text-garden-700" strokeWidth={1.6} />
            </button>
          </SheetTrigger>

          {title && (
            <h1 className="font-ui text-lg font-semibold text-garden-900 leading-none truncate">
              {title}
            </h1>
          )}

          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              className="relative h-10 w-10 grid place-items-center rounded-full hover:bg-garden-100 press text-garden-700"
              aria-label="Notificări"
            >
              <Bell className="h-[18px] w-[18px]" strokeWidth={1.6} />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[#E8D26A]" />
            </button>
            {user && (
              <div className="h-9 w-9 rounded-full bg-garden-600 text-cream-soft grid place-items-center font-ui font-semibold text-sm">
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        </header>

        <main className={cn("flex-1 px-6 lg:px-10 py-8 max-w-6xl w-full mx-auto")}>
          {children ?? <Outlet />}
        </main>
      </div>
    </div>
  );
};
