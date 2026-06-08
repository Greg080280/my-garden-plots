import { useState } from "react";
import { Trash2, Plus } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useData } from "@/context/DataContext";
import { veg } from "@/assets";
import { Input } from "@/components/ui/input";
import type { Product } from "@/data/mock";

const CATEGORIES: Product["category"][] = ["Răsaduri", "Semințe", "Unelte", "Îngrășăminte"];

const FarmerProducts = () => {
  const { user } = useAuth();
  const { products, addProduct, deleteProduct, updateProduct } = useData();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [cat, setCat] = useState<Product["category"]>("Răsaduri");
  if (!user) return null;
  const mine = products.filter(p => p.farmerId === user.id);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;
    addProduct({ farmerId: user.id, name, price: Number(price), stock: Number(stock || 0), category: cat, icon: veg.tomatoes, description: "" });
    setName(""); setPrice(""); setStock("");
  };

  return (
    <div className="space-y-10">
      <form onSubmit={submit} className="editorial-card p-6 grid sm:grid-cols-[1fr_120px_100px_140px_auto] gap-3 items-end">
        <div>
          <label className="eyebrow text-[10px]">Produs nou</label>
          <Input value={name} onChange={e => setName(e.target.value)} placeholder="Nume" className="mt-1" />
        </div>
        <div>
          <label className="eyebrow text-[10px]">Preț</label>
          <Input value={price} onChange={e => setPrice(e.target.value)} type="number" placeholder="80" className="mt-1" />
        </div>
        <div>
          <label className="eyebrow text-[10px]">Stoc</label>
          <Input value={stock} onChange={e => setStock(e.target.value)} type="number" placeholder="20" className="mt-1" />
        </div>
        <div>
          <label className="eyebrow text-[10px]">Categorie</label>
          <select value={cat} onChange={e => setCat(e.target.value as Product["category"])} className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <button type="submit" className="press h-10 px-4 rounded-md bg-primary text-primary-foreground font-display text-sm inline-flex items-center gap-1.5">
          <Plus className="h-4 w-4" /> Adaugă
        </button>
      </form>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mine.map(p => (
          <article key={p.id} className="editorial-card p-6 group">
            <div className="flex items-start justify-between">
              <div>
                <p className="eyebrow text-[10px]">{p.category}</p>
                <h3 className="mt-2 font-display text-lg text-primary-deep">{p.name}</h3>
              </div>
              <button onClick={() => deleteProduct(p.id)} className="text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-4 flex items-end justify-between">
              <p className="font-display text-2xl text-primary-deep">{p.price} <span className="text-xs text-muted-foreground font-ui">MDL</span></p>
              <div className="flex items-center gap-2">
                <button onClick={() => updateProduct(p.id, { stock: Math.max(0, p.stock - 1) })} className="h-7 w-7 rounded border border-border hover:bg-paper">−</button>
                <span className="num text-sm w-8 text-center">{p.stock}</span>
                <button onClick={() => updateProduct(p.id, { stock: p.stock + 1 })} className="h-7 w-7 rounded border border-border hover:bg-paper">+</button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
export default FarmerProducts;
