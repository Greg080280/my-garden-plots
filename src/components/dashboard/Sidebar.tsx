import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth, type Role } from "@/context/AuthContext";
import { DoorIcon } from "@/components/icons/HandDrawn";

export interface SidebarItem {
  label: string;
  to: string;
  icon: ReactNode;
  /** When true, only matches the exact path (default: prefix-match). */
  exact?: boolean;
  /** Optional small badge text (e.g. count). */
  badge?: string | number;
}

interface Props {
  items: SidebarItem[];
  /** Sidebar accent color theme — light, olive (default), or dark for admin. */
  accent?: "light" | "olive" | "dark";
  className?: string;
  /** Title shown above menu, e.g. "Grădinarul Ana". */
  roleLabel?: string;
}

const ROLE_LABELS: Record<Role, string> = {
  client: "Grădinar",
  farmer: "Fermier",
  admin: "Administrator",
};

export const Sidebar = ({ items, accent: _accent = "olive", className, roleLabel }: Props) => {
  void _accent;
  const { user, logout } = useAuth();
  const { pathname } = useLocation();

  const isActive = (item: SidebarItem) =>
    item.exact ? pathname === item.to : pathname === item.to || pathname.startsWith(item.to + "/");

  return (
    <aside className={cn(
      "flex flex-col h-full bg-paper border-r border-border px-6 py-7 gap-8",
      className
    )}>
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 group">
        <span className="font-script text-2xl text-primary-deep leading-none">MyGarden</span>
      </Link>

      {/* User block */}
      {user && (
        <div className="border-b border-border/70 pb-6">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-primary text-primary-foreground grid place-items-center font-ui font-semibold text-xs shrink-0">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="font-display text-sm text-primary-deep truncate">{user.name}</p>
              <p className="font-ui text-[10px] uppercase tracking-widest text-muted-foreground">
                {roleLabel ?? ROLE_LABELS[user.role]}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 flex flex-col gap-0.5 overflow-y-auto -mx-2">
        {items.map(item => {
          const active = isActive(item);
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "group flex items-center gap-3 px-3 h-9 font-display text-[14px] transition-colors relative",
                active
                  ? "text-primary-deep"
                  : "text-foreground/70 hover:text-primary-deep"
              )}
            >
              {active && <span className="absolute left-0 top-1.5 bottom-1.5 w-px bg-primary" />}
              <span className={cn("shrink-0", active ? "text-primary" : "text-primary/60 group-hover:text-primary")}>
                {item.icon}
              </span>
              <span className="truncate">{item.label}</span>
              {item.badge !== undefined && item.badge !== "" && item.badge !== 0 && (
                <span className="ml-auto font-ui text-[10px] uppercase tracking-widest text-muted-foreground">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <button
        type="button"
        onClick={logout}
        className="flex items-center gap-3 px-3 h-9 font-display text-[14px] text-brown hover:text-primary-deep transition-colors press border-t border-border/70 pt-6 -mx-2"
      >
        <DoorIcon size={18} />
        Ieșire
      </button>
    </aside>
  );
};
