import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Role = "client" | "farmer" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  phone?: string;
  joinedAt?: string;
  avatarSeed?: string;
  /** For farmers — the company they own */
  companyId?: string;
}

interface AuthCtx {
  user: User | null;
  /** Mock login — looks up a seeded user by email, otherwise creates a client. */
  login: (email: string, name?: string, role?: Role) => User;
  loginAs: (u: User) => void;
  logout: () => void;
}
const Ctx = createContext<AuthCtx | null>(null);

const STORAGE_KEY = "mygarden:user";

// Seeded accounts so login by email "just works" with the right role.
const SEEDED: User[] = [
  { id: "u-admin", name: "Admin Platformă", email: "admin@mygarden.md", role: "admin", phone: "+373 22 000 100", joinedAt: "2024-09-01" },
  { id: "u-ion", name: "Ion Popescu", email: "ion@agrosat.md", role: "farmer", phone: "+373 248 22 451", joinedAt: "2025-02-14", companyId: "c-agrosat" },
  { id: "u-maria", name: "Maria Ciobanu", email: "maria@gradinabio.md", role: "farmer", phone: "+373 235 71 209", joinedAt: "2025-04-03", companyId: "c-gradinabio" },
  { id: "u-petru", name: "Petru Rusu", email: "petru@codrufarm.md", role: "farmer", phone: "+373 244 30 818", joinedAt: "2025-05-22", companyId: "c-codrufarm" },
  { id: "u-ana", name: "Ana Munteanu", email: "ana@mail.md", role: "client", phone: "+373 79 481 207", joinedAt: "2026-01-10" },
  { id: "u-mihai", name: "Mihai Țurcanu", email: "mihai@mail.md", role: "client", phone: "+373 78 904 122", joinedAt: "2026-02-04" },
  { id: "u-elena", name: "Elena Vrabie", email: "elena@mail.md", role: "client", phone: "+373 69 718 503", joinedAt: "2026-02-19" },
];

export const SEEDED_USERS = SEEDED;
export const findUserByEmail = (email: string) =>
  SEEDED.find(u => u.email.toLowerCase() === email.toLowerCase());
export const findUserById = (id: string) => SEEDED.find(u => u.id === id);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) try { setUser(JSON.parse(raw)); } catch { /* ignore */ }
  }, []);

  const persist = (u: User | null) => {
    setUser(u);
    if (u) localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    else localStorage.removeItem(STORAGE_KEY);
  };

  const login: AuthCtx["login"] = (email, name, role) => {
    const seeded = findUserByEmail(email);
    const u: User = seeded ?? {
      id: `u-${Date.now()}`,
      email,
      name: name || email.split("@")[0],
      role: role ?? "client",
      joinedAt: new Date().toISOString().slice(0, 10),
    };
    persist(u);
    return u;
  };

  const loginAs: AuthCtx["loginAs"] = (u) => persist(u);
  const logout = () => persist(null);

  return <Ctx.Provider value={{ user, login, loginAs, logout }}>{children}</Ctx.Provider>;
};

export const useAuth = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAuth outside AuthProvider");
  return v;
};
