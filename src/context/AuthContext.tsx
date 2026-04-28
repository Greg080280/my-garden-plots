import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

interface User { name: string; email: string; role: "client" | "farmer" }
interface AuthCtx {
  user: User | null;
  login: (email: string, name?: string, role?: "client" | "farmer") => void;
  logout: () => void;
}
const Ctx = createContext<AuthCtx | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem("mygarden:user");
    if (raw) try { setUser(JSON.parse(raw)); } catch { /* ignore */ }
  }, []);

  const login: AuthCtx["login"] = (email, name = email.split("@")[0], role = "client") => {
    const u = { email, name, role };
    setUser(u);
    localStorage.setItem("mygarden:user", JSON.stringify(u));
  };
  const logout = () => { setUser(null); localStorage.removeItem("mygarden:user"); };

  return <Ctx.Provider value={{ user, login, logout }}>{children}</Ctx.Provider>;
};

export const useAuth = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAuth outside AuthProvider");
  return v;
};
