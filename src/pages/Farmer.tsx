import { useState } from "react";
import { LANDS, TODAY_TASKS } from "@/data/mock";
import { ScallopedFrame } from "@/components/decor/ScallopedFrame";
import { Checkbox } from "@/components/ui/checkbox";
import { botanicals, tools, veg } from "@/assets";

const Stat = ({ label, value, icon }: { label: string; value: string; icon: string }) => (
  <div className="relative bg-card border border-primary/25 rounded-2xl p-5 shadow-paper overflow-hidden">
    <p className="font-display text-sm text-muted-foreground">{label}</p>
    <p className="font-script text-4xl text-primary leading-none mt-1">{value}</p>
    <img src={icon} alt="" className="absolute -right-3 -bottom-3 h-20 opacity-80" />
  </div>
);

const Farmer = () => {
  const [tasks, setTasks] = useState(TODAY_TASKS);
  const toggle = (id: string) => setTasks(t => t.map(x => x.id === id ? { ...x, done: !x.done } : x));

  const days = ["L", "Ma", "Mi", "J", "V", "S", "D"];

  return (
    <div className="container py-10">
      <header className="mb-8 flex items-end justify-between flex-wrap gap-4">
        <div>
          <p className="font-script text-3xl text-primary">Bună dimineața, fermier</p>
          <h1 className="font-display text-3xl font-bold">Panou fermier</h1>
        </div>
        <img src={botanicals.handRose} alt="" className="h-20 object-contain hidden md:block" />
      </header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Loturi în grijă" value="3" icon={tools.shovel} />
        <Stat label="Clienți activi" value="24" icon={veg.tomatoes} />
        <Stat label="Sarcini azi" value={String(tasks.filter(t => !t.done).length)} icon={tools.wateringcan2} />
        <Stat label="Câștig luna asta" value="14 200" icon={veg.crate} />
      </div>

      <div className="grid lg:grid-cols-[1fr_360px] gap-8 mt-10">
        {/* Tasks */}
        <div className="bg-card border border-primary/25 rounded-2xl p-6 shadow-paper">
          <h2 className="font-display font-bold text-xl mb-4">Sarcini astăzi</h2>
          <div className="space-y-2">
            {tasks.map(t => (
              <label key={t.id} className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer
                ${t.done ? "bg-accent/40 border-primary/20 opacity-60" : "bg-paper border-primary/20 hover:border-primary/50"}`}>
                <Checkbox checked={t.done} onCheckedChange={() => toggle(t.id)} className="border-primary data-[state=checked]:bg-primary" />
                <img src={t.icon} alt="" className="h-9 w-9 object-contain" />
                <span className={`flex-1 font-display font-medium text-sm ${t.done ? "line-through" : ""}`}>{t.title}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Calendar */}
        <div className="relative bg-card border border-primary/25 rounded-2xl p-6 shadow-paper overflow-hidden">
          <img src={botanicals.flowersVase1} alt="" className="absolute -top-4 -right-2 h-24 opacity-70" />
          <img src={veg.peas} alt="" className="absolute bottom-2 -left-3 h-20 opacity-70" />
          <h2 className="font-display font-bold text-xl mb-4">Săptămâna asta</h2>
          <div className="grid grid-cols-7 gap-1.5">
            {days.map(d => <div key={d} className="text-center text-xs font-display font-bold text-muted-foreground">{d}</div>)}
            {Array.from({ length: 7 }).map((_, i) => {
              const count = [2, 4, 1, 3, 5, 0, 2][i];
              return (
                <div key={i} className={`aspect-square rounded-lg grid place-items-center text-sm font-display font-semibold
                  ${count > 3 ? "bg-primary text-primary-foreground" : count > 0 ? "bg-accent text-foreground" : "bg-paper text-muted-foreground"}`}>
                  {count || "·"}
                </div>
              );
            })}
          </div>
          <p className="text-xs text-muted-foreground mt-3">Numărul de sarcini pe zi.</p>
        </div>
      </div>

      {/* Lands managed */}
      <div className="mt-10">
        <h2 className="font-display font-bold text-xl mb-4">Loturile mele</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {LANDS.slice(0, 3).map(l => (
            <article key={l.id} className="bg-card border border-primary/20 rounded-2xl overflow-hidden shadow-paper">
              <img src={l.photo} alt="" className="aspect-[4/3] w-full object-cover" />
              <div className="p-4">
                <h3 className="font-script text-2xl text-primary leading-tight">{l.name}</h3>
                <p className="text-xs text-muted-foreground">{l.totalPlots - l.availablePlots}/{l.totalPlots} loturi rezervate</p>
                <div className="mt-2 h-2 bg-accent rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: `${((l.totalPlots - l.availablePlots) / l.totalPlots) * 100}%` }} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-12 text-center">
        <ScallopedFrame variant="oval" className="aspect-[3/1] max-w-2xl mx-auto">
          <div className="absolute inset-0 grid place-items-center px-8">
            <p className="font-script text-3xl text-primary text-center">„Pământul răsplătește pe cine îl iubește."</p>
          </div>
        </ScallopedFrame>
      </div>
    </div>
  );
};

export default Farmer;
