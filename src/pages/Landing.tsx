import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { LANDS, TESTIMONIALS } from "@/data/mock";
import { Botanical } from "@/components/decor/Botanical";
import { BotanicalSVG } from "@/components/decor/BotanicalSVG";

const Landing = () => {
  const featured = LANDS.slice(0, 3);
  const featuredTestimonial = TESTIMONIALS[0];
  const moreTestimonials = TESTIMONIALS.slice(1, 3);

  return (
    <div className="overflow-x-hidden">
      {/* HERO — editorial 12-column */}
      <section className="relative pt-16 lg:pt-20 pb-24 lg:pb-32">
        <div className="container grid grid-cols-1 lg:grid-cols-12 gap-y-14 gap-x-10 xl:gap-x-16 items-center">
          {/* Left content — 7/12 on desktop, full on mobile/tablet */}
          <div className="lg:col-span-7 xl:col-span-7 max-w-2xl animate-fade-up">
            <p className="eyebrow">Platformă de arendă agricolă · Moldova</p>
            <h1 className="mt-6 font-display text-5xl md:text-6xl lg:text-[68px] leading-[1.05] text-primary-deep font-light">
              Pământul tău,<br />
              <span className="font-script italic text-primary text-6xl md:text-7xl lg:text-[80px]">recolta</span> ta.
            </h1>
            <p className="mt-7 max-w-xl text-lg text-primary-deep/85 leading-[1.7]">
              Arendează un lot din Moldova, alege ce să crești, iar fermierii locali îți poartă de grijă culturilor — de la sapă până la coș.
            </p>

            <ul className="mt-8 space-y-2.5">
              {[
                "146 de loturi în 12 regiuni",
                "32 de fermieri verificați",
                "Peste 200 de clienți activi",
              ].map(item => (
                <li key={item} className="flex items-center gap-3 font-ui text-[15px] text-foreground/90">
                  <Check className="h-4 w-4 text-primary shrink-0" strokeWidth={2.4} />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/lands"
                className="press inline-flex items-center justify-center h-12 px-8 rounded-md bg-primary text-primary-foreground hover:bg-primary-deep font-ui text-[15px] font-semibold shadow-card"
              >
                Explorează loturi
              </Link>
              <Link
                to="/farmer"
                className="press inline-flex items-center gap-2 h-12 px-6 rounded-md border border-primary/40 text-primary-deep hover:bg-primary/5 font-ui text-[15px] font-semibold"
              >
                Sunt fermier <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </Link>
            </div>
          </div>

          {/* Right illustration — compact botanical collage */}
          <div className="lg:col-span-5 xl:col-span-5 relative w-full">
            <div className="relative w-full max-w-[380px] lg:max-w-[420px] aspect-square mx-auto lg:ml-auto lg:mr-0">
              {/* Soft cream paper backdrop — smaller, offset */}
              <div className="absolute inset-[6%] bg-paper rounded-full opacity-70 shadow-paper" aria-hidden />
              <div className="absolute inset-[14%] rounded-full border border-primary/15" aria-hidden />

              {/* Centerpiece — greenhouse */}
              <div className="absolute inset-0 grid place-items-center">
                <Botanical cat="decor" slug="greenhouse" className="text-primary-deep w-[60%] h-[60%]" title="Seră" />
              </div>

              {/* Top-left — tomato */}
              <Botanical cat="vegetables" slug="tomato" className="absolute top-2 left-2 w-20 h-20 text-primary rotate-[-8deg]" />
              {/* Top-right — sunflower */}
              <Botanical cat="flowers" slug="sunflower" className="absolute top-6 right-0 w-24 h-24 text-primary-deep rotate-[6deg]" />
              {/* Bottom-left — watering can */}
              <Botanical cat="tools" slug="watering-can" className="absolute bottom-0 left-0 w-24 h-24 text-primary" />
              {/* Bottom-right — cherries */}
              <Botanical cat="vegetables" slug="cherries" className="absolute bottom-2 right-2 w-20 h-20 text-primary-deep rotate-[10deg]" />
              {/* Floating bee */}
              <Botanical cat="accents" slug="bee" className="absolute top-1/3 -left-4 w-12 h-12 text-primary animate-sway" />
            </div>
          </div>
        </div>
      </section>

      {/* Wave divider */}
      <div className="container">
        <BotanicalSVG name="dividers/wave" className="block w-full h-6 text-primary/40" />
      </div>

      {/* HOW IT WORKS — editorial article structure */}
      <section className="border-t border-border/70 py-24 lg:py-32 mt-4">
        <div className="container">
          <div className="max-w-2xl mb-16">
            <p className="eyebrow">Procesul</p>
            <h2 className="mt-4 font-display text-4xl md:text-[44px] leading-[1.1] text-primary-deep font-normal">
              Trei pași până la prima recoltă.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-border/60 border-y border-border/60">
            {[
              { n: "01", title: "Alegi un lot", text: "Răsfoiești loturile din Dubăsari, Orhei sau Călărași. Vezi pozele, prețul, fermierul.", cat: "decor" as const, slug: "garden-door" },
              { n: "02", title: "Spui ce plantezi", text: "Roșii, ardei, cartofi — alegi culturile și împarți lotul după dorință.", cat: "vegetables" as const, slug: "tomato" },
              { n: "03", title: "Noi îngrijim", text: "Fermierul local ară, plantează, udă, recoltează. Tu primești coșul gata pregătit.", cat: "decor" as const, slug: "veggie-basket" },
            ].map(step => (
              <div key={step.n} className="bg-background p-10 relative">
                <Botanical cat={step.cat} slug={step.slug} className="absolute top-8 right-8 w-16 h-16 text-primary/35" />
                <span className="font-script text-5xl text-primary/40 relative">{step.n}</span>
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
              <Link key={land.id} to={`/lands/${land.id}`} className="group editorial-card overflow-hidden flex flex-col">
                <div className="img-zoom aspect-[4/3] overflow-hidden">
                  <img src={land.photo} alt={land.name} loading="lazy" className="w-full h-full object-cover" />
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <p className="eyebrow text-[10px]">{land.region}</p>
                  <h3 className="mt-2 font-display text-[22px] text-primary-deep leading-tight group-hover:text-primary transition-colors">
                    {land.name}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {land.features[0]} · {land.size} ha
                  </p>
                  <div className="mt-6 pt-6 border-t border-border/60 flex items-center justify-between">
                    <span className="font-ui text-base font-bold text-primary-deep num">
                      {land.pricePerAre}<span className="font-ui text-xs font-medium text-muted-foreground tracking-wide ml-1">MDL/ar</span>
                    </span>
                    <span className="font-ui text-xs font-medium text-foreground/75 num">
                      {land.availablePlots} din {land.totalPlots} libere
                    </span>
                  </div>
                  <span className="mt-5 inline-flex items-center gap-1.5 font-ui text-[13px] font-semibold text-primary group-hover:gap-2.5 transition-all">
                    Vezi detalii <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
                  </span>
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
          <Botanical cat="flowers" slug="flower-bouquet" className="mx-auto w-24 h-24 text-primary mb-4" />
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
