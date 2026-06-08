import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useData, STAGE_ORDER, CULTURES } from "@/context/DataContext";
import { EmptyState } from "@/components/dashboard";

const ClientOverview = () => {
  const { user } = useAuth();
  const { reservations, lands, services } = useData();
  const mine = reservations.filter(r => r.clientId === user?.id);
  const r = mine[0];

  if (!r) {
    return (
      <EmptyState
        cat="flowers" slug="seedling" tilt={-3} size="lg"
        title="Încă nu ai un lot rezervat"
        description="Alege un lot din catalogul de terenuri și începe-ți prima grădină."
        action={
          <Link to="/lands" className="press inline-flex items-center justify-center h-11 px-6 rounded-md bg-primary text-primary-foreground hover:bg-primary-deep font-display text-[15px]">
            Răsfoiește loturi
          </Link>
        }
      />
    );
  }

  const land = lands.find(l => l.id === r.landId);
  const stageIdx = STAGE_ORDER.indexOf(r.status);

  return (
    <div className="space-y-16">
      <header className="pb-8 border-b border-border/70">
        <p className="eyebrow">{land?.region} · Sezon {r.season}</p>
        <h1 className="mt-3 font-display text-4xl text-primary-deep font-normal leading-[1.1]">{land?.name}</h1>
        <p className="text-sm text-muted-foreground mt-2 font-ui">{land?.village} · Lot {r.plotId.split("-p")[1]}</p>
      </header>

      <section>
        <p className="eyebrow">Stadiul curent</p>
        <h2 className="mt-3 font-display text-2xl text-primary-deep font-normal mb-10">
          <span className="font-script italic text-primary">{r.status}</span> — etapa {stageIdx + 1} din {STAGE_ORDER.length}
        </h2>
        <div className="relative">
          <div className="absolute top-[14px] left-0 right-0 h-px bg-border" />
          <div className="absolute top-[14px] left-0 h-px bg-primary transition-all"
            style={{ width: `${(stageIdx / (STAGE_ORDER.length - 1)) * 100}%` }} />
          <div className="relative flex justify-between">
            {STAGE_ORDER.map((s, i) => {
              const done = i < stageIdx;
              const current = i === stageIdx;
              return (
                <div key={s} className="flex flex-col items-center text-center max-w-[110px]">
                  <span className={`h-7 w-7 rounded-full grid place-items-center border ${
                    done ? "bg-primary border-primary"
                      : current ? "bg-background border-primary ring-4 ring-primary/15"
                      : "bg-background border-border"
                  }`}>
                    {done && <Check className="h-3.5 w-3.5 text-primary-foreground" strokeWidth={2.5} />}
                    {current && <span className="block w-2 h-2 rounded-full bg-primary" />}
                  </span>
                  <p className={`mt-3 font-ui text-[11px] uppercase tracking-widest ${current ? "text-primary-deep" : done ? "text-foreground/60" : "text-muted-foreground"}`}>
                    {s}
                  </p>
                  {r.stageDates[s] && <p className="mt-1 text-[10px] text-muted-foreground">{r.stageDates[s]}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="pt-12 border-t border-border/70">
        <p className="eyebrow">Plantat</p>
        <h2 className="mt-3 font-display text-3xl text-primary-deep font-normal mb-8">Ce crește pe lotul tău</h2>
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
      </section>

      <section className="pt-12 border-t border-border/70">
        <p className="eyebrow">Servicii active</p>
        <h2 className="mt-3 font-display text-3xl text-primary-deep font-normal mb-8">Lucrări programate</h2>
        {r.services.length === 0 ? (
          <EmptyState cat="tools" slug="watering-can" tilt={-4} size="md"
            title="Niciun serviciu activ"
            description="Adaugă servicii — udare, plivit, tratamente — și fermierul tău va fi notificat." />
        ) : (
          <ul className="border-y border-border/60">
            {r.services.map(so => {
              const s = services.find(x => x.id === so.serviceId);
              if (!s) return null;
              return (
                <li key={so.serviceId} className="flex items-center justify-between gap-6 py-5 border-b border-border/40 last:border-0">
                  <div>
                    <p className="font-display text-lg text-primary-deep">{s.name}</p>
                    <p className="text-sm text-muted-foreground mt-0.5">{so.scheduledFor}</p>
                  </div>
                  <span className="font-ui text-[10px] uppercase tracking-widest text-primary-deep bg-paper px-2.5 py-1 rounded">
                    {so.status}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
};

export default ClientOverview;
