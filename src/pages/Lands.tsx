import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { LayoutGrid, Map as MapIcon, MapPin, Search } from "lucide-react";
import { LANDS, type Region } from "@/data/mock";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { tools, veg } from "@/assets";

const REGIONS: Region[] = ["Chișinău", "Cahul", "Bălți", "Orhei", "Ungheni", "Soroca"];

// Custom olive teardrop pin
const pinIcon = L.divIcon({
  className: "",
  html: `<svg width="34" height="42" viewBox="0 0 34 42" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 1 C 7 1 1 9 1 18 C 1 30 17 41 17 41 C 17 41 33 30 33 18 C 33 9 27 1 17 1 Z"
      fill="hsl(90,30%,43%)" stroke="hsl(95,30%,21%)" stroke-width="1.5"/>
    <circle cx="17" cy="17" r="6" fill="hsl(42,55%,96%)"/>
  </svg>`,
  iconSize: [34, 42], iconAnchor: [17, 41], popupAnchor: [0, -36],
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

  return (
    <div className="container py-10">
      <header className="mb-8 flex items-end justify-between flex-wrap gap-4">
        <div>
          <p className="font-script text-3xl text-primary">Pământ pentru tine</p>
          <h1 className="font-display text-4xl font-bold">Loturi disponibile</h1>
          <p className="text-muted-foreground mt-1">{filtered.length} loturi în Moldova</p>
        </div>

        <div className="inline-flex bg-paper border border-primary/30 rounded-full p-1">
          <button onClick={() => setView("grid")} className={`px-4 h-9 rounded-full text-sm font-display font-semibold inline-flex items-center gap-2 ${view==="grid"?"bg-primary text-primary-foreground":"text-foreground"}`}>
            <LayoutGrid className="h-4 w-4" /> Grilă
          </button>
          <button onClick={() => setView("map")} className={`px-4 h-9 rounded-full text-sm font-display font-semibold inline-flex items-center gap-2 ${view==="map"?"bg-primary text-primary-foreground":"text-foreground"}`}>
            <MapIcon className="h-4 w-4" /> Hartă
          </button>
        </div>
      </header>

      <div className="grid lg:grid-cols-[260px_1fr] gap-8">
        {/* Sidebar filters */}
        <aside className="space-y-4">
          <div className="bg-card border border-primary/25 rounded-2xl p-4 shadow-paper">
            <label className="font-display font-bold text-sm mb-2 inline-flex items-center gap-2">
              <Search className="h-4 w-4 text-primary" /> Caută
            </label>
            <Input value={q} onChange={e => setQ(e.target.value)} placeholder="Numele lotului sau satul..." className="rounded-xl bg-background border-primary/30" />
          </div>

          <div className="bg-card border border-primary/25 rounded-2xl p-4 shadow-paper">
            <h3 className="font-display font-bold text-sm mb-3">Regiunea</h3>
            <div className="flex flex-wrap gap-2">
              {REGIONS.map(r => (
                <button key={r} onClick={() => toggle(r)} className={`text-xs font-display font-medium px-3 py-1.5 rounded-full border transition-colors ${regions.has(r) ? "bg-primary text-primary-foreground border-primary" : "bg-paper border-primary/30 hover:bg-accent"}`}>
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-card border border-primary/25 rounded-2xl p-4 shadow-paper">
            <h3 className="font-display font-bold text-sm mb-1">Preț maxim</h3>
            <p className="text-xs text-muted-foreground mb-3">până la <strong>{maxPrice} MDL/ar</strong></p>
            <Slider value={[maxPrice]} onValueChange={([v]) => setMaxPrice(v)} min={200} max={400} step={20} />
          </div>

          <div className="relative bg-accent/40 border border-primary/25 rounded-2xl p-4 overflow-hidden">
            <img src={tools.wateringcan} alt="" className="absolute -right-3 -bottom-3 h-24 opacity-80" />
            <p className="font-script text-2xl text-primary leading-tight pr-10">Nu știi de unde să începi?</p>
            <p className="text-xs text-muted-foreground mt-1 pr-10">Loturile mici sunt potrivite pentru începători.</p>
          </div>
        </aside>

        <section>
          {view === "grid" ? (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map(land => (
                <Link key={land.id} to={`/lands/${land.id}`} className="group">
                  <article className="bg-card rounded-2xl overflow-hidden shadow-card border border-primary/20 transition-transform group-hover:scale-[1.02]">
                    <div className="relative">
                      <img src={land.photo} alt={land.name} loading="lazy" className="aspect-[4/3] w-full object-cover" />
                      <div className="absolute top-3 left-3 bg-paper/95 backdrop-blur rounded-full px-3 py-1 text-xs font-display font-semibold text-primary border border-primary/30">
                        {land.availablePlots}/{land.totalPlots} loturi libere
                      </div>
                      <img src={veg.tomatoes} alt="" className="absolute -bottom-3 -right-2 h-14 opacity-90" />
                    </div>
                    <div className="p-5">
                      <h3 className="font-script text-3xl text-primary leading-tight">{land.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1 inline-flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" /> {land.village}, {land.region}
                      </p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="font-display font-bold text-primary-deep">
                          {land.pricePerAre} <span className="text-xs text-muted-foreground font-normal">MDL/ar</span>
                        </span>
                        <span className="text-xs text-brown font-display font-medium">{land.size} ha</span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
              {filtered.length === 0 && (
                <div className="col-span-full text-center py-20">
                  <img src={tools.wateringcan2} alt="" className="h-40 mx-auto opacity-70" />
                  <p className="font-script text-3xl text-primary mt-4">Nimic pe-aici încă...</p>
                  <p className="text-muted-foreground">Schimbă filtrele și mai încearcă o dată.</p>
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-2xl overflow-hidden border-2 border-primary/30 shadow-card h-[600px]">
              <MapContainer center={[47.0, 28.5]} zoom={7} className="h-full w-full">
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap" />
                {filtered.map(l => (
                  <Marker key={l.id} position={l.coords} icon={pinIcon}>
                    <Popup>
                      <div className="space-y-1 min-w-[180px]">
                        <p className="font-script text-2xl text-primary leading-none">{l.name}</p>
                        <p className="text-xs text-muted-foreground">{l.village}, {l.region}</p>
                        <p className="text-sm font-display font-bold">{l.pricePerAre} MDL/ar</p>
                        <Link to={`/lands/${l.id}`} className="text-xs text-primary font-display font-semibold underline">Vezi lotul →</Link>
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
