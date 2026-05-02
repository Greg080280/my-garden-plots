import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth, type Role } from "@/context/AuthContext";
import { LogOut } from "lucide-react";

export interface SidebarItem {
  label: string;
  to: string;
  icon: ReactNode;
  /** Default: prefix-match. Use for the dashboard root. */
  exact?: boolean;
  badge?: string | number;
}

interface Props {
  items: SidebarItem[];
  className?: string;
  /** Optional title above the menu. */
  roleLabel?: string;
  /** Items to render below the divider (Setări, etc.). */
  footerItems?: SidebarItem[];
}

const ROLE_LABELS: Record<Role, string> = {
  client: "Grădinar",
  farmer: "Fermier",
  admin: "Administrator",
};

/**
 * Sidebar (spec §3.3):
 *  - w-64, bg garden-100, border-r
 *  - Active item: bg garden-700, text cream-soft, left indicator border-l-4 accent-yellow
 *  - Bottom: ⚙ Setări + 🚪 Deconectare
 */
export const Sidebar = ({ items, className, roleLabel, footerItems }: Props) => {
  const { user, logout } = useAuth();
  const { pathname } = useLocation();

  const isActive = (item: SidebarItem) =>
    item.exact ? pathname === item.to : pathname === item.to || pathname.startsWith(item.to + "/");

  const renderItem = (item: SidebarItem) => {
    const active = isActive(item);
    return (
      <Link
        key={item.to + item.label}
        to={item.to}
        className={cn(
          "group relative flex items-center gap-3 px-5 h-11 font-ui text-sm font-medium transition-colors",
          active
            ? "bg-garden-700 text-cream-soft border-l-4 border-[#E8D26A] pl-4"
            : "text-garden-700 hover:bg-garden-400/15 border-l-4 border-transparent pl-4"
        )}
      >
        <span className={cn("shrink-0 [&>svg]:h-[18px] [&>svg]:w-[18px]", active ? "text-cream-soft" : "text-garden-700/80")}>
          {item.icon}
        </span>
        <span className="truncate">{item.label}</span>
        {item.badge !== undefined && item.badge !== "" && item.badge !== 0 && (
          <span className={cn(
            "ml-auto inline-flex items-center justify-center h-5 min-w-[20px] px-1.5 rounded-full text-[10px] font-semibold",
            active ? "bg-cream-soft/20 text-cream-soft" : "bg-garden-600 text-cream-soft"
          )}>
            {item.badge}
          </span>
        )}
      </Link>
    );
  };

  return (
    <aside className={cn(
      "flex flex-col h-full w-64 bg-garden-100 border-r border-garden-400/30 py-6",
      className
    )}>
      {/* Logo */}
      <Link to="/" className="px-5 mb-8 inline-block">
        <span className="font-script text-[28px] text-garden-700 leading-none">MyGarden</span>
      </Link>

      {user && (
        <div className="px-5 pb-5 mb-3 border-b border-garden-400/30">
          <p className="font-ui text-[11px] uppercase tracking-widest text-garden-700/60 mb-1">
            {roleLabel ?? ROLE_LABELS[user.role]}
          </p>
          <p className="font-ui text-sm font-semibold text-garden-900 truncate">{user.name}</p>
        </div>
      )}

      <nav className="flex-1 flex flex-col gap-0.5 overflow-y-auto">
        {items.map(renderItem)}
      </nav>

      <div className="mt-3 pt-3 border-t border-garden-400/30 flex flex-col gap-0.5">
        {footerItems?.map(renderItem)}
        <button
          type="button"
          onClick={logout}
          className="flex items-center gap-3 px-5 h-11 font-ui text-sm font-medium text-garden-700 hover:bg-garden-400/15 border-l-4 border-transparent pl-4"
        >
          <LogOut className="h-[18px] w-[18px]" strokeWidth={1.6} />
          Deconectare
        </button>
      </div>
    </aside>
  );
};
