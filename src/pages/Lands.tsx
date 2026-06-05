import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { MapPin, Coins, Ruler, Sprout } from "lucide-react";
import { LANDS, type Region } from "@/data/mock";
import { CardGridSkeleton, LoadingState } from "@/components/dashboard";

const REGIONS: Region[] = ["Chișinău", "Cahul", "Bălți", "Orhei", "Ungheni", "Soroca", "Dubăsari", "Călărași"];

const PRICE_OPTIONS = [
  { label: "Orice preț", value: 999 },
  { label: "până la 250 MDL/ar", value: 250 },
  { label: "până la 300 MDL/ar", value: 300 },
  { label: "până la 350 MDL/ar", value: 350 },
  { label: "până la 400 MDL/ar", value: 400 },
];

const SIZE_OPTIONS = [
  { label: "Orice suprafață", value: 999 },
  { label: "sub 1 ha", value: 1 },
  { label: "sub 2 ha", value: 2 },
  { label: "sub 5 ha", value: 5 },
];

const pinIcon = L.divIcon({
  className: "",
  html: `<svg width="28" height="36" viewBox="0 0 28 36" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 1 C 6 1 1 7 1 14 C 1 24 14 35 14 35 C 14 35 27 24 27 14 C 27 7 22 1 14 1 Z"
      fill="hsl(100,22%,27%)" stroke="hsl(100,22%,14%)" stroke-width="1"/>
    <circle cx="14" cy="14" r="4" fill="hsl(44,47%,91%)"/>
  </svg>`,
  iconSize: [28, 36], iconAnchor: [14, 35], popupAnchor: [0, -32],
});

const Lands = () => {
  const [region, setRegion] = useState<Region | "all">("all");
  const [maxPrice, setMaxPrice] = useState(999);
  const [maxSize, setMaxSize] = useState(999);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(
    () => LANDS.filter(l =>
      (region === "all" || l.region === region) &&
      l.pricePerAre <= maxPrice &&
      l.size <= maxSize
    ),
    [region, maxPrice, maxSize]
  );

  const reset = () => { setRegion("all"); setMaxPrice(999); setMaxSize(999); };

  return (
    <div className="container py-12 lg:py-16">
      {/* Header */}
      <header className="mb-8">
        <p className="eyebrow">Explorează</p>
        <h1 className="mt-3 font-display text-4xl md:text-5xl text-primary-deep font-normal leading-tight">
          Terenuri disponibile
        </h1>
        <p className="text-sm text-muted-foreground mt-2 font-ui">
          Alege terenul potrivit pentru grădina ta · {filtered.length} loturi
        </p>
      </header>

      {/* Horizontal filter bar */}
      <div className="bg-card border border-border rounded-xl p-5 md:p-6 shadow-sm mb-10">
        <div className="grid md:grid-cols-[1fr_1fr_1fr_auto_auto] gap-4 md:gap-5 items-end">
          <FilterField icon={<MapPin className="h-3.5 w-3.5 text-primary" />} label="Regiune">
            <select
              value={region}
              onChange={e => setRegion(e.target.value as Region | "all")}
              className="filter-select"
            >
              <option value="all">Toate</option>
              {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </FilterField>

          <FilterField icon={<Coins className="h-3.5 w-3.5 text-primary" />} label="Preț maxim">
            <select
              value={maxPrice}
              onChange={e => setMaxPrice(Number(e.target.value))}
              className="filter-select"
            >
              {PRICE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </FilterField>

          <FilterField icon={<Ruler className="h-3.5 w-3.5 text-primary" />} label="Suprafață lot">
            <select
              value={maxSize}
              onChange={e => setMaxSize(Number(e.target.value))}
              className="filter-select"
            >
              {SIZE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </FilterField>

          <button
            onClick={() => {/* filters already live */}}
            className="press inline-flex items-center justify-center h-11 px-6 rounded-md bg-primary text-primary-foreground hover:bg-primary-deep font-display text-sm"
          >
            Aplică filtre
          </button>
          <button
            onClick={reset}
            className="press inline-flex items-center justify-center h-11 px-5 rounded-md bg-paper border border-border text-primary-deep hover:bg-paper/70 font-display text-sm"
          >
            Resetează
          </button>
        </div>
      </div>

      {/* Map + list split */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Map */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          {loading ? (
            <div className="rounded-xl border border-border h-[640px] grid place-items-center bg-paper/40">
              <LoadingState cat="decor" slug="garden-door" label="Se desenează harta" size="lg" />
            </div>
          ) : (
            <div className="rounded-xl overflow-hidden border border-border h-[640px] shadow-sm">
              <MapContainer center={[47.0, 28.5]} zoom={7} className="h-full w-full">
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap" />
                {filtered.map(l => (
                  <Marker key={l.id} position={l.coords} icon={pinIcon}>
                    <Popup>
                      <div className="space-y-1 min-w-[180px]">
                        <p className="font-display text-lg text-primary-deep leading-tight">{l.name}</p>
                        <p className="text-xs text-muted-foreground">{l.village}, {l.region}</p>
                        <p className="font-display text-sm text-primary-deep mt-1">{l.pricePerAre} MDL/ar</p>
                        <Link to={`/lands/${l.id}`} className="text-xs text-primary font-display link-underline">
                          Vezi lotul →
                        </Link>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          )}
        </div>

        {/* List */}
        <div>
          {loading ? (
            <CardGridSkeleton count={3} />
          ) : filtered.length === 0 ? (
            <div className="rounded-xl border border-border p-12 text-center bg-paper/40">
              <p className="font-display text-xl text-primary-deep">Niciun lot nu se potrivește</p>
              <p className="text-sm text-muted-foreground mt-2 mb-5">Schimbă filtrele pentru a vedea mai multe rezultate.</p>
              <button onClick={reset} className="press inline-flex items-center justify-center h-10 px-5 rounded-md bg-primary text-primary-foreground hover:bg-primary-deep font-display text-sm">
                Resetează filtrele
              </button>
            </div>
          ) : (
            <div className="space-y-5 max-h-[640px] overflow-y-auto pr-2 lands-scroll">
              {filtered.map(land => (
                <Link
                  key={land.id}
                  to={`/lands/${land.id}`}
                  className="group block bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="grid grid-cols-[140px_1fr] sm:grid-cols-[180px_1fr] gap-0">
                    <div className="img-zoom overflow-hidden">
                      <img src={land.photo} alt={land.name} loading="lazy" className="w-full h-full object-cover" />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-1.5 text-xs">
                        <MapPin className="h-3 w-3 text-primary" strokeWidth={2} />
                        <span className="font-ui text-muted-foreground">{land.village}, {land.region}</span>
                      </div>
                      <h3 className="mt-1.5 font-display text-xl text-primary-deep leading-tight group-hover:text-primary transition-colors">
                        {land.name}
                      </h3>
                      <p className="mt-2 font-display text-sm text-foreground/75">
                        {(land.size * 10000).toLocaleString()} m² · {land.pricePerAre.toFixed(2)} MDL/m²
                      </p>
                      <div className="mt-3 flex items-center justify-between gap-3">
                        <span className="inline-flex items-center gap-1.5 text-xs font-ui text-brown">
                          <Sprout className="h-3.5 w-3.5 text-primary" strokeWidth={1.8} />
                          {land.availablePlots} loturi disponibile
                        </span>
                        <span className="font-display text-sm text-primary group-hover:translate-x-0.5 transition-transform">
                          Vezi detalii →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
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

export default Lands;
