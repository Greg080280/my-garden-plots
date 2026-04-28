import { useMemo, useState } from "react";
import { ShoppingBasket, Trash2 } from "lucide-react";
import { PRODUCTS, type Product } from "@/data/mock";
import { useCart } from "@/context/CartContext";
import { HDButton } from "@/components/decor/HDButton";
import { ScallopedFrame } from "@/components/decor/ScallopedFrame";
import { tools, veg } from "@/assets";
import { toast } from "sonner";

const CATS: { id: Product["category"] | "Toate"; icon: string }[] = [
  { id: "Toate", icon: tools.bag },
  { id: "Răsaduri", icon: veg.tomatoes },
  { id: "Semințe", icon: veg.peas },
  { id: "Unelte", icon: tools.trowel },
  { id: "Îngrășăminte", icon: tools.wateringcan2 },
];

const Marketplace = () => {
  const [cat, setCat] = useState<Product["category"] | "Toate">("Toate");
  const { items, add, remove, total, clear } = useCart();
  const list = useMemo(() => cat === "Toate" ? PRODUCTS : PRODUCTS.filter(p => p.category === cat), [cat]);

  return (
    <div className="container py-10 grid lg:grid-cols-[1fr_320px] gap-8">
      <section>
        <header className="mb-6">
          <p className="font-script text-3xl text-primary">Pentru grădina ta</p>
          <h1 className="font-display text-3xl font-bold">Magazinul MyGarden</h1>
        </header>

        <div className="flex flex-wrap gap-2 mb-6">
          {CATS.map(c => (
            <button key={c.id} onClick={() => setCat(c.id)}
              className={`inline-flex items-center gap-2 px-4 h-10 rounded-full border-2 font-display font-semibold text-sm press
                ${cat === c.id ? "bg-primary text-primary-foreground border-primary-deep" : "bg-paper border-primary/30 hover:bg-accent"}`}>
              <img src={c.icon} alt="" className="h-5 w-5 object-contain" />
              {c.id}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {list.map(p => (
            <article key={p.id} className="bg-card border border-primary/20 rounded-2xl p-4 shadow-paper hover:scale-[1.02] transition-transform">
              <div className="aspect-square bg-paper rounded-xl border border-primary/15 grid place-items-center mb-3">
                <img src={p.icon} alt={p.name} className="h-24 object-contain" />
              </div>
              <p className="text-[11px] uppercase tracking-wide font-display font-bold text-primary">{p.category}</p>
              <h3 className="font-display font-semibold text-base mt-0.5">{p.name}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{p.description}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="font-display font-bold text-primary-deep">{p.price} <span className="text-xs text-muted-foreground font-normal">MDL</span></span>
                <HDButton tone="cream" className="h-9 px-4 text-sm" onClick={() => { add(p); toast.success(`${p.name} adăugat în coș`); }}>
                  Adaugă
                </HDButton>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Cart */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <ScallopedFrame variant="rect" className="aspect-[1/1.2]">
          <div className="absolute inset-0 p-5 flex flex-col">
            <div className="flex items-center gap-2">
              <ShoppingBasket className="h-5 w-5 text-primary" />
              <p className="font-script text-2xl text-primary leading-none">Coșul tău</p>
            </div>
            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
                <img src={tools.wateringcan2} alt="" className="h-24 opacity-70" />
                <p className="font-script text-xl text-primary mt-2">Coșul doarme...</p>
                <p className="text-xs text-muted-foreground">Pune ceva drăguț în el.</p>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-auto mt-3 space-y-2">
                  {items.map(i => (
                    <div key={i.product.id} className="flex items-center gap-2 bg-paper rounded-lg p-2 border border-primary/15">
                      <img src={i.product.icon} alt="" className="h-9 w-9 object-contain" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-display font-semibold truncate">{i.product.name}</p>
                        <p className="text-[11px] text-muted-foreground">{i.qty} × {i.product.price} MDL</p>
                      </div>
                      <button onClick={() => remove(i.product.id)} className="text-brown press p-1" aria-label="Scoate">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="border-t border-primary/30 pt-3 mt-3">
                  <div className="flex justify-between font-display font-bold">
                    <span>Total</span><span className="text-primary">{total} MDL</span>
                  </div>
                  <HDButton iconLeft={tools.bag} className="w-full justify-center mt-3" onClick={() => { toast.success("Comandă plasată! 🌿"); clear(); }}>
                    Comandă
                  </HDButton>
                </div>
              </>
            )}
          </div>
        </ScallopedFrame>
      </aside>
    </div>
  );
};

export default Marketplace;
