import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  COMPANIES, LANDS, ALL_PLOTS, CULTURES, SERVICES, PRODUCTS,
  RESERVATIONS, TASKS, PRODUCT_ORDERS, ACTIVITY,
  type Company, type Land, type Plot, type Service, type Product,
  type Reservation, type ReservationStatus, type Task, type ProductOrder, type ActivityEvent,
} from "@/data/mock";
import { SEEDED_USERS, type User } from "@/context/AuthContext";

const KEY = "mygarden:data:v2";

const STAGE_ORDER: ReservationStatus[] = ["Rezervat", "Arat", "Plantat", "În creștere", "Recoltat"];

interface DataState {
  users: User[];
  companies: Company[];
  lands: Land[];
  plots: Plot[];
  services: Service[];
  products: Product[];
  reservations: Reservation[];
  tasks: Task[];
  productOrders: ProductOrder[];
  activity: ActivityEvent[];
}

const INITIAL: DataState = {
  users: SEEDED_USERS,
  companies: COMPANIES,
  lands: LANDS,
  plots: ALL_PLOTS,
  services: SERVICES,
  products: PRODUCTS,
  reservations: RESERVATIONS,
  tasks: TASKS,
  productOrders: PRODUCT_ORDERS,
  activity: ACTIVITY,
};

interface DataCtx extends DataState {
  // reservations
  advanceReservation: (id: string) => void;
  setReservationStatus: (id: string, status: ReservationStatus) => void;
  addReservation: (r: Omit<Reservation, "id" | "createdAt"> & { id?: string }) => Reservation;
  // tasks
  setTaskStatus: (id: string, status: Task["status"]) => void;
  addTask: (t: Omit<Task, "id">) => void;
  // services
  addService: (s: Omit<Service, "id">) => void;
  updateService: (id: string, patch: Partial<Service>) => void;
  deleteService: (id: string) => void;
  // products
  addProduct: (p: Omit<Product, "id">) => void;
  updateProduct: (id: string, patch: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  // orders
  setOrderStatus: (id: string, status: ProductOrder["status"]) => void;
  addOrder: (o: Omit<ProductOrder, "id" | "createdAt">) => void;
  // companies
  toggleCompanyVerified: (id: string) => void;
  // lands
  deleteLand: (id: string) => void;
  updateLand: (id: string, patch: Partial<Land>) => void;
  // users
  deleteUser: (id: string) => void;
  // util
  logActivity: (kind: ActivityEvent["kind"], message: string) => void;
  reset: () => void;
}

const Ctx = createContext<DataCtx | null>(null);

const nowStamp = () => {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`;
};

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<DataState>(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) return { ...INITIAL, ...JSON.parse(raw) };
    } catch { /* ignore */ }
    return INITIAL;
  });

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* ignore */ }
  }, [state]);

  const value = useMemo<DataCtx>(() => {
    const logActivity = (kind: ActivityEvent["kind"], message: string) =>
      setState(s => ({
        ...s,
        activity: [{ id: `a-${Date.now()}`, at: nowStamp(), kind, message }, ...s.activity].slice(0, 50),
      }));

    return {
      ...state,

      advanceReservation: (id) => setState(s => {
        const r = s.reservations.find(x => x.id === id);
        if (!r) return s;
        const idx = STAGE_ORDER.indexOf(r.status);
        if (idx < 0 || idx >= STAGE_ORDER.length - 1) return s;
        const next = STAGE_ORDER[idx + 1];
        const today = new Date().toISOString().slice(0, 10);
        return {
          ...s,
          reservations: s.reservations.map(x =>
            x.id === id ? { ...x, status: next, stageDates: { ...x.stageDates, [next]: today } } : x),
          activity: [{ id: `a-${Date.now()}`, at: nowStamp(), kind: "reservation",
            message: `Rezervarea ${id} a avansat la „${next}"` }, ...s.activity].slice(0, 50),
        };
      }),

      setReservationStatus: (id, status) => setState(s => ({
        ...s,
        reservations: s.reservations.map(x =>
          x.id === id ? { ...x, status, stageDates: { ...x.stageDates, [status]: new Date().toISOString().slice(0, 10) } } : x),
      })),

      addReservation: (r) => {
        const full: Reservation = {
          ...r,
          id: r.id ?? `r-${Date.now()}`,
          createdAt: new Date().toISOString().slice(0, 10),
        };
        setState(s => ({
          ...s,
          reservations: [full, ...s.reservations],
          activity: [{ id: `a-${Date.now()}`, at: nowStamp(), kind: "reservation",
            message: `Rezervare nouă pe ${full.landId}` }, ...s.activity].slice(0, 50),
        }));
        return full;
      },

      setTaskStatus: (id, status) => setState(s => ({
        ...s,
        tasks: s.tasks.map(t => t.id === id ? { ...t, status } : t),
        activity: [{ id: `a-${Date.now()}`, at: nowStamp(), kind: "service",
          message: `Sarcină ${id} → ${status}` }, ...s.activity].slice(0, 50),
      })),

      addTask: (t) => setState(s => ({
        ...s, tasks: [...s.tasks, { ...t, id: `t-${Date.now()}` }],
      })),

      addService: (svc) => setState(s => ({
        ...s, services: [...s.services, { ...svc, id: `s-${Date.now()}` }],
      })),
      updateService: (id, patch) => setState(s => ({
        ...s, services: s.services.map(x => x.id === id ? { ...x, ...patch } : x),
      })),
      deleteService: (id) => setState(s => ({
        ...s, services: s.services.filter(x => x.id !== id),
      })),

      addProduct: (p) => setState(s => ({
        ...s, products: [...s.products, { ...p, id: `p-${Date.now()}` }],
      })),
      updateProduct: (id, patch) => setState(s => ({
        ...s, products: s.products.map(x => x.id === id ? { ...x, ...patch } : x),
      })),
      deleteProduct: (id) => setState(s => ({
        ...s, products: s.products.filter(x => x.id !== id),
      })),

      setOrderStatus: (id, status) => setState(s => ({
        ...s, productOrders: s.productOrders.map(o => o.id === id ? { ...o, status } : o),
        activity: [{ id: `a-${Date.now()}`, at: nowStamp(), kind: "order",
          message: `Comandă ${id} → ${status}` }, ...s.activity].slice(0, 50),
      })),
      addOrder: (o) => setState(s => ({
        ...s,
        productOrders: [{ ...o, id: `po-${Date.now()}`, createdAt: new Date().toISOString().slice(0, 10) }, ...s.productOrders],
      })),

      toggleCompanyVerified: (id) => setState(s => ({
        ...s, companies: s.companies.map(c => c.id === id ? { ...c, verified: !c.verified } : c),
        activity: [{ id: `a-${Date.now()}`, at: nowStamp(), kind: "user",
          message: `Companie ${id} — verificare modificată` }, ...s.activity].slice(0, 50),
      })),

      deleteLand: (id) => setState(s => ({
        ...s, lands: s.lands.filter(l => l.id !== id),
        plots: s.plots.filter(p => p.landId !== id),
      })),
      updateLand: (id, patch) => setState(s => ({
        ...s, lands: s.lands.map(l => l.id === id ? { ...l, ...patch } : l),
      })),

      deleteUser: (id) => setState(s => ({
        ...s, users: s.users.filter(u => u.id !== id),
      })),

      logActivity,
      reset: () => setState(INITIAL),
    };
  }, [state]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

export const useData = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error("useData outside DataProvider");
  return v;
};

export { STAGE_ORDER };
export { CULTURES };
