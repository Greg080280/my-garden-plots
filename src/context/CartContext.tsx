import { createContext, useContext, useState, type ReactNode } from "react";
import type { Product } from "@/data/mock";

interface CartItem { product: Product; qty: number }
interface CartCtx {
  items: CartItem[];
  add: (p: Product) => void;
  remove: (id: string) => void;
  clear: () => void;
  total: number;
  count: number;
}
const Ctx = createContext<CartCtx | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const add = (p: Product) =>
    setItems(prev => {
      const f = prev.find(i => i.product.id === p.id);
      if (f) return prev.map(i => i.product.id === p.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { product: p, qty: 1 }];
    });
  const remove = (id: string) => setItems(prev => prev.filter(i => i.product.id !== id));
  const clear = () => setItems([]);
  const total = items.reduce((s, i) => s + i.product.price * i.qty, 0);
  const count = items.reduce((s, i) => s + i.qty, 0);
  return <Ctx.Provider value={{ items, add, remove, clear, total, count }}>{children}</Ctx.Provider>;
};
export const useCart = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error("useCart outside CartProvider");
  return v;
};
