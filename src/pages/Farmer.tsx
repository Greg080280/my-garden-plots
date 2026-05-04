import { useState } from "react";
import { LANDS, TODAY_TASKS } from "@/data/mock";
import { Checkbox } from "@/components/ui/checkbox";
import { EmptyState } from "@/components/dashboard";

const Stat = ({ label, value, hint }: { label: string; value: string; hint?: string }) => (
  <div className="border-l border-primary/40 pl-5">
    <p className="eyebrow text-[10px]">{label}</p>
    <p className="mt-2 font-display text-4xl text-primary-deep font-normal leading-none">{value}</p>
    {hint && <p className="mt-2 font-ui text-xs text-muted-foreground tracking-wide">{hint}</p>}
  </div>
);

const Farmer = () => {
  const [tasks, setTasks] = useState(TODAY_TASKS);
  const toggle = (id: string) => setTasks(t => t.map(x => x.id === id ? { ...x, done: !x.done } : x));

  const days = ["L", "Ma", "Mi", "J", "V", "S", "D"];

  return (
    <div className="container py-16">
      <header className="mb-14 pb-8 border-b border-border/70">
        <p className="eyebrow">Panou fermier</p>
        <h1 className="mt-3 font-display text-4xl md:text-5xl text-primary-deep font-normal leading-[1.1]">
          Bună <span className="font-script italic text-primary">dimineața</span>.
        </h1>
        <p className="text-sm text-muted-foreground mt-2 font-ui">
          {new Date().toLocaleDateString("ro-MD", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
        </p>
      </header>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-16 border-b border-border/70">
        <Stat label="Loturi" value="3" hint="în grijă" />
        <Stat label="Clienți" value="24" hint="activi" />
        <Stat label="Sarcini azi" value={String(tasks.filter(t => !t.done).length)} hint={`din ${tasks.length}`} />
        <Stat label="Câștig luna" value="14 200" hint="MDL" />
      </div>

      <div className="grid lg:grid-cols-[1fr_360px] gap-16 mt-16">
        {/* Tasks */}
        <div>
          <p className="eyebrow">Astăzi</p>
          <h2 className="mt-3 font-display text-3xl text-primary-deep font-normal mb-8">Sarcini</h2>
          <ul className="border-y border-border/60">
            {tasks.map(t => (
              <li key={t.id}>
                <label className={`flex items-center gap-4 py-4 border-b border-border/40 last:border-0 cursor-pointer transition-opacity ${t.done ? "opacity-50" : ""}`}>
                  <Checkbox
                    checked={t.done}
                    onCheckedChange={() => toggle(t.id)}
                    className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary rounded-sm"
                  />
                  <span className={`flex-1 font-display text-base ${t.done ? "line-through text-muted-foreground" : "text-foreground/85"}`}>
                    {t.title}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Calendar */}
        <div>
          <p className="eyebrow">Săptămâna</p>
          <h2 className="mt-3 font-display text-3xl text-primary-deep font-normal mb-8">Sarcini pe zi</h2>
          <div className="grid grid-cols-7 gap-2">
            {days.map(d => (
              <div key={d} className="text-center font-ui text-[10px] uppercase tracking-widest text-muted-foreground pb-2">
                {d}
              </div>
            ))}
            {Array.from({ length: 7 }).map((_, i) => {
              const count = [2, 4, 1, 3, 5, 0, 2][i];
              return (
                <div
                  key={i}
                  className={`aspect-square grid place-items-center font-display text-base rounded-sm border ${
                    count > 3 ? "bg-primary text-primary-foreground border-primary" :
                    count > 0 ? "bg-paper text-primary-deep border-border" :
                    "text-muted-foreground border-border/50"
                  }`}
                >
                  {count || "·"}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Lands managed */}
      <div className="mt-20 pt-16 border-t border-border/70">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="eyebrow">Loturile mele</p>
            <h2 className="mt-3 font-display text-3xl text-primary-deep font-normal">În îngrijire</h2>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {LANDS.slice(0, 3).map(l => {
            const occupied = l.totalPlots - l.availablePlots;
            const pct = (occupied / l.totalPlots) * 100;
            return (
              <article key={l.id} className="editorial-card overflow-hidden">
                <div className="img-zoom aspect-[4/3] overflow-hidden">
                  <img src={l.photo} alt={l.name} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="p-7">
                  <p className="eyebrow text-[10px]">{l.region}</p>
                  <h3 className="mt-2 font-display text-xl text-primary-deep">{l.name}</h3>
                  <p className="mt-4 font-ui text-xs text-muted-foreground tracking-wide">
                    {occupied}/{l.totalPlots} REZERVATE
                  </p>
                  <div className="mt-2 h-px bg-border relative overflow-hidden">
                    <div className="absolute inset-y-0 left-0 bg-primary" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <p className="mt-20 pt-16 border-t border-border/70 font-display italic text-xl text-brown text-center">
        „Pământul răsplătește pe cine îl iubește."
      </p>
    </div>
  );
};

export default Farmer;
