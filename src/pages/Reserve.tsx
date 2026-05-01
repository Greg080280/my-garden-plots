import { useMemo, useState } from "react";
import { Link, useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Check, ArrowLeft } from "lucide-react";
import { LANDS, CULTURES, SERVICES, buildPlots } from "@/data/mock";
import { findUserById } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const STEPS = [
  { n: 1, label: "Confirmă lotul" },
  { n: 2, label: "Alege culturi" },
  { n: 3, label: "Servicii & plată" },
];

const Reserve = () => {
  const { id } = useParams<{ id: string }>();
  const [params] = useSearchParams();
  const nav = useNavigate();
  const land = LANDS.find(l => l.id === id);
  const plots = useMemo(() => land ? buildPlots(land) : [], [land]);
  const plotCode = params.get("plot");
  const plot = plots.find(p => p.code === plotCode) ?? plots.find(p => p.status === "available");

  const [step, setStep] = useState(1);
  const [allocs, setAllocs] = useState<Record<string, number>>({});
  const [selServices, setSelServices] = useState<Set<string>>(new Set(["s-watering-ion"]));

  if (!land || !plot) return <div className="container py-32 text-center font-display text-xl">Lot indisponibil.</div>;

  const totalAllocated = Object.values(allocs).reduce((s, v) => s + v, 0);
  const remaining = Math.max(0, plot.area - totalAllocated);

  const culturesCost = Object.entries(allocs).reduce((s, [cid, area]) => {
    const c = CULTURES.find(x => x.id === cid);
    return s + (c ? c.pricePerAre * area : 0);
  }, 0);
  const servicesCost = [...selServices].reduce((s, sid) => s + (SERVICES.find(x => x.id === sid)?.price ?? 0), 0);
  const landCost = plot.area * land.pricePerAre;
  const total = landCost + culturesCost + servicesCost;

  const updateAlloc = (cid: string, val: number) => {
    const max = remaining + (allocs[cid] ?? 0);
    setAllocs(prev => ({ ...prev, [cid]: Math.max(0, Math.min(val, max)) }));
  };

  const toggleService = (sid: string) => {
    const n = new Set(selServices);
    n.has(sid) ? n.delete(sid) : n.add(sid);
    setSelServices(n);
  };

  const checkout = () => {
    toast.success("Rezervare confirmată", { description: "Vei primi un e-mail cu detaliile." });
    setTimeout(() => nav("/dashboard"), 1100);
  };

  return (
    <div className="container py-12 lg:py-16 max-w-5xl">
      <Link to={`/lands/${land.id}`} className="inline-flex items-center gap-2 font-ui text-[11px] uppercase tracking-widest text-muted-foreground hover:text-primary-deep">
        <ArrowLeft className="h-3 w-3" strokeWidth={1.5} /> Înapoi la lot
      </Link>

      <header className="mt-6 pb-8 mb-12 border-b border-border/70">
        <p className="eyebrow">Rezervare · {land.region}</p>
        <h1 className="mt-3 font-display text-4xl md:text-5xl text-primary-deep font-normal leading-[1.1]">
          {land.name} <span className="font-script italic text-primary">·</span> {plot.code}
        </h1>
      </header>

      {/* Stepper */}
      <ol className="flex items-center gap-2 mb-14 overflow-x-auto pb-2">
        {STEPS.map((s, i) => {
          const active = step === s.n;
          const done = step > s.n;
          return (
            <li key={s.n} className="flex items-center gap-3 shrink-0">
              <span className={`h-7 w-7 grid place-items-center rounded-full border font-ui text-xs ${
                done ? "bg-primary text-primary-foreground border-primary" :
                active ? "bg-background text-primary-deep border-primary ring-4 ring-primary/15" :
                "bg-background text-muted-foreground border-border"
              }`}>
                {done ? <Check className="h-3.5 w-3.5" strokeWidth={2.5} /> : s.n}
              </span>
              <span className={`font-ui text-[11px] uppercase tracking-widest ${active || done ? "text-primary-deep" : "text-muted-foreground"}`}>
                {s.label}
              </span>
              {i < STEPS.length - 1 && <span className={`block w-12 h-px ${done ? "bg-primary" : "bg-border"}`} />}
            </li>
          );
        })}
      </ol>

      {/* Step content */}
      <div className="min-h-[300px]">
        {step === 1 && (
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="eyebrow">Lotul tău</p>
              <h2 className="mt-3 font-display text-3xl text-primary-deep font-normal">{land.name}</h2>
              <p className="font-ui text-sm text-muted-foreground mt-1.5">{land.village}, {land.region}</p>
              <dl className="mt-8 space-y-4">
                <div className="flex justify-between border-b border-border/50 pb-3">
                  <dt className="font-ui text-[11px] uppercase tracking-widest text-muted-foreground">Lot</dt>
                  <dd className="font-display text-foreground">{plot.code} · {plot.area} ari</dd>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-3">
                  <dt className="font-ui text-[11px] uppercase tracking-widest text-muted-foreground">Preț pământ</dt>
                  <dd className="font-display text-foreground">{landCost.toFixed(0)} MDL / sezon</dd>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-3">
                  <dt className="font-ui text-[11px] uppercase tracking-widest text-muted-foreground">Fermier</dt>
                  <dd className="font-display text-foreground">{findUserById(land.farmerId)?.name ?? "Fermier"}</dd>
                </div>
              </dl>
            </div>
            <div className="rounded-md overflow-hidden border border-border">
              <img src={land.photo} alt={land.name} className="w-full aspect-[4/3] object-cover" />
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/70">
              <div>
                <p className="eyebrow">Culturi</p>
                <h2 className="mt-2 font-display text-3xl text-primary-deep font-normal">Ce să plantăm?</h2>
              </div>
              <p className="font-ui text-sm text-foreground/70">
                <span className="text-primary-deep font-semibold">{remaining.toFixed(2)}</span> / {plot.area} ari rămase
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border/60 border-y border-border/60">
              {CULTURES.map(c => (
                <div key={c.id} className="bg-background p-6">
                  <p className="eyebrow text-[10px]">{c.category}</p>
                  <h3 className="mt-2 font-display text-xl text-primary-deep">{c.name}</h3>
                  <p className="font-ui text-xs text-muted-foreground mt-1 tracking-wide">{c.pricePerAre} MDL/AR · {c.cycleDays}Z</p>
                  <div className="mt-5 flex items-center gap-2">
                    <button
                      onClick={() => updateAlloc(c.id, (allocs[c.id] ?? 0) - 0.25)}
                      className="press h-8 w-8 rounded-sm border border-border hover:border-primary text-primary-deep"
                    >−</button>
                    <Input
                      type="number" step={0.25} min={0}
                      value={allocs[c.id] ?? 0}
                      onChange={e => updateAlloc(c.id, parseFloat(e.target.value) || 0)}
                      className="text-center h-8 rounded-sm bg-card border-border font-display"
                    />
                    <button
                      onClick={() => updateAlloc(c.id, (allocs[c.id] ?? 0) + 0.25)}
                      className="press h-8 w-8 rounded-sm bg-primary text-primary-foreground hover:bg-primary-deep"
                    >+</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="grid lg:grid-cols-[1fr_320px] gap-12">
            <div>
              <p className="eyebrow">Servicii</p>
              <h2 className="mt-3 font-display text-3xl text-primary-deep font-normal mb-8">De la fermier</h2>
              <ul className="border-y border-border/60">
                {SERVICES.map(s => {
                  const on = selServices.has(s.id);
                  return (
                    <li key={s.id} className="border-b border-border/40 last:border-0">
                      <button
                        onClick={() => toggleService(s.id)}
                        className="w-full text-left py-5 flex items-start gap-4 hover:bg-paper/50 transition-colors -mx-3 px-3"
                      >
                        <span className={`mt-1 h-4 w-4 border grid place-items-center shrink-0 ${on ? "bg-primary border-primary" : "border-border"}`}>
                          {on && <Check className="h-3 w-3 text-primary-foreground" strokeWidth={2.5} />}
                        </span>
                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-3">
                            <h3 className="font-display text-lg text-primary-deep">{s.name}</h3>
                            <span className="font-display text-sm text-primary-deep whitespace-nowrap">
                              {s.price} <span className="font-ui text-[10px] uppercase tracking-widest text-muted-foreground">MDL/{s.unit}</span>
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{s.description}</p>
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <p className="eyebrow">Sumar</p>
              <h3 className="mt-3 font-display text-2xl text-primary-deep font-normal mb-6">Comanda ta</h3>
              <ul className="space-y-3 font-display text-[15px]">
                <li className="flex justify-between gap-3 pb-3 border-b border-border/50">
                  <span className="text-foreground/80">Pământ ({plot.area} ari)</span>
                  <span className="text-primary-deep">{landCost.toFixed(0)}</span>
                </li>
                {Object.entries(allocs).filter(([, v]) => v > 0).map(([cid, area]) => {
                  const c = CULTURES.find(x => x.id === cid)!;
                  return (
                    <li key={cid} className="flex justify-between gap-3 pb-3 border-b border-border/50">
                      <span className="text-foreground/80">{c.name} ({area}a)</span>
                      <span className="text-primary-deep">{(c.pricePerAre * area).toFixed(0)}</span>
                    </li>
                  );
                })}
                {[...selServices].map(sid => {
                  const s = SERVICES.find(x => x.id === sid)!;
                  return (
                    <li key={sid} className="flex justify-between gap-3 pb-3 border-b border-border/50">
                      <span className="text-foreground/80">{s.name}</span>
                      <span className="text-primary-deep">{s.price}</span>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-6 pt-5 border-t-2 border-primary/40 flex justify-between items-baseline">
                <span className="font-ui text-[11px] uppercase tracking-widest text-primary-deep">Total</span>
                <span className="font-display text-3xl text-primary-deep">
                  {total.toFixed(0)} <span className="font-ui text-xs text-muted-foreground tracking-wide">MDL</span>
                </span>
              </div>
            </aside>
          </div>
        )}
      </div>

      <div className="mt-16 pt-8 border-t border-border/70 flex items-center justify-between">
        <button
          onClick={() => setStep(s => Math.max(1, s - 1))}
          disabled={step === 1}
          className="press font-display text-[15px] text-primary-deep link-underline disabled:opacity-40 disabled:no-underline disabled:cursor-not-allowed"
        >
          ← Înapoi
        </button>
        {step < 3 ? (
          <button
            onClick={() => setStep(s => s + 1)}
            className="press inline-flex items-center justify-center h-12 px-8 rounded-md bg-primary text-primary-foreground hover:bg-primary-deep font-display text-[15px]"
          >
            Continuă
          </button>
        ) : (
          <button
            onClick={checkout}
            className="press inline-flex items-center justify-center h-12 px-8 rounded-md bg-primary text-primary-foreground hover:bg-primary-deep font-display text-[15px]"
          >
            Finalizează rezervarea
          </button>
        )}
      </div>
    </div>
  );
};

export default Reserve;
