import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth, type Role } from "@/context/AuthContext";
import { illos } from "@/assets";
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

export const Sidebar = ({ items, accent = "olive", className, roleLabel }: Props) => {
  const { user, logout } = useAuth();
  const { pathname } = useLocation();

  const isActive = (item: SidebarItem) =>
    item.exact ? pathname === item.to : pathname === item.to || pathname.startsWith(item.to + "/");

  const accentRing =
    accent === "light" ? "from-secondary/40 to-paper" :
    accent === "dark"  ? "from-primary-deep/15 to-paper" :
                         "from-primary/15 to-paper";

  return (
    <aside className={cn(
      "flex flex-col h-full bg-paper border-r border-primary/20 px-4 py-5 gap-4",
      className
    )}>
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 group px-1">
        <img src={illos.logoMascot} alt="" className="h-12 w-12 object-contain group-hover:rotate-3 transition-transform" />
        <span className="font-script text-3xl text-primary leading-none pt-1">MyGarden</span>
      </Link>

      {/* User card */}
      {user && (
        <div className={cn("rounded-2xl bg-gradient-to-br p-3 border border-primary/15", accentRing)}>
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-full bg-primary text-primary-foreground grid place-items-center font-display font-bold text-base shrink-0">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="font-display font-bold text-sm truncate">{user.name}</p>
              <p className="text-[11px] font-display text-primary uppercase tracking-wider">
                {roleLabel ?? ROLE_LABELS[user.role]}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 flex flex-col gap-1 overflow-y-auto pr-1 -mr-1">
        {items.map(item => {
          const active = isActive(item);
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "group flex items-center gap-3 px-3 h-10 rounded-xl font-display font-medium text-sm transition-all relative",
                active
                  ? "bg-accent text-primary-deep"
                  : "text-foreground/75 hover:bg-accent/50 hover:text-foreground"
              )}
            >
              <span className={cn("shrink-0 transition-colors", active ? "text-primary" : "text-primary/65 group-hover:text-primary")}>
                {item.icon}
              </span>
              <span className={cn("truncate", active && "wavy-underline")}>{item.label}</span>
              {item.badge !== undefined && item.badge !== "" && item.badge !== 0 && (
                <span className="ml-auto h-5 min-w-[1.25rem] px-1.5 rounded-full bg-primary text-primary-foreground text-[11px] font-display font-bold inline-flex items-center justify-center">
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
        className="flex items-center gap-3 px-3 h-10 rounded-xl font-display font-medium text-sm text-brown hover:bg-brown/10 transition-colors press"
      >
        <DoorIcon size={20} />
        Ieșire
      </button>
    </aside>
  );
};
