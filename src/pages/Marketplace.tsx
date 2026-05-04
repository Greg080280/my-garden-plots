import { useEffect, useMemo, useState } from "react";
import { Trash2 } from "lucide-react";
import { PRODUCTS, type Product } from "@/data/mock";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { Botanical, type BotanicalCategory } from "@/components/decor/Botanical";
import { EmptyState, CardGridSkeleton, LoadingState } from "@/components/dashboard";

const CATS: (Product["category"] | "Toate")[] = ["Toate", "Răsaduri", "Semințe", "Unelte", "Îngrășăminte"];

/** Map a product to one of the hand-drawn gallery illustrations. */
const productArt = (p: Product): { cat: BotanicalCategory; slug: string } => {
  const n = p.name.toLowerCase();
  if (n.includes("roșii") || n.includes("roşii"))  return { cat: "vegetables", slug: "tomato" };
  if (n.includes("ardei"))                          return { cat: "vegetables", slug: "pepper" };
  if (n.includes("vinete"))                         return { cat: "vegetables", slug: "eggplant" };
  if (n.includes("varză") || n.includes("varza"))   return { cat: "vegetables", slug: "cabbage" };
  if (n.includes("morcov"))                         return { cat: "vegetables", slug: "carrot" };
  if (n.includes("castrave"))                       return { cat: "vegetables", slug: "cucumber" };
  if (n.includes("porumb"))                         return { cat: "vegetables", slug: "corn" };
  if (n.includes("sap") || n.includes("hârleț"))    return { cat: "tools", slug: "trowel" };
  if (n.includes("stropit"))                        return { cat: "tools", slug: "watering-can" };
  if (n.includes("mănuș") || n.includes("manus"))   return { cat: "tools", slug: "garden-gloves" };
  if (n.includes("compost") || n.includes("îngr") || n.includes("cenuș"))
                                                    return { cat: "decor", slug: "seed-packet" };
  if (p.category === "Semințe")                     return { cat: "decor", slug: "seed-packet" };
  if (p.category === "Răsaduri")                    return { cat: "flowers", slug: "seedling" };
  if (p.category === "Unelte")                      return { cat: "tools", slug: "trowel" };
  return { cat: "flowers", slug: "leaf-sprig" };
};

const Marketplace = () => {
  const [cat, setCat] = useState<Product["category"] | "Toate">("Toate");
  const { items, add, remove, total, clear } = useCart();
  const list = useMemo(() => cat === "Toate" ? PRODUCTS : PRODUCTS.filter(p => p.category === cat), [cat]);

  return (
    <div className="container py-16 grid lg:grid-cols-[1fr_320px] gap-16">
      <section>
        <header className="pb-8 mb-10 border-b border-border/70">
          <p className="eyebrow">Pentru grădina ta</p>
          <h1 className="mt-3 font-display text-4xl md:text-5xl text-primary-deep font-normal leading-[1.1]">
            Magazin
          </h1>
        </header>

        {/* Category tabs — editorial chips */}
        <div className="flex flex-wrap items-center gap-1 mb-12 border-b border-border/70 pb-4">
          {CATS.map(c => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`press px-4 h-9 font-ui text-[11px] uppercase tracking-widest transition-colors ${
                cat === c
                  ? "text-primary-deep border-b-2 border-primary -mb-[17px] pb-4"
                  : "text-muted-foreground hover:text-primary-deep"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">
          {list.map(p => {
            const art = productArt(p);
            return (
            <article key={p.id} className="editorial-card overflow-hidden flex flex-col">
              <div className="img-zoom aspect-square bg-paper border-b border-border/60 grid place-items-center overflow-hidden p-10">
                <Botanical cat={art.cat} slug={art.slug} className="w-full h-full text-primary-deep" title={p.name} />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <p className="eyebrow text-[10px]">{p.category}</p>
                <h3 className="mt-2 font-display text-lg text-primary-deep leading-tight">{p.name}</h3>
                <p className="text-sm text-muted-foreground mt-1.5 flex-1">{p.description}</p>
                <div className="mt-5 pt-4 border-t border-border/60 flex items-center justify-between">
                  <span className="font-display text-base text-primary-deep">
                    {p.price} <span className="font-ui text-xs text-muted-foreground tracking-wide">MDL</span>
                  </span>
                  <button
                    onClick={() => { add(p); toast.success(`${p.name}`, { description: "Adăugat în coș" }); }}
                    className="press font-ui text-[11px] uppercase tracking-widest text-primary-deep link-underline"
                  >
                    Adaugă
                  </button>
                </div>
              </div>
            </article>
            );
          })}
        </div>
      </section>

      {/* Cart */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <p className="eyebrow">Coș</p>
        <h2 className="mt-3 font-display text-2xl text-primary-deep font-normal mb-6">Comanda ta</h2>
        {items.length === 0 ? (
          <div className="border-y border-border/70 py-16 text-center">
            <p className="font-display italic text-lg text-muted-foreground">Coșul e gol.</p>
            <p className="font-ui text-xs text-muted-foreground tracking-wide mt-2 uppercase">Adaugă ceva din stânga</p>
          </div>
        ) : (
          <>
            <ul className="border-y border-border/70 max-h-[420px] overflow-auto">
              {items.map(i => (
                <li key={i.product.id} className="flex items-center gap-3 py-3 border-b border-border/40 last:border-0">
                  <img src={i.product.icon} alt="" className="h-10 w-10 object-contain shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-display text-sm text-primary-deep truncate">{i.product.name}</p>
                    <p className="font-ui text-[11px] text-muted-foreground tracking-wide mt-0.5">{i.qty} × {i.product.price} MDL</p>
                  </div>
                  <button onClick={() => remove(i.product.id)} className="text-brown press p-1" aria-label="Scoate">
                    <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                </li>
              ))}
            </ul>
            <div className="pt-5 mt-5 flex justify-between items-baseline">
              <span className="font-ui text-[11px] uppercase tracking-widest text-primary-deep">Total</span>
              <span className="font-display text-2xl text-primary-deep">
                {total} <span className="font-ui text-xs text-muted-foreground tracking-wide">MDL</span>
              </span>
            </div>
            <button
              onClick={() => { toast.success("Comandă plasată"); clear(); }}
              className="press w-full mt-6 h-12 rounded-md bg-primary text-primary-foreground hover:bg-primary-deep font-display text-[15px]"
            >
              Comandă
            </button>
          </>
        )}
      </aside>
    </div>
  );
};

export default Marketplace;
