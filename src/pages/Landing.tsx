import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";
import { HDButton } from "@/components/decor/HDButton";
import { ScallopedFrame } from "@/components/decor/ScallopedFrame";
import { WavyDivider } from "@/components/decor/WavyDivider";
import { LANDS, TESTIMONIALS } from "@/data/mock";
import { botanicals, deco, tools, veg } from "@/assets";

const HowStep = ({ icon, n, title, text }: { icon: string; n: number; title: string; text: string }) => (
  <div className="relative bg-card rounded-[1.25rem] p-6 shadow-card border border-primary/20 hover-bow"
       style={{ ["--bow-url" as string]: `url(${deco.bow})` }}>
    <div className="absolute -top-3 -left-3 h-9 w-9 rounded-full bg-primary text-primary-foreground grid place-items-center font-script text-xl pt-1 shadow-paper">{n}</div>
    <img src={icon} alt="" className="h-20 w-20 object-contain mx-auto mb-2" />
    <h3 className="font-display font-bold text-lg text-center mb-1">{title}</h3>
    <p className="text-sm text-center text-muted-foreground text-pretty">{text}</p>
  </div>
);

const Landing = () => {
  const featured = LANDS.slice(0, 3);

  return (
    <div className="overflow-x-hidden">
      {/* HERO */}
      <section className="relative pt-10 md:pt-16 pb-24">
        {/* Scattered illustrations */}
        <img src={veg.tomatoes} alt="" className="hidden md:block absolute top-10 left-6 h-24 opacity-90 -rotate-12" />
        <img src={tools.wateringcan2} alt="" className="hidden md:block absolute top-32 left-32 h-28 opacity-90 rotate-6" />
        <img src={veg.carrot} alt="" className="hidden md:block absolute bottom-16 left-10 h-28 opacity-90 -rotate-6" />
        <img src={veg.eggplant} alt="" className="hidden md:block absolute top-20 right-8 h-24 opacity-90 rotate-12" />
        <img src={tools.shovel} alt="" className="hidden md:block absolute top-40 right-32 h-32 opacity-90 -rotate-12" />
        <img src={veg.cabbage} alt="" className="hidden md:block absolute bottom-20 right-12 h-28 opacity-90 rotate-6" />
        <img src={veg.peas} alt="" className="hidden md:block absolute bottom-10 right-40 h-20 opacity-90 -rotate-6" />
        <img src={tools.hat} alt="" className="hidden lg:block absolute top-6 left-1/2 h-20 opacity-90 -translate-x-1/2 -rotate-3" />

        <div className="container relative">
          <ScallopedFrame variant="oval" className="aspect-[16/11] max-w-2xl mx-auto mt-[15vh]">
            <span className="inline-flex items-center gap-2 text-sm font-display font-medium text-primary bg-accent/60 rounded-full px-4 py-1 mb-4">
              <Sparkles className="h-4 w-4" /> 146 de loturi · 32 de fermieri locali
            </span>
            <h1 className="font-script text-primary leading-[0.9] text-[clamp(3rem,8.5vw,7rem)]">
              MyGarden
            </h1>
            <p className="mt-2 font-script text-foreground text-2xl md:text-3xl">
              Arendează-ți propria grădină
            </p>
            <p className="mt-4 max-w-xl text-pretty text-foreground/80">
              Alege un lot de pământ în Moldova, alege ce vrei să crești, iar fermierii noștri locali îți poartă de grijă culturilor — de la sapă până la coș.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row items-center gap-3">
              <HDButton asChild iconLeft={tools.trowel}>
                <Link to="/lands">
                  Găsește lotul tău <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </HDButton>
              <HDButton asChild tone="cream">
                <Link to="/farmer">Sunt fermier</Link>
              </HDButton>
            </div>
          </ScallopedFrame>
        </div>
      </section>

      <WavyDivider veg={veg.tomatoes} />

      {/* HOW IT WORKS */}
      <section className="container">
        <header className="text-center mb-12">
          <p className="font-script text-3xl text-primary">Așa de simplu</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-1">Cum funcționează MyGarden</h2>
          <p className="mt-3 max-w-2xl mx-auto text-muted-foreground">
            Trei pași până ai propria grădină. Restul îl facem împreună, ca-n vechime, cu mâinile potrivite la locul potrivit.
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          <HowStep n={1} icon={tools.bag} title="Alegi un lot" text="Răsfoiești loturile noastre din toată Moldova, vezi pozele, prețul și fermierul." />
          <HowStep n={2} icon={veg.tomatoes} title="Spui ce plantezi" text="Roșii, ardei, cartofi — alegi culturile potrivite și împărți lotul după plac." />
          <HowStep n={3} icon={tools.wateringcan2} title="Noi le îngrijim" text="Fermierul local udă, plivește, recoltează. Tu primești coșul, gata pregătit." />
        </div>
      </section>

      <WavyDivider veg={veg.carrot} />

      {/* FEATURED LANDS */}
      <section className="container">
        <header className="flex items-end justify-between mb-8 flex-wrap gap-4">
          <div>
            <p className="font-script text-3xl text-primary">Pământ ales cu grijă</p>
            <h2 className="font-display text-4xl font-bold mt-1">Loturi disponibile</h2>
          </div>
          <Link to="/lands" className="font-display font-semibold text-primary hover:underline inline-flex items-center gap-1">
            Vezi toate loturile <ArrowRight className="h-4 w-4" />
          </Link>
        </header>

        <div className="grid md:grid-cols-3 gap-7">
          {featured.map(land => (
            <Link key={land.id} to={`/lands/${land.id}`} className="group block">
              <article className="bg-card rounded-[1.25rem] overflow-hidden shadow-card border border-primary/20 transition-transform group-hover:scale-[1.02]">
                <div className="relative">
                  <img src={land.photo} alt={land.name} loading="lazy" className="aspect-[4/3] w-full object-cover" />
                  <div className="absolute top-3 left-3 bg-paper/95 backdrop-blur rounded-full px-3 py-1 text-xs font-display font-semibold text-primary border border-primary/30">
                    {land.availablePlots}/{land.totalPlots} loturi libere
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-script text-3xl text-primary leading-tight">{land.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1 inline-flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" /> {land.village}, {land.region}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-display font-bold text-primary-deep">
                      {land.pricePerAre} <span className="text-xs text-muted-foreground font-normal">MDL / ar / sezon</span>
                    </span>
                    <span className="text-xs font-display font-medium text-primary">Vezi lot →</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      <WavyDivider veg={veg.cabbage} />

      {/* TESTIMONIALS */}
      <section className="container">
        <header className="text-center mb-12">
          <p className="font-script text-3xl text-primary">Vorbele lor</p>
          <h2 className="font-display text-4xl font-bold mt-1">Ce spun grădinarii noștri</h2>
        </header>

        <div className="grid md:grid-cols-3 gap-6 md:gap-10">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="relative pt-8">
              <div className="relative aspect-[5/4] flex items-center justify-center">
                <ScallopedFrame variant="oval" className="absolute inset-0">
                  <p className="font-script text-2xl leading-snug text-foreground text-balance">"{t.quote}"</p>
                  <p className="mt-3 text-sm font-display font-semibold text-primary">— {t.name}</p>
                </ScallopedFrame>
              </div>
              <img src={t.veg} alt="" className="absolute -top-2 left-1/2 -translate-x-1/2 h-16 object-contain" />
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mt-24">
        <div className="relative bg-paper rounded-[2rem] border-2 border-primary/40 p-10 md:p-14 text-center overflow-hidden shadow-card">
          <img src={botanicals.wheelbarrowVeg} alt="" className="absolute -left-6 -bottom-6 h-44 opacity-90 hidden md:block" />
          <img src={botanicals.bouquetBow} alt="" className="absolute -right-2 -top-6 h-40 opacity-90 hidden md:block" />
          <p className="font-script text-3xl text-primary">E rândul tău</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-1 max-w-2xl mx-auto text-balance">
            Pământul așteaptă mâini bune. Vino să-i fii grădinar.
          </h2>
          <div className="mt-7">
            <HDButton asChild iconLeft={tools.trowel}>
              <Link to="/lands">Găsește lotul tău</Link>
            </HDButton>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
