import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { LANDS, TESTIMONIALS } from "@/data/mock";
import { Botanical } from "@/components/decor/Botanical";

const Landing = () => {
  const featured = LANDS.slice(0, 3);
  const featuredTestimonial = TESTIMONIALS[0];
  const moreTestimonials = TESTIMONIALS.slice(1, 3);

  return (
    <div className="overflow-x-hidden">
      {/* HERO — editorial 12-column */}
      <section className="relative pt-20 lg:pt-28 pb-32 lg:pb-40">
        <div className="container grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left content — cols 1-7 */}
          <div className="lg:col-span-7 animate-fade-up">
            <p className="eyebrow">Platformă de arendă agricolă · Moldova</p>
            <h1 className="mt-6 font-display text-5xl md:text-6xl lg:text-[68px] leading-[1.05] text-primary-deep font-light">
              Pământul tău,<br />
              <span className="font-script italic text-primary text-6xl md:text-7xl lg:text-[80px]">recolta</span> ta.
            </h1>
            <p className="mt-7 max-w-xl text-lg text-foreground/75 leading-[1.7]">
              Arendează un lot din Moldova, alege ce să crești, iar fermierii locali îți poartă de grijă culturilor — de la sapă până la coș.
            </p>

            <ul className="mt-8 space-y-2.5">
              {[
                "146 de loturi în 12 regiuni",
                "32 de fermieri verificați",
                "Peste 200 de clienți activi",
              ].map(item => (
                <li key={item} className="flex items-center gap-3 font-display text-[15px] text-foreground/85">
                  <Check className="h-4 w-4 text-primary shrink-0" strokeWidth={2} />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Link
                to="/lands"
                className="press inline-flex items-center justify-center h-12 px-8 rounded-md bg-primary text-primary-foreground hover:bg-primary-deep font-display text-[15px]"
              >
                Explorează loturi
              </Link>
              <Link
                to="/farmer"
                className="font-display text-[15px] text-primary-deep link-underline inline-flex items-center gap-2"
              >
                Sunt fermier <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </Link>
            </div>
          </div>

          {/* Right illustration — cols 8-12, partial bleed */}
          <div className="lg:col-span-5 relative">
            <div className="relative lg:absolute lg:inset-y-0 lg:-right-12 lg:left-0 flex items-center justify-center">
              <img
                src={illos.heroArrangement}
                alt="Aranjament botanic — sfeclă, roșii, morcovi, busuioc"
                className="w-full max-w-md lg:max-w-none lg:h-[640px] object-contain"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS — editorial article structure */}
      <section className="border-t border-border/70 py-24 lg:py-32">
        <div className="container">
          <div className="max-w-2xl mb-16">
            <p className="eyebrow">Procesul</p>
            <h2 className="mt-4 font-display text-4xl md:text-[44px] leading-[1.1] text-primary-deep font-normal">
              Trei pași până la prima recoltă.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-border/60 border-y border-border/60">
            {[
              { n: "01", title: "Alegi un lot", text: "Răsfoiești loturile din Dubăsari, Orhei sau Călărași. Vezi pozele, prețul, fermierul." },
              { n: "02", title: "Spui ce plantezi", text: "Roșii, ardei, cartofi — alegi culturile și împarți lotul după dorință." },
              { n: "03", title: "Noi îngrijim", text: "Fermierul local ară, plantează, udă, recoltează. Tu primești coșul gata pregătit." },
            ].map(step => (
              <div key={step.n} className="bg-background p-10">
                <span className="font-script text-5xl text-primary/40">{step.n}</span>
                <h3 className="mt-6 font-display text-2xl text-primary-deep">{step.title}</h3>
                <p className="mt-3 text-[15px] text-foreground/70 leading-[1.7]">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED LANDS — magazine grid */}
      <section className="bg-paper py-24 lg:py-32">
        <div className="container">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
            <div className="max-w-xl">
              <p className="eyebrow">Disponibile acum</p>
              <h2 className="mt-4 font-display text-4xl md:text-[44px] leading-[1.1] text-primary-deep font-normal">
                Loturi alese cu grijă.
              </h2>
            </div>
            <Link to="/lands" className="font-display text-[15px] text-primary-deep link-underline inline-flex items-center gap-2">
              Vezi toate loturile <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featured.map(land => (
              <Link key={land.id} to={`/lands/${land.id}`} className="group editorial-card overflow-hidden">
                <div className="img-zoom aspect-[4/3] overflow-hidden">
                  <img src={land.photo} alt={land.name} loading="lazy" className="w-full h-full object-cover" />
                </div>
                <div className="p-8">
                  <p className="eyebrow text-[10px]">{land.region}</p>
                  <h3 className="mt-2 font-display text-[22px] text-primary-deep leading-tight group-hover:text-primary transition-colors">
                    {land.name}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {land.features[0]} · {land.size} ha
                  </p>
                  <div className="mt-6 pt-6 border-t border-border/60 flex items-center justify-between">
                    <span className="font-display text-base text-primary-deep">
                      {land.pricePerAre} <span className="font-ui text-xs text-muted-foreground tracking-wide">MDL/AR</span>
                    </span>
                    <span className="font-ui text-[11px] uppercase tracking-widest text-muted-foreground">
                      {land.availablePlots}/{land.totalPlots} libere
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS — editorial pull-quotes */}
      <section className="py-24 lg:py-32">
        <div className="container max-w-5xl">
          <div className="mb-16">
            <p className="eyebrow">Mărturii</p>
            <h2 className="mt-4 font-display text-4xl md:text-[44px] leading-[1.1] text-primary-deep font-normal">
              Vorbele celor care au plantat.
            </h2>
          </div>

          {/* Featured */}
          <figure className="border-t border-b border-border/70 py-14">
            <div className="flex items-start gap-6">
              <span className="font-script text-7xl leading-none text-primary/50 -mt-2">"</span>
              <div className="flex-1">
                <blockquote className="font-display text-2xl md:text-[28px] italic leading-[1.5] text-primary-deep text-balance">
                  {featuredTestimonial.quote}
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4">
                  <span className="block w-10 h-px bg-primary/60" />
                  <div>
                    <p className="font-ui text-[11px] uppercase tracking-widest text-primary-deep">{featuredTestimonial.name}</p>
                    <p className="font-ui text-xs text-muted-foreground mt-0.5">Client din Moldova · Sezon 2025</p>
                  </div>
                </figcaption>
              </div>
            </div>
          </figure>

          {/* Smaller pair */}
          <div className="grid md:grid-cols-2 gap-12 mt-14">
            {moreTestimonials.map((t, i) => (
              <figure key={i}>
                <blockquote className="font-display text-lg italic leading-[1.6] text-foreground/85">
                  „{t.quote}"
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <span className="block w-8 h-px bg-primary/50" />
                  <p className="font-ui text-[11px] uppercase tracking-widest text-primary-deep">{t.name}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-paper py-24 lg:py-32 border-y border-border/70">
        <div className="container max-w-2xl text-center">
          <p className="eyebrow">Începe azi</p>
          <h2 className="mt-5 font-display text-4xl md:text-5xl leading-[1.1] text-primary-deep font-normal">
            Pământul tău <span className="font-script italic text-primary">așteaptă</span>.
          </h2>
          <p className="mt-5 text-lg text-foreground/75">
            Alege un lot și planifică sezonul.
          </p>
          <Link
            to="/lands"
            className="press mt-10 inline-flex items-center justify-center h-12 px-8 rounded-md bg-primary text-primary-foreground hover:bg-primary-deep font-display text-[15px]"
          >
            Vezi loturile disponibile
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;
