import { useEffect, useMemo, useState } from "react";
import { Leaf, Sun, Clock, Coins, Search } from "lucide-react";
import { CULTURES, type Culture } from "@/data/mock";
import { CardGridSkeleton } from "@/components/dashboard";

type Category = Culture["category"] | "all";
type Season = Culture["season"] | "all";

const CATEGORIES: Category[] = ["all", "Legume", "Verdețuri", "Rădăcinoase", "Cereale", "Fructe"];
const SEASONS: Season[] = ["all", "Primăvară", "Vară", "Toamnă"];

const PRICE_OPTIONS = [
  { label: "Orice preț", value: 9999 },
  { label: "până la 100 MDL/ar", value: 100 },
  { label: "până la 150 MDL/ar", value: 150 },
  { label: "până la 200 MDL/ar", value: 200 },
];

const Cultures = () => {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState<Category>("all");
  const [season, setSeason] = useState<Season>("all");
  const [maxPrice, setMaxPrice] = useState(9999);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(
    () =>
      CULTURES.filter(c =>
        (category === "all" || c.category === category) &&
        (season === "all" || c.season === season) &&
        c.pricePerAre <= maxPrice &&
        (q.trim() === "" || c.name.toLowerCase().includes(q.trim().toLowerCase()))
      ),
    [q, category, season, maxPrice]
  );

  const reset = () => { setQ(""); setCategory("all"); setSeason("all"); setMaxPrice(9999); };

  return (
    <div className="container py-12 lg:py-16">
      {/* Header */}
      <header className="mb-8">
        <p className="eyebrow">Catalog</p>
        <h1 className="mt-3 font-display text-4xl md:text-5xl text-primary-deep font-normal leading-tight">
          Culturi de plantat
        </h1>
        <p className="text-sm text-muted-foreground mt-2 font-ui">
          Alege ce vrei să crească pe lotul tău · {filtered.length} culturi
        </p>
      </header>

      {/* Filter bar */}
      <div className="bg-card border border-border rounded-xl p-5 md:p-6 shadow-sm mb-10">
        <div className="grid md:grid-cols-[1.4fr_1fr_1fr_1fr_auto] gap-4 md:gap-5 items-end">
          <FilterField icon={<Search className="h-3.5 w-3.5 text-primary" />} label="Caută">
            <input
              type="text"
              value={q}
              onChange={e => setQ(e.target.value)}
              placeholder="ex: roșii, morcov…"
              className="filter-select"
            />
          </FilterField>

          <FilterField icon={<Leaf className="h-3.5 w-3.5 text-primary" />} label="Categorie">
            <select value={category} onChange={e => setCategory(e.target.value as Category)} className="filter-select">
              {CATEGORIES.map(c => <option key={c} value={c}>{c === "all" ? "Toate" : c}</option>)}
            </select>
          </FilterField>

          <FilterField icon={<Sun className="h-3.5 w-3.5 text-primary" />} label="Sezon">
            <select value={season} onChange={e => setSeason(e.target.value as Season)} className="filter-select">
              {SEASONS.map(s => <option key={s} value={s}>{s === "all" ? "Toate" : s}</option>)}
            </select>
          </FilterField>

          <FilterField icon={<Coins className="h-3.5 w-3.5 text-primary" />} label="Preț maxim">
            <select value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))} className="filter-select">
              {PRICE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </FilterField>

          <button
            onClick={reset}
            className="press inline-flex items-center justify-center h-11 px-5 rounded-md bg-paper border border-border text-primary-deep hover:bg-paper/70 font-display text-sm"
          >
            Resetează
          </button>
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <CardGridSkeleton count={8} />
      ) : filtered.length === 0 ? (
        <div className="rounded-xl border border-border p-12 text-center bg-paper/40">
          <p className="font-display text-xl text-primary-deep">Nicio cultură nu se potrivește</p>
          <p className="text-sm text-muted-foreground mt-2 mb-5">Schimbă filtrele pentru a vedea mai multe rezultate.</p>
          <button onClick={reset} className="press inline-flex items-center justify-center h-10 px-5 rounded-md bg-primary text-primary-foreground hover:bg-primary-deep font-display text-sm">
            Resetează filtrele
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map(c => (
            <CultureItem key={c.id} c={c} />
          ))}
        </div>
      )}
    </div>
  );
};

const CultureItem = ({ c }: { c: Culture }) => (
  <article className="group relative flex flex-col bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:border-primary/40 transition-all">
    <div className="relative h-44 bg-paper/60 flex items-center justify-center overflow-hidden">
      <img
        src={c.icon}
        alt={c.name}
        loading="lazy"
        className="h-32 w-32 object-contain group-hover:scale-105 transition-transform duration-500"
      />
      <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-cream-soft/95 border border-border text-[10px] uppercase tracking-widest font-ui text-primary-deep">
        <Leaf className="h-3 w-3 text-primary" />{c.category}
      </span>
      <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary text-primary-foreground text-[10px] uppercase tracking-widest font-ui">
        {c.season}
      </span>
    </div>

    <div className="p-5 flex flex-col flex-1">
      <h3 className="font-display text-xl text-primary-deep leading-tight">{c.name}</h3>
      <p className="mt-1.5 font-ui text-sm text-muted-foreground line-clamp-2">{c.description}</p>

      <dl className="mt-4 grid grid-cols-3 gap-2 font-ui text-[11px] text-muted-foreground">
        <div className="rounded-md bg-paper/60 border border-border px-2 py-1.5 text-center">
          <dt className="uppercase tracking-wider">Preț</dt>
          <dd className="font-display text-sm text-primary-deep mt-0.5">{c.pricePerAre} MDL</dd>
        </div>
        <div className="rounded-md bg-paper/60 border border-border px-2 py-1.5 text-center">
          <dt className="uppercase tracking-wider">Ciclu</dt>
          <dd className="font-display text-sm text-primary-deep mt-0.5">{c.cycleDays} zile</dd>
        </div>
        <div className="rounded-md bg-paper/60 border border-border px-2 py-1.5 text-center">
          <dt className="uppercase tracking-wider">Recoltă</dt>
          <dd className="font-display text-sm text-primary-deep mt-0.5">{c.yieldKgPerAre} kg</dd>
        </div>
      </dl>

      <div className="mt-5 pt-4 border-t border-border flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 text-xs font-ui text-brown">
          <Clock className="h-3.5 w-3.5 text-primary" strokeWidth={1.8} />
          {Math.round(c.cycleDays / 7)} săpt. până la recoltă
        </span>
        <span className="font-display text-sm text-primary group-hover:translate-x-0.5 transition-transform">
          Plantează →
        </span>
      </div>
    </div>
  </article>
);

const FilterField = ({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) => (
  <div>
    <label className="flex items-center gap-1.5 font-ui text-[11px] uppercase tracking-widest text-primary-deep mb-2">
      {icon} {label}
    </label>
    {children}
  </div>
);

export default Cultures;
