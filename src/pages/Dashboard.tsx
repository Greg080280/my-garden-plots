import { Link } from "react-router-dom";
import { CalendarDays, Home, Settings, ShoppingBasket, Sprout, Check } from "lucide-react";
import { MY_RESERVATIONS, LANDS, CULTURES, SERVICES } from "@/data/mock";
import { useAuth } from "@/context/AuthContext";
import { EmptyState } from "@/components/dashboard";

const STAGES = [
  { key: "Rezervat", label: "Rezervat" },
  { key: "Arat", label: "Arat" },
  { key: "Plantat", label: "Plantat" },
  { key: "În creștere", label: "În creștere" },
  { key: "Recoltat", label: "Recoltat" },
];

const Dashboard = () => {
  const { user } = useAuth();
  const r = MY_RESERVATIONS[0];
  const land = LANDS.find(l => l.id === r.landId)!;
  const stageIdx = STAGES.findIndex(s => s.key === r.status);

  const navItems = [
    { label: "Grădina mea", icon: Home, to: "/dashboard" },
    { label: "Culturi", icon: Sprout, to: "/dashboard" },
    { label: "Calendar", icon: CalendarDays, to: "/dashboard" },
    { label: "Magazin", icon: ShoppingBasket, to: "/marketplace" },
    { label: "Setări", icon: Settings, to: "/dashboard" },
  ];

  return (
    <div className="container py-16 grid lg:grid-cols-[220px_1fr] gap-16">
      {/* Sidebar */}
      <aside>
        <div className="pb-6 mb-6 border-b border-border/70">
          <p className="eyebrow">Cont</p>
          <p className="mt-3 font-display text-xl text-primary-deep">{user?.name ?? "Grădinar"}</p>
        </div>
        <nav className="flex flex-col">
          {navItems.map(i => (
            <Link
              key={i.label}
              to={i.to}
              className="group flex items-center gap-3 py-3 font-display text-[15px] text-foreground/75 hover:text-primary-deep border-b border-border/40 last:border-0"
            >
              <i.icon className="h-4 w-4 text-primary/70 group-hover:text-primary" strokeWidth={1.5} />
              {i.label}
            </Link>
          ))}
        </nav>
      </aside>

      <section>
        <header className="pb-8 mb-12 border-b border-border/70">
          <p className="eyebrow">{land.region} · Sezon {r.season}</p>
          <h1 className="mt-3 font-display text-4xl md:text-5xl text-primary-deep font-normal leading-[1.1]">
            {land.name}
          </h1>
          <p className="text-sm text-muted-foreground mt-2 font-ui">{land.village}, {land.region} · Lot {r.plotId.split("-p")[1]}</p>
        </header>

        {/* Timeline */}
        <div>
          <p className="eyebrow">Stadiul curent</p>
          <h2 className="mt-3 font-display text-2xl text-primary-deep font-normal mb-10">
            <span className="font-script italic text-primary">{STAGES[stageIdx]?.label}</span> — etapa {stageIdx + 1} din {STAGES.length}
          </h2>

          <div className="relative">
            <div className="absolute top-[14px] left-0 right-0 h-px bg-border" />
            <div
              className="absolute top-[14px] left-0 h-px bg-primary transition-all"
              style={{ width: `${(stageIdx / (STAGES.length - 1)) * 100}%` }}
            />
            <div className="relative flex justify-between">
              {STAGES.map((s, i) => {
                const done = i < stageIdx;
                const current = i === stageIdx;
                return (
                  <div key={s.key} className="flex flex-col items-center text-center max-w-[110px]">
                    <span className={`h-7 w-7 rounded-full grid place-items-center border transition-colors ${
                      done ? "bg-primary border-primary" :
                      current ? "bg-background border-primary ring-4 ring-primary/15" :
                      "bg-background border-border"
                    }`}>
                      {done && <Check className="h-3.5 w-3.5 text-primary-foreground" strokeWidth={2.5} />}
                      {current && <span className="block w-2 h-2 rounded-full bg-primary" />}
                    </span>
                    <p className={`mt-3 font-ui text-[11px] uppercase tracking-widest ${current ? "text-primary-deep" : done ? "text-foreground/60" : "text-muted-foreground"}`}>
                      {s.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Cultures */}
        <div className="mt-20 pt-16 border-t border-border/70">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="eyebrow">Plantat</p>
              <h2 className="mt-3 font-display text-3xl text-primary-deep font-normal">Ce crește pe lotul tău</h2>
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-px bg-border/60 border-y border-border/60">
            {r.cultures.map(c => {
              const cult = CULTURES.find(x => x.id === c.cultureId)!;
              return (
                <div key={c.cultureId} className="bg-background p-7">
                  <p className="eyebrow text-[10px]">{cult.category}</p>
                  <h3 className="mt-3 font-display text-2xl text-primary-deep">{cult.name}</h3>
                  <p className="mt-1 font-ui text-xs text-muted-foreground tracking-wide uppercase">{c.area} ari</p>
                  <p className="mt-4 text-sm text-foreground/70">
                    Estimat: <span className="text-primary-deep">~{(c.area * cult.yieldKgPerAre).toFixed(0)} kg</span>
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Services */}
        <div className="mt-20 pt-16 border-t border-border/70">
          <p className="eyebrow">Servicii</p>
          <h2 className="mt-3 font-display text-3xl text-primary-deep font-normal mb-8">Active</h2>
          <ul className="border-y border-border/60">
            {r.services.map(so => {
              const s = SERVICES.find(x => x.id === so.serviceId);
              if (!s) return null;
              return (
                <li key={so.serviceId} className="flex items-center justify-between gap-6 py-5 border-b border-border/40 last:border-0">
                  <div>
                    <p className="font-display text-lg text-primary-deep">{s.name}</p>
                    <p className="text-sm text-muted-foreground mt-0.5">{s.description}</p>
                  </div>
                  <span className="font-ui text-[10px] uppercase tracking-widest text-primary-deep bg-paper px-2.5 py-1 rounded">
                    {so.status}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* CTA */}
        <div className="mt-20 pt-12 border-t border-border/70 flex items-center justify-between gap-6 flex-wrap">
          <p className="font-display italic text-lg text-primary-deep max-w-md">
            Mai sunt loturi disponibile în această regiune.
          </p>
          <Link
            to="/lands"
            className="press inline-flex items-center justify-center h-11 px-7 rounded-md bg-primary text-primary-foreground hover:bg-primary-deep font-display text-[15px]"
          >
            Răsfoiește loturile
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
