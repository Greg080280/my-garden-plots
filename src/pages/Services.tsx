import { useEffect, useMemo, useState } from "react";
import { Search, Wrench, Coins, User } from "lucide-react";
import { SERVICES, COMPANIES, type Service } from "@/data/mock";
import { CardGridSkeleton } from "@/components/dashboard";
import { BotanicalSVG } from "@/components/decor/BotanicalSVG";

const FARMER_NAMES: Record<string, string> = {
  "u-ion": "AgroSat",
  "u-maria": "Grădina Bio",
  "u-petru": "Codru Farm",
};

const FARMER_OPTIONS = ["all", "u-ion", "u-maria", "u-petru"];

const PRICE_OPTIONS = [
  { label: "Orice preț", value: 9999 },
  { label: "până la 100 MDL", value: 100 },
  { label: "până la 200 MDL", value: 200 },
  { label: "până la 300 MDL", value: 300 },
];

const Services = () => {
  const [q, setQ] = useState("");
  const [farmer, setFarmer] = useState<string>("all");
  const [maxPrice, setMaxPrice] = useState(9999);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(
    () =>
      SERVICES.filter(s =>
        (farmer === "all" || s.farmerId === farmer) &&
        s.price <= maxPrice &&
        (q.trim() === "" || s.name.toLowerCase().includes(q.trim().toLowerCase()))
      ),
    [q, farmer, maxPrice]
  );

  const reset = () => { setQ(""); setFarmer("all"); setMaxPrice(9999); };

  return (
    <div className="relative overflow-hidden">
      {/* Watermarks — gardening tools theme */}
      <BotanicalSVG
        name="gallery/tools/watering-can"
        className="pointer-events-none absolute -top-12 -right-20 w-[26rem] h-[26rem] text-primary/[0.07] rotate-12"
      />
      <BotanicalSVG
        name="gallery/tools/wheelbarrow"
        className="pointer-events-none absolute -bottom-20 -left-24 w-[28rem] h-[28rem] text-primary/[0.06] -rotate-6"
      />
      <BotanicalSVG
        name="gallery/tools/rake"
        className="pointer-events-none absolute top-[40%] right-[8%] w-48 h-48 text-primary/[0.06] rotate-6"
      />
      <BotanicalSVG
        name="gallery/tools/shovel"
        className="pointer-events-none absolute bottom-[20%] left-[45%] w-44 h-44 text-primary/[0.05] -rotate-12"
      />

      <div className="container py-12 lg:py-16 relative">
        {/* Header */}
        <header className="mb-8">
          <p className="eyebrow">Catalog</p>
          <h1 className="mt-3 font-display text-4xl md:text-5xl text-primary-deep font-normal leading-tight">
            Servicii agricole
          </h1>
          <p className="text-sm text-muted-foreground mt-2 font-ui">
            De la arat până la recoltat · {filtered.length} servicii
          </p>
        </header>

        {/* Filter bar */}
        <div className="bg-card border border-border rounded-xl p-5 md:p-6 shadow-sm mb-10">
          <div className="grid md:grid-cols-[1.6fr_1fr_1fr_auto] gap-4 md:gap-5 items-end">
            <FilterField icon={<Search className="h-3.5 w-3.5 text-primary" />} label="Caută">
              <input
                type="text"
                value={q}
                onChange={e => setQ(e.target.value)}
                placeholder="ex: arat, plantare, udat…"
                className="filter-select"
              />
            </FilterField>

            <FilterField icon={<User className="h-3.5 w-3.5 text-primary" />} label="Fermier">
              <select value={farmer} onChange={e => setFarmer(e.target.value)} className="filter-select">
                {FARMER_OPTIONS.map(f => (
                  <option key={f} value={f}>{f === "all" ? "Toți" : FARMER_NAMES[f]}</option>
                ))}
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
            <p className="font-display text-xl text-primary-deep">Niciun serviciu nu se potrivește</p>
            <p className="text-sm text-muted-foreground mt-2 mb-5">Schimbă filtrele pentru a vedea mai multe rezultate.</p>
            <button onClick={reset} className="press inline-flex items-center justify-center h-10 px-5 rounded-md bg-primary text-primary-foreground hover:bg-primary-deep font-display text-sm">
              Resetează filtrele
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(s => (
              <ServiceItem key={s.id} s={s} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const ServiceItem = ({ s }: { s: Service }) => {
  const company = COMPANIES.find(c => c.farmerId === s.farmerId);

  return (
    <article className="group relative flex flex-col bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:border-primary/40 transition-all">
      <div className="relative h-44 bg-paper/60 flex items-center justify-center overflow-hidden">
        <img
          src={s.icon}
          alt={s.name}
          loading="lazy"
          className="h-32 w-32 object-contain group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-cream-soft/95 border border-border text-[10px] uppercase tracking-widest font-ui text-primary-deep">
          <Wrench className="h-3 w-3 text-primary" />Serviciu
        </span>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display text-xl text-primary-deep leading-tight">{s.name}</h3>
        <p className="mt-1.5 font-ui text-sm text-muted-foreground line-clamp-2">{s.description}</p>

        <dl className="mt-4 grid grid-cols-2 gap-2 font-ui text-[11px] text-muted-foreground">
          <div className="rounded-md bg-paper/60 border border-border px-2 py-1.5 text-center">
            <dt className="uppercase tracking-wider">Preț</dt>
            <dd className="font-display text-sm text-primary-deep mt-0.5">{s.price} MDL</dd>
          </div>
          <div className="rounded-md bg-paper/60 border border-border px-2 py-1.5 text-center">
            <dt className="uppercase tracking-wider">Unitate</dt>
            <dd className="font-display text-sm text-primary-deep mt-0.5">{s.unit}</dd>
          </div>
        </dl>

        <div className="mt-5 pt-4 border-t border-border flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-xs font-ui text-brown">
            <User className="h-3.5 w-3.5 text-primary" strokeWidth={1.8} />
            {company?.name ?? FARMER_NAMES[s.farmerId]}
          </span>
          <span className="font-display text-sm text-primary group-hover:translate-x-0.5 transition-transform">
            Comandă →
          </span>
        </div>
      </div>
    </article>
  );
};

const FilterField = ({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) => (
  <div>
    <label className="flex items-center gap-1.5 font-ui text-[11px] uppercase tracking-widest text-primary-deep mb-2">
      {icon} {label}
    </label>
    {children}
  </div>
);

export default Services;
