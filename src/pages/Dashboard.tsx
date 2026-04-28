import { Link } from "react-router-dom";
import { CalendarDays, Home, Settings, ShoppingBasket, Sprout } from "lucide-react";
import { MY_RESERVATIONS, LANDS, CULTURES, SERVICES } from "@/data/mock";
import { ScallopedFrame } from "@/components/decor/ScallopedFrame";
import { HDButton } from "@/components/decor/HDButton";
import { useAuth } from "@/context/AuthContext";
import { botanicals, tools, veg } from "@/assets";

const STAGES = [
  { key: "Rezervat", label: "Rezervat", icon: tools.bag },
  { key: "Pregătit", label: "Pământ pregătit", icon: tools.shovel },
  { key: "Plantat", label: "Plantat", icon: tools.trowel },
  { key: "În creștere", label: "În creștere", icon: veg.peas },
  { key: "Recoltat", label: "Recoltat", icon: tools.bag },
];

const Dashboard = () => {
  const { user } = useAuth();
  const r = MY_RESERVATIONS[0];
  const land = LANDS.find(l => l.id === r.landId)!;
  const stageIdx = STAGES.findIndex(s => s.key === r.status);

  return (
    <div className="container py-10 grid lg:grid-cols-[220px_1fr] gap-8">
      {/* Sidebar */}
      <aside className="space-y-1">
        <div className="bg-paper border border-primary/30 rounded-2xl p-4 mb-3">
          <div className="flex items-center gap-2">
            <img src={botanicals.bouquetBow} alt="" className="h-12 object-contain" />
            <div>
              <p className="font-script text-2xl text-primary leading-none">Bun venit,</p>
              <p className="font-display font-semibold">{user?.name ?? "grădinar drag"}</p>
            </div>
          </div>
        </div>
        {[
          { label: "Grădina mea", icon: Home, to: "/dashboard" },
          { label: "Culturi", icon: Sprout, to: "/dashboard" },
          { label: "Calendar", icon: CalendarDays, to: "/dashboard" },
          { label: "Magazin", icon: ShoppingBasket, to: "/marketplace" },
          { label: "Setări", icon: Settings, to: "/dashboard" },
        ].map(i => (
          <Link key={i.label} to={i.to} className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-accent font-display font-medium text-sm">
            <i.icon className="h-4 w-4 text-primary" /> {i.label}
          </Link>
        ))}
      </aside>

      <section>
        <header className="mb-6">
          <p className="font-script text-3xl text-primary">Lotul tău</p>
          <h1 className="font-display text-3xl font-bold">{land.name} · L3</h1>
          <p className="text-muted-foreground text-sm">{land.village}, {land.region}</p>
        </header>

        {/* Timeline */}
        <div className="bg-card border border-primary/25 rounded-2xl p-6 shadow-paper">
          <h2 className="font-display font-bold text-lg mb-6">Cum merge grădina</h2>
          <div className="relative flex items-start justify-between gap-2">
            <div className="absolute top-7 left-8 right-8 h-0.5 bg-primary/20" />
            <div className="absolute top-7 left-8 h-0.5 bg-primary transition-all"
              style={{ width: `calc(${(stageIdx/(STAGES.length-1))*100}% - 16px)` }} />
            {STAGES.map((s, i) => {
              const done = i <= stageIdx;
              return (
                <div key={s.key} className="relative flex flex-col items-center text-center flex-1 min-w-0">
                  <div className={`h-14 w-14 rounded-full grid place-items-center border-2 transition-all
                    ${done ? "bg-primary border-primary-deep" : "bg-paper border-primary/30"}`}>
                    <img src={s.icon} alt="" className="h-9 w-9 object-contain" />
                  </div>
                  <p className={`mt-2 text-xs font-display font-semibold ${done ? "text-primary" : "text-muted-foreground"}`}>{s.label}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Cultures */}
        <div className="mt-8">
          <h2 className="font-display font-bold text-xl mb-4">Ce am plantat</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {r.cultures.map(c => {
              const cult = CULTURES.find(x => x.id === c.cultureId)!;
              return (
                <div key={c.cultureId} className="bg-card border border-primary/20 rounded-2xl p-4 flex items-center gap-3 shadow-paper">
                  <img src={cult.icon} alt="" className="h-14 w-14 object-contain" />
                  <div>
                    <h3 className="font-display font-bold">{cult.name}</h3>
                    <p className="text-xs text-muted-foreground">{c.area} ari · ~{(c.area * cult.yieldKgPerAre).toFixed(0)} kg estimat</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Services */}
        <div className="mt-8">
          <h2 className="font-display font-bold text-xl mb-4">Servicii active</h2>
          <div className="space-y-3">
            {r.services.map(sid => {
              const s = SERVICES.find(x => x.id === sid)!;
              return (
                <div key={sid} className="bg-paper border border-primary/20 rounded-xl p-4 flex items-center gap-3">
                  <img src={s.icon} alt="" className="h-10 w-10 object-contain" />
                  <div className="flex-1">
                    <p className="font-display font-semibold">{s.name}</p>
                    <p className="text-xs text-muted-foreground">{s.description}</p>
                  </div>
                  <span className="text-xs font-display font-bold bg-primary text-primary-foreground px-3 py-1 rounded-full">Activ</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Empty state demo */}
        <div className="mt-10 text-center bg-paper border border-primary/20 rounded-2xl p-8">
          <ScallopedFrame variant="oval" className="aspect-[3/1] max-w-md mx-auto">
            <div className="absolute inset-0 flex items-center justify-center gap-4 px-6">
              <img src={tools.wateringcan2} alt="" className="h-16 object-contain animate-watering" />
              <div className="text-left">
                <p className="font-script text-2xl text-primary leading-none">Vrei mai mult?</p>
                <p className="text-xs text-muted-foreground">Mai sunt loturi libere, vino să le vezi.</p>
              </div>
            </div>
          </ScallopedFrame>
          <HDButton asChild className="mt-5"><Link to="/lands">Răsfoiește loturile</Link></HDButton>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
