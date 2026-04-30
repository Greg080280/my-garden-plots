import { useMemo, useState } from "react";
import { Link, useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Check, MapPin } from "lucide-react";
import { LANDS, CULTURES, SERVICES, buildPlots } from "@/data/mock";
import { findUserById } from "@/context/AuthContext";
import { HDButton } from "@/components/decor/HDButton";
import { ScallopedFrame } from "@/components/decor/ScallopedFrame";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { veg, tools, deco, botanicals } from "@/assets";

const StepDot = ({ n, active, done, icon, label }: { n: number; active: boolean; done: boolean; icon: string; label: string }) => (
  <div className="flex flex-col items-center text-center min-w-[100px]">
    <div className={`relative h-14 w-14 rounded-full grid place-items-center border-2 transition-all
      ${done ? "bg-primary border-primary-deep" : active ? "bg-paper border-primary" : "bg-paper border-primary/30"}`}>
      <img src={icon} alt="" className="h-9 w-9 object-contain" />
      {done && <Check className="absolute -bottom-1 -right-1 h-5 w-5 bg-primary text-primary-foreground rounded-full p-0.5" />}
    </div>
    <p className={`mt-2 text-xs font-display font-semibold ${active || done ? "text-primary" : "text-muted-foreground"}`}>Pasul {n}</p>
    <p className="text-[11px] text-muted-foreground">{label}</p>
  </div>
);

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
  const [selServices, setSelServices] = useState<Set<string>>(new Set(["watering"]));

  if (!land || !plot) return <div className="container py-20 text-center"><p>Lot indisponibil.</p></div>;

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
    toast.success("Mulțumim! Lotul tău te așteaptă 🌱", { description: "Vei primi confirmarea pe e-mail." });
    setTimeout(() => nav("/dashboard"), 1200);
  };

  return (
    <div className="container py-10 max-w-5xl">
      <Link to={`/lands/${land.id}`} className="text-sm font-display text-primary hover:underline">← Înapoi la lot</Link>

      <header className="text-center mt-3">
        <p className="font-script text-3xl text-primary">Hai să facem grădina ta</p>
        <h1 className="font-display text-3xl font-bold">{land.name} · {plot.code}</h1>
      </header>

      {/* Stepper */}
      <div className="mt-8 flex items-center justify-center gap-2 md:gap-6">
        <StepDot n={1} active={step === 1} done={step > 1} icon={tools.bag} label="Confirmă lotul" />
        <div className={`flex-1 max-w-[60px] h-0.5 ${step > 1 ? "bg-primary" : "bg-primary/30"}`} />
        <StepDot n={2} active={step === 2} done={step > 2} icon={veg.tomatoes} label="Alege culturi" />
        <div className={`flex-1 max-w-[60px] h-0.5 ${step > 2 ? "bg-primary" : "bg-primary/30"}`} />
        <StepDot n={3} active={step === 3} done={false} icon={tools.wateringcan2} label="Servicii" />
      </div>

      {/* Step content */}
      <div className="mt-10">
        {step === 1 && (
          <ScallopedFrame variant="oval" centerContent={false} className="aspect-[16/9]">
            <div className="absolute inset-0 grid md:grid-cols-2 items-center px-8 md:px-14 py-8">
              <div className="text-center md:text-center">
                <p className="font-script text-3xl text-primary">Lotul tău</p>
                <h2 className="font-display text-3xl font-bold">{land.name}</h2>
                <p className="text-muted-foreground inline-flex items-center gap-1 mt-1"><MapPin className="h-4 w-4" /> {land.village}, {land.region}</p>
                <ul className="mt-4 space-y-1 text-sm list-none">
                  <li><strong>Lot:</strong> {plot.code} · {plot.area} ari</li>
                  <li><strong>Preț pământ:</strong> {landCost.toFixed(0)} MDL / sezon</li>
                  <li><strong>Fermier:</strong> {findUserById(land.farmerId)?.name ?? "Fermier"}</li>
                </ul>
              </div>
              <img src={botanicals.wheelbarrowVeg} alt="" className="h-48 mx-auto" />
            </div>
          </ScallopedFrame>
        )}

        {step === 2 && (
          <div className="bg-card border border-primary/25 rounded-2xl p-6 shadow-paper">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-bold text-xl">Alege ce plantăm</h2>
              <span className="text-sm font-display"><strong>{remaining.toFixed(2)} ari</strong> rămase din {plot.area}</span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {CULTURES.map(c => (
                <div key={c.id} className="bg-paper border border-primary/20 rounded-xl p-4 hover:border-primary/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <img src={c.icon} alt="" className="h-12 w-12 object-contain" />
                    <div className="flex-1">
                      <h3 className="font-display font-bold leading-tight">{c.name}</h3>
                      <p className="text-xs text-muted-foreground">{c.pricePerAre} MDL/ar · {c.cycleDays} zile</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <button onClick={() => updateAlloc(c.id, (allocs[c.id] ?? 0) - 0.25)} className="h-8 w-8 rounded-full bg-secondary press">−</button>
                    <Input
                      type="number" step={0.25} min={0}
                      value={allocs[c.id] ?? 0}
                      onChange={e => updateAlloc(c.id, parseFloat(e.target.value) || 0)}
                      className="text-center h-8 rounded-lg bg-background border-primary/30"
                    />
                    <button onClick={() => updateAlloc(c.id, (allocs[c.id] ?? 0) + 0.25)} className="h-8 w-8 rounded-full bg-primary text-primary-foreground press">+</button>
                    <span className="text-xs text-muted-foreground">ari</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="grid lg:grid-cols-[1fr_320px] gap-6">
            <div className="bg-card border border-primary/25 rounded-2xl p-6 shadow-paper">
              <h2 className="font-display font-bold text-xl mb-4">Servicii de la fermier</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {SERVICES.map(s => {
                  const on = selServices.has(s.id);
                  return (
                    <button key={s.id} onClick={() => toggleService(s.id)} className={`text-left rounded-xl p-4 border-2 transition-all press flex items-start gap-3
                      ${on ? "bg-secondary/60 border-primary" : "bg-paper border-primary/20 hover:border-primary/50"}`}>
                      <img src={s.icon} alt="" className="h-10 w-10 object-contain shrink-0" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="font-display font-semibold">{s.name}</h3>
                          {on && <Check className="h-5 w-5 text-primary" />}
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{s.description}</p>
                        <p className="text-sm font-display font-bold text-primary-deep mt-1">{s.price} MDL / {s.unit}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <ScallopedFrame variant="rect" centerContent={false} className="aspect-[1/1.2]">
              <div className="absolute inset-0 p-6 flex flex-col">
                <p className="font-script text-2xl text-primary text-center">Coșul tău</p>
                <div className="mt-3 space-y-2 text-sm flex-1 overflow-auto">
                  <div className="flex justify-between"><span>Pământ ({plot.area} ari)</span><strong>{landCost.toFixed(0)} MDL</strong></div>
                  {Object.entries(allocs).filter(([,v]) => v > 0).map(([cid, area]) => {
                    const c = CULTURES.find(x => x.id === cid)!;
                    return <div key={cid} className="flex justify-between"><span>{c.name} ({area} ari)</span><strong>{(c.pricePerAre*area).toFixed(0)} MDL</strong></div>;
                  })}
                  {[...selServices].map(sid => {
                    const s = SERVICES.find(x => x.id === sid)!;
                    return <div key={sid} className="flex justify-between"><span>{s.name}</span><strong>{s.price} MDL</strong></div>;
                  })}
                </div>
                <div className="border-t border-primary/30 pt-3 mt-3 flex justify-between font-display font-bold text-lg">
                  <span>Total</span><span className="text-primary">{total.toFixed(0)} MDL</span>
                </div>
                <img src={deco.bow} alt="" className="absolute -top-3 -right-3 h-12 w-12 object-contain" />
              </div>
            </ScallopedFrame>
          </div>
        )}
      </div>

      <div className="mt-10 flex items-center justify-between">
        <HDButton tone="cream" onClick={() => setStep(s => Math.max(1, s - 1))} disabled={step === 1}>Înapoi</HDButton>
        {step < 3 ? (
          <HDButton iconLeft={tools.trowel} onClick={() => setStep(s => s + 1)}>Continuă</HDButton>
        ) : (
          <HDButton iconLeft={tools.bag} onClick={checkout}>Finalizează rezervarea</HDButton>
        )}
      </div>
    </div>
  );
};

export default Reserve;
