import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import { LANDS, buildPlots } from "@/data/mock";
import { findUserById } from "@/context/AuthContext";

const LandDetail = () => {
  const { id } = useParams<{ id: string }>();
  const land = LANDS.find(l => l.id === id);
  const plots = useMemo(() => land ? buildPlots(land) : [], [land]);
  const [selected, setSelected] = useState<string | null>(null);
  const [activeImg, setActiveImg] = useState(0);

  if (!land) return (
    <div className="container py-32 text-center">
      <p className="font-display text-3xl text-primary-deep italic">Lotul nu a fost găsit.</p>
      <Link to="/lands" className="text-primary-deep link-underline mt-6 inline-block font-display">Înapoi la loturi</Link>
    </div>
  );

  const selectedPlot = plots.find(p => p.id === selected);

  return (
    <div className="container py-12 lg:py-16">
      <Link to="/lands" className="inline-flex items-center gap-2 font-ui text-[11px] uppercase tracking-widest text-muted-foreground hover:text-primary-deep">
        <ArrowLeft className="h-3 w-3" strokeWidth={1.5} /> Toate loturile
      </Link>

      <div className="grid lg:grid-cols-[1.3fr_1fr] gap-16 mt-8">
        {/* Gallery */}
        <div>
          <div className="rounded-md overflow-hidden border border-border">
            <img src={land.gallery[activeImg]} alt={land.name} className="w-full aspect-[4/3] object-cover" />
          </div>
          <div className="grid grid-cols-3 gap-3 mt-3">
            {land.gallery.map((g, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`rounded-md overflow-hidden border transition-opacity ${activeImg === i ? "border-primary opacity-100" : "border-border opacity-70 hover:opacity-100"}`}
              >
                <img src={g} alt="" className="w-full aspect-[4/3] object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <p className="eyebrow">{land.region}</p>
          <h1 className="mt-3 font-display text-4xl md:text-5xl text-primary-deep leading-[1.05] font-normal">
            {land.name}
          </h1>
          <p className="mt-3 font-ui text-sm text-muted-foreground tracking-wide">{land.village}, {land.region}</p>

          <p className="mt-7 text-lg text-foreground/80 leading-[1.7]">{land.description}</p>

          <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3">
            {land.features.map(f => (
              <li key={f} className="flex items-start gap-2.5 font-display text-[15px] text-foreground/85">
                <Check className="h-4 w-4 text-primary mt-1 shrink-0" strokeWidth={2} />
                {f}
              </li>
            ))}
          </ul>

          <div className="mt-10 pt-8 border-t border-border/70 grid grid-cols-2 gap-8">
            <div>
              <p className="eyebrow text-[10px]">Preț</p>
              <p className="mt-2 font-display text-3xl text-primary-deep">
                {land.pricePerAre} <span className="font-ui text-xs text-muted-foreground tracking-wide">MDL/AR/SEZON</span>
              </p>
            </div>
            <div>
              <p className="eyebrow text-[10px]">Fermier</p>
              <p className="mt-2 font-display text-xl text-primary-deep">{findUserById(land.farmerId)?.name ?? "Fermier"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Plot picker */}
      <section className="mt-24 pt-16 border-t border-border/70">
        <div className="mb-10">
          <p className="eyebrow">Alege un colțișor</p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl text-primary-deep font-normal">Loturi disponibile</h2>
          <p className="mt-3 font-ui text-sm text-muted-foreground">
            <span className="inline-block h-2 w-2 bg-secondary mr-1.5 rounded-sm" /> Liber
            <span className="inline-block h-2 w-2 bg-brown/40 ml-5 mr-1.5 rounded-sm" /> Ocupat
            <span className="inline-block h-2 w-2 bg-primary ml-5 mr-1.5 rounded-sm" /> Selectat
          </p>
        </div>

        <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
          {plots.map(p => {
            const isSel = selected === p.id;
            return (
              <button
                key={p.id}
                disabled={p.status !== "available"}
                onClick={() => setSelected(p.id)}
                className={`aspect-square rounded-sm font-display text-sm transition-all press border ${
                  p.status !== "available"
                    ? "bg-brown/10 text-brown/50 border-brown/20 cursor-not-allowed"
                    : isSel
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-secondary/40 text-primary-deep border-border hover:border-primary"
                }`}
              >
                {p.code}
                <span className="block font-ui text-[9px] tracking-wide opacity-70 mt-0.5">{p.area}a</span>
              </button>
            );
          })}
        </div>

        <div className="mt-10 pt-8 border-t border-border/70 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="eyebrow text-[10px]">Selecție</p>
            <p className="mt-2 font-display text-xl text-primary-deep">
              {selectedPlot ? `Lot ${selectedPlot.code} — ${selectedPlot.area} ari` : "Niciun lot ales"}
            </p>
            <p className="mt-1 text-sm text-muted-foreground font-ui">
              {selectedPlot
                ? `Estimare: ${(selectedPlot.area * land.pricePerAre).toFixed(0)} MDL / sezon`
                : "Atinge un pătrat verde pentru a alege."}
            </p>
          </div>
          {selectedPlot ? (
            <Link
              to={`/reserve/${land.id}?plot=${selectedPlot.code}`}
              className="press inline-flex items-center justify-center h-12 px-8 rounded-md bg-primary text-primary-foreground hover:bg-primary-deep font-display text-[15px]"
            >
              Rezervă acest lot
            </Link>
          ) : (
            <button
              disabled
              className="inline-flex items-center justify-center h-12 px-8 rounded-md bg-muted text-muted-foreground font-display text-[15px] cursor-not-allowed"
            >
              Rezervă
            </button>
          )}
        </div>
      </section>
    </div>
  );
};

export default LandDetail;
