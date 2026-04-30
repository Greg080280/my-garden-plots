import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MapPin, Check, Sprout, Droplets } from "lucide-react";
import { LANDS, buildPlots } from "@/data/mock";
import { findUserById } from "@/context/AuthContext";
import { HDButton } from "@/components/decor/HDButton";
import { ScallopedFrame } from "@/components/decor/ScallopedFrame";
import { botanicals, deco, tools } from "@/assets";

const LandDetail = () => {
  const { id } = useParams<{ id: string }>();
  const land = LANDS.find(l => l.id === id);
  const plots = useMemo(() => land ? buildPlots(land) : [], [land]);
  const [selected, setSelected] = useState<string | null>(null);
  const [activeImg, setActiveImg] = useState(0);

  if (!land) return (
    <div className="container py-20 text-center">
      <p className="font-script text-4xl text-primary">Hmm... nu am găsit acest lot.</p>
      <Link to="/lands" className="text-primary underline mt-4 inline-block">Înapoi la loturi</Link>
    </div>
  );

  const selectedPlot = plots.find(p => p.id === selected);

  return (
    <div className="container py-10">
      <Link to="/lands" className="text-sm font-display text-primary hover:underline">← Toate loturile</Link>

      <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 mt-4">
        {/* Gallery */}
        <div>
          <div className="rounded-2xl overflow-hidden border-2 border-primary/30 shadow-card">
            <img src={land.gallery[activeImg]} alt={land.name} className="w-full aspect-[4/3] object-cover" />
          </div>
          <div className="grid grid-cols-3 gap-3 mt-3">
            {land.gallery.map((g, i) => (
              <button key={i} onClick={() => setActiveImg(i)}
                className={`rounded-xl overflow-hidden border-2 transition-all ${activeImg === i ? "border-primary scale-[1.02]" : "border-primary/20"}`}>
                <img src={g} alt="" className="w-full aspect-[4/3] object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="relative">
          <img src={botanicals.bouquetBow} alt="" className="absolute -top-6 -right-2 h-32 opacity-80 hidden lg:block" />
          <p className="font-script text-3xl text-primary">Bun găsit la</p>
          <h1 className="font-display text-4xl font-bold leading-tight">{land.name}</h1>
          <p className="text-muted-foreground mt-2 inline-flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {land.village}, {land.region}</p>
          <p className="mt-4 text-foreground/85 text-pretty leading-relaxed">{land.description}</p>

          <div className="mt-5 grid grid-cols-2 gap-3">
            {land.features.map(f => (
              <div key={f} className="inline-flex items-start gap-2 text-sm bg-accent/40 rounded-xl px-3 py-2 border border-primary/20">
                <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" /> {f}
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-6 bg-paper border border-primary/30 rounded-2xl p-4">
            <div>
              <p className="text-xs text-muted-foreground">Preț</p>
              <p className="font-display font-bold text-2xl text-primary-deep">{land.pricePerAre} <span className="text-sm font-normal text-muted-foreground">MDL/ar/sezon</span></p>
            </div>
            <div className="h-10 w-px bg-primary/20" />
            <div>
              <p className="text-xs text-muted-foreground">Fermier</p>
              <p className="font-display font-semibold">{findUserById(land.farmerId)?.name ?? "Fermier"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Plot picker */}
      <section className="mt-14">
        <header className="text-center mb-8">
          <p className="font-script text-3xl text-primary">Alege-ți colțișorul</p>
          <h2 className="font-display text-3xl font-bold">Loturi disponibile</h2>
          <p className="text-muted-foreground text-sm mt-1">Verde = liber · Maro = ocupat · Bow = ales de tine</p>
        </header>

        <div className="bg-card border border-primary/25 rounded-2xl p-6 shadow-paper">
          <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-3">
            {plots.map(p => {
              const isSel = selected === p.id;
              return (
                <button
                  key={p.id}
                  disabled={p.status !== "available"}
                  onClick={() => setSelected(p.id)}
                  className={`relative aspect-square rounded-xl font-display font-bold text-sm transition-all press
                    ${p.status !== "available" ? "bg-brown/20 text-brown/60 border border-brown/30 cursor-not-allowed"
                      : isSel ? "bg-primary text-primary-foreground border-2 border-primary-deep shadow-paper"
                      : "bg-secondary/60 text-foreground border-2 border-primary/40 hover:bg-secondary"}`}
                >
                  {p.code}
                  <span className="block text-[10px] font-normal opacity-80 mt-0.5">{p.area} ari</span>
                  {isSel && <img src={deco.bow} alt="" className="absolute -top-3 -right-3 h-7 w-7 object-contain" />}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-paper border border-primary/30 rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <img src={tools.trowel} alt="" className="h-12 w-12 object-contain" />
            <div>
              <p className="font-display font-semibold">{selectedPlot ? `Lot ales: ${selectedPlot.code} (${selectedPlot.area} ari)` : "Niciun lot ales încă"}</p>
              <p className="text-xs text-muted-foreground">{selectedPlot ? `Estimare: ${(selectedPlot.area * land.pricePerAre).toFixed(0)} MDL / sezon` : "Atinge un pătrat verde."}</p>
            </div>
          </div>
          <HDButton asChild disabled={!selected} iconLeft={tools.wateringcan2}>
            <Link to={selected ? `/reserve/${land.id}?plot=${selectedPlot?.code}` : "#"}>Rezervă acest lot</Link>
          </HDButton>
        </div>
      </section>

      {/* Mini wreath flourish */}
      <div className="text-center mt-16">
        <ScallopedFrame variant="oval" className="aspect-[3/1] max-w-2xl mx-auto">
          <div className="grid grid-cols-3 gap-4 items-center w-full">
            <div className="text-center"><Sprout className="h-7 w-7 text-primary mx-auto" /><p className="font-display font-semibold text-sm mt-1">Plantăm cu drag</p></div>
            <div className="text-center"><Droplets className="h-7 w-7 text-primary mx-auto" /><p className="font-display font-semibold text-sm mt-1">Udăm zilnic</p></div>
            <div className="text-center"><img src={tools.bag} alt="" className="h-9 mx-auto" /><p className="font-display font-semibold text-sm mt-1">Recoltăm pentru tine</p></div>
          </div>
        </ScallopedFrame>
      </div>
    </div>
  );
};

export default LandDetail;
