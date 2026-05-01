import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { LayoutGrid, Map as MapIcon, Search } from "lucide-react";
import { LANDS, type Region } from "@/data/mock";
import { Slider } from "@/components/ui/slider";

const REGIONS: Region[] = ["Chișinău", "Cahul", "Bălți", "Orhei", "Ungheni", "Soroca", "Dubăsari", "Călărași"];

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
  const [view, setView] = useState<"grid" | "map">("grid");
  const [q, setQ] = useState("");
  const [regions, setRegions] = useState<Set<Region>>(new Set());
  const [maxPrice, setMaxPrice] = useState(400);

  const filtered = useMemo(
    () => LANDS.filter(l =>
      (q === "" || l.name.toLowerCase().includes(q.toLowerCase()) || l.village.toLowerCase().includes(q.toLowerCase())) &&
      (regions.size === 0 || regions.has(l.region)) &&
      l.pricePerAre <= maxPrice
    ),
    [q, regions, maxPrice]
  );

  const toggle = (r: Region) => {
    const n = new Set(regions);
    n.has(r) ? n.delete(r) : n.add(r);
    setRegions(n);
  };

  const reset = () => { setQ(""); setRegions(new Set()); setMaxPrice(400); };
  const uniqueRegions = new Set(filtered.map(l => l.region)).size;

  return (
    <div className="container py-16 lg:py-20">
      {/* Header */}
      <header className="mb-14 flex items-end justify-between flex-wrap gap-6 pb-8 border-b border-border/70">
        <div>
          <p className="eyebrow">Explorează</p>
          <h1 className="mt-3 font-display text-4xl md:text-5xl text-primary-deep font-normal leading-tight">
            Loturi disponibile
          </h1>
          <p className="text-sm text-muted-foreground mt-2 font-ui">
            {filtered.length} loturi · {uniqueRegions} regiuni
          </p>
        </div>

        <div className="inline-flex items-center gap-1 font-ui text-[11px] uppercase tracking-widest">
          <button
            onClick={() => setView("grid")}
            className={`press inline-flex items-center gap-1.5 px-3 h-8 ${view === "grid" ? "text-primary-deep border-b border-primary" : "text-muted-foreground hover:text-primary-deep"}`}
          >
            <LayoutGrid className="h-3.5 w-3.5" strokeWidth={1.5} /> Grilă
          </button>
          <button
            onClick={() => setView("map")}
            className={`press inline-flex items-center gap-1.5 px-3 h-8 ${view === "map" ? "text-primary-deep border-b border-primary" : "text-muted-foreground hover:text-primary-deep"}`}
          >
            <MapIcon className="h-3.5 w-3.5" strokeWidth={1.5} /> Hartă
          </button>
        </div>
      </header>

      <div className="grid lg:grid-cols-[240px_1fr] gap-12">
        {/* Sidebar — editorial form, no boxes */}
        <aside className="space-y-10">
          <div>
            <label className="block font-ui text-[11px] uppercase tracking-widest text-primary-deep mb-3">Caută</label>
            <div className="relative">
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
              <input
                value={q}
                onChange={e => setQ(e.target.value)}
                placeholder="Lot sau sat..."
                className="w-full bg-transparent border-0 border-b border-border focus:border-primary focus:outline-none pl-7 pb-2 font-display text-[15px] placeholder:text-muted-foreground/60"
              />
            </div>
          </div>

          <div>
            <h3 className="font-ui text-[11px] uppercase tracking-widest text-primary-deep mb-4">Regiunea</h3>
            <ul className="space-y-2.5">
              {REGIONS.map(r => (
                <li key={r}>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <span className={`h-4 w-4 border border-border grid place-items-center transition-colors ${regions.has(r) ? "bg-primary border-primary" : "group-hover:border-primary"}`}>
                      {regions.has(r) && <span className="block w-2 h-2 bg-primary-foreground" />}
                    </span>
                    <span className="font-display text-[15px] text-foreground/85">{r}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className="hairline pt-8">
            <h3 className="font-ui text-[11px] uppercase tracking-widest text-primary-deep mb-2">Preț maxim</h3>
            <p className="font-display text-sm text-foreground/70 mb-4">
              până la <span className="text-primary-deep">{maxPrice} MDL/ar</span>
            </p>
            <Slider value={[maxPrice]} onValueChange={([v]) => setMaxPrice(v)} min={200} max={400} step={20} />
          </div>

          <div className="hairline pt-8 flex items-center gap-6 font-ui text-xs">
            <button onClick={reset} className="text-muted-foreground hover:text-primary-deep link-underline">
              Resetează
            </button>
          </div>

          <p className="hairline pt-8 font-display italic text-sm text-muted-foreground leading-relaxed">
            Loturile mai mici (sub 1.5 ha) sunt potrivite pentru începători. Pentru familii, alege un lot cu apă pe loc.
          </p>
        </aside>

        {/* Results */}
        <section>
          {view === "grid" ? (
            filtered.length === 0 ? (
              <div className="text-center py-32 border border-dashed border-border rounded-md">
                <p className="font-display text-2xl text-primary-deep italic">Niciun lot nu se potrivește.</p>
                <p className="text-sm text-muted-foreground mt-2 font-ui">Schimbă filtrele și încearcă din nou.</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {filtered.map(land => (
                  <Link key={land.id} to={`/lands/${land.id}`} className="group editorial-card overflow-hidden">
                    <div className="img-zoom aspect-[4/3] overflow-hidden">
                      <img src={land.photo} alt={land.name} loading="lazy" className="w-full h-full object-cover" />
                    </div>
                    <div className="p-7">
                      <div className="flex items-center justify-between gap-3">
                        <p className="eyebrow text-[10px]">{land.region}</p>
                        <span className="font-ui text-[10px] uppercase tracking-widest text-muted-foreground bg-paper px-2 py-0.5 rounded">
                          {land.availablePlots}/{land.totalPlots} libere
                        </span>
                      </div>
                      <h3 className="mt-3 font-display text-[22px] text-primary-deep leading-tight group-hover:text-primary transition-colors">
                        {land.name}
                      </h3>
                      <p className="mt-1.5 text-sm text-muted-foreground">{land.features[0]} · {land.size} ha</p>
                      <div className="mt-6 pt-5 border-t border-border/60 flex items-center justify-between font-display">
                        <span className="text-base text-primary-deep">
                          {land.pricePerAre} <span className="font-ui text-xs text-muted-foreground tracking-wide">MDL/AR</span>
                        </span>
                        <span className="font-ui text-xs text-brown">{land.village}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )
          ) : (
            <div className="rounded-md overflow-hidden border border-border h-[640px]">
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
        </section>
      </div>
    </div>
  );
};

export default Lands;
