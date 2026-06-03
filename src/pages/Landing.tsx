import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, HelpCircle, Sprout, Users, ShieldCheck, Leaf } from "lucide-react";
import { LANDS, TESTIMONIALS } from "@/data/mock";
import { Botanical } from "@/components/decor/Botanical";
import { BotanicalSVG } from "@/components/decor/BotanicalSVG";
import heroField from "@/assets/hero-field.jpg";
import heroFamily from "@/assets/hero-family.jpg";

const Landing = () => {
  const featured = LANDS.slice(0, 3);
  const featuredTestimonial = TESTIMONIALS[0];
  const moreTestimonials = TESTIMONIALS.slice(1, 3);

  const totalLands = LANDS.length;
  const freePlots = LANDS.reduce((sum, l) => sum + l.availablePlots, 0);
  const regions = new Set(LANDS.map(l => l.region)).size;

  return (
    <div className="overflow-x-hidden">
      {/* ─────────────────────────────────────────── */}
      {/* HERO — full-bleed cinematic photo + overlay */}
      {/* ─────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden -mt-px">
        {/* Background photo */}
        <img
          src={heroField}
          alt=""
          aria-hidden
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />

        {/* Multi-layer overlay for legibility + cinematic depth */}
        {/* 1. base darkening */}
        <div className="absolute inset-0 bg-primary-deep/35" aria-hidden />
        {/* 2. vertical gradient — darker bottom, slight darker top */}
        <div
          className="absolute inset-0"
          aria-hidden
          style={{
            background:
              "linear-gradient(180deg, hsl(var(--primary-deep) / 0.55) 0%, hsl(var(--primary-deep) / 0.15) 38%, hsl(var(--primary-deep) / 0.25) 62%, hsl(var(--primary-deep) / 0.75) 100%)",
          }}
        />
        {/* 3. radial vignette — focuses on the headline */}
        <div
          className="absolute inset-0"
          aria-hidden
          style={{
            background:
              "radial-gradient(ellipse at 50% 45%, transparent 0%, transparent 35%, hsl(var(--primary-deep) / 0.45) 100%)",
          }}
        />
        {/* 4. subtle warm tint */}
        <div className="absolute inset-0 mix-blend-soft-light bg-[hsl(38_70%_50%)]/10" aria-hidden />

        {/* Content */}
        <div className="relative container text-center py-24 lg:py-32 animate-fade-up">
          {/* Eyebrow pill */}
          <span className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-cream-soft/95 backdrop-blur-sm border border-white/40 shadow-card font-ui text-[11px] uppercase tracking-[0.18em] text-primary-deep font-semibold">
            <Sprout className="h-3.5 w-3.5 text-primary" strokeWidth={2.2} />
            Loturi agricole · Moldova
          </span>

          {/* Headline */}
          <h1 className="mt-8 font-display font-light leading-[1.02] text-cream-soft text-5xl md:text-7xl lg:text-[88px] drop-shadow-[0_2px_24px_rgba(0,0,0,0.35)]">
            Arendează un lot.<br />
            Cultivă ce vrei.<br />
            <span className="font-script italic text-[hsl(38_85%_75%)]">Primește recolta.</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-8 max-w-xl mx-auto text-cream-soft/90 text-lg leading-[1.7] drop-shadow">
            Alege un teren din Moldova, plantează ce dorești și fermierii locali îți poartă de grijă de la sapă până la coș.
          </p>

          {/* CTAs */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/lands"
              className="press inline-flex items-center gap-2 h-14 px-8 rounded-lg bg-primary text-primary-foreground hover:bg-primary-deep font-ui text-[15px] font-semibold shadow-card"
            >
              <BookOpen className="h-5 w-5" strokeWidth={2} />
              Vezi terenuri disponibile
            </Link>
            <a
              href="#how"
              className="press inline-flex items-center gap-2 h-14 px-8 rounded-lg bg-cream-soft/15 backdrop-blur-md border border-cream-soft/40 text-cream-soft hover:bg-cream-soft/25 font-ui text-[15px] font-semibold"
            >
              <HelpCircle className="h-5 w-5" strokeWidth={2} />
              Cum funcționează?
            </a>
          </div>

          {/* Stats */}
          <div className="mt-16 flex flex-wrap items-start justify-center gap-x-16 gap-y-8">
            {[
              { value: `${totalLands}+`, label: "Terenuri" },
              { value: `${freePlots}+`, label: "Loturi libere" },
              { value: `${regions}`, label: "Regiuni" },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <div className="font-display font-light text-[hsl(38_85%_75%)] text-4xl md:text-5xl num drop-shadow">
                  {stat.value}
                </div>
                <div className="mt-2 font-ui text-[11px] uppercase tracking-[0.18em] text-cream-soft/90 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll cue */}
        <a
          href="#how"
          aria-label="Scroll la conținut"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cream-soft/70 hover:text-cream-soft transition-colors"
        >
          <span className="font-ui text-[10px] uppercase tracking-[0.25em]">Descoperă</span>
          <span className="block w-px h-10 bg-cream-soft/50 animate-pulse" />
        </a>
      </section>

      {/* ─────────────────────────────────────────── */}
      {/* TRUST BAND — quick reassurance row          */}
      {/* ─────────────────────────────────────────── */}
      <section className="border-y border-border/70 bg-paper">
        <div className="container py-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
          {[
            { icon: ShieldCheck, label: "Fermieri verificați" },
            { icon: Leaf, label: "Cultură curată" },
            { icon: Users, label: "200+ clienți activi" },
            { icon: Sprout, label: "Sezon 2025 deschis" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center justify-center md:justify-start gap-3">
              <Icon className="h-5 w-5 text-primary shrink-0" strokeWidth={1.8} />
              <span className="font-ui text-[13px] font-medium text-primary-deep/90">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────── */}
      {/* HOW IT WORKS                                */}
      {/* ─────────────────────────────────────────── */}
      <section id="how" className="py-24 lg:py-32 scroll-mt-20">
        <div className="container">
          <div className="max-w-2xl mb-16">
            <p className="eyebrow">Procesul</p>
            <h2 className="mt-4 font-display text-4xl md:text-[44px] leading-[1.1] text-primary-deep font-normal">
              Trei pași până la <span className="font-script italic text-primary">prima recoltă</span>.
            </h2>
            <p className="mt-5 text-foreground/70 leading-[1.7]">
              Fără bătăi de cap. Tu alegi, noi muncim, tu culegi.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-border/60 border-y border-border/60">
            {[
              { n: "01", title: "Alegi un lot", text: "Răsfoiești loturile din Dubăsari, Orhei sau Călărași. Vezi pozele, prețul, fermierul.", cat: "decor" as const, slug: "garden-door" },
              { n: "02", title: "Spui ce plantezi", text: "Roșii, ardei, cartofi — alegi culturile și împarți lotul după dorință.", cat: "vegetables" as const, slug: "tomato" },
              { n: "03", title: "Noi îngrijim", text: "Fermierul local ară, plantează, udă, recoltează. Tu primești coșul gata pregătit.", cat: "decor" as const, slug: "veggie-basket" },
            ].map(step => (
              <div key={step.n} className="bg-background p-10 relative group hover:bg-paper/60 transition-colors">
                <Botanical
                  cat={step.cat}
                  slug={step.slug}
                  className="absolute top-8 right-8 w-20 h-20 text-primary/35 group-hover:text-primary/60 group-hover:rotate-3 transition-all duration-500"
                />
                <span className="font-script text-6xl text-primary/45 relative">{step.n}</span>
                <h3 className="mt-6 font-display text-2xl text-primary-deep">{step.title}</h3>
                <p className="mt-3 text-[15px] text-foreground/70 leading-[1.7] max-w-[28ch]">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────── */}
      {/* FEATURED LANDS — magazine grid              */}
      {/* ─────────────────────────────────────────── */}
      <section className="bg-paper py-24 lg:py-32 border-y border-border/70">
        <div className="container">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
            <div className="max-w-xl">
              <p className="eyebrow">Disponibile acum</p>
              <h2 className="mt-4 font-display text-4xl md:text-[44px] leading-[1.1] text-primary-deep font-normal">
                Loturi alese <span className="font-script italic text-primary">cu grijă</span>.
              </h2>
            </div>
            <Link to="/lands" className="font-ui text-[14px] font-semibold text-primary-deep link-underline inline-flex items-center gap-2">
              Vezi toate loturile <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featured.map(land => (
              <Link key={land.id} to={`/lands/${land.id}`} className="group editorial-card overflow-hidden flex flex-col bg-background">
                <div className="img-zoom aspect-[4/3] overflow-hidden relative">
                  <img src={land.photo} alt={land.name} loading="lazy" className="w-full h-full object-cover" />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-cream-soft/95 backdrop-blur font-ui text-[10px] uppercase tracking-widest text-primary-deep font-semibold">
                    {land.region}
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="font-display text-[22px] text-primary-deep leading-tight group-hover:text-primary transition-colors">
                    {land.name}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {land.features[0]} · {land.size} ha
                  </p>
                  <div className="mt-6 pt-6 border-t border-border/60 flex items-center justify-between">
                    <span className="font-ui text-base font-bold text-primary-deep num">
                      {land.pricePerAre}
                      <span className="font-ui text-xs font-medium text-muted-foreground tracking-wide ml-1">MDL/ar</span>
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

      {/* ─────────────────────────────────────────── */}
      {/* TESTIMONIALS                                */}
      {/* ─────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        {/* Decorative botanical wash */}
        <Botanical cat="flowers" slug="leaf-sprig" className="absolute -top-10 -right-10 w-72 h-72 text-primary/8 rotate-12" />
        <Botanical cat="flowers" slug="rosemary-sprig" className="absolute -bottom-10 -left-10 w-72 h-72 text-primary/8 -rotate-12" />

        <div className="container max-w-5xl relative">
          <div className="mb-16 text-center">
            <p className="eyebrow">Mărturii</p>
            <h2 className="mt-4 font-display text-4xl md:text-[44px] leading-[1.1] text-primary-deep font-normal">
              Vorbele celor care <span className="font-script italic text-primary">au plantat</span>.
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
                    <p className="font-ui text-[11px] uppercase tracking-widest text-primary-deep font-semibold">{featuredTestimonial.name}</p>
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
                  <p className="font-ui text-[11px] uppercase tracking-widest text-primary-deep font-semibold">{t.name}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────── */}
      {/* CTA — cinematic closer                      */}
      {/* ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <img
          src={heroField}
          alt=""
          aria-hidden
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary-deep/75" aria-hidden />
        <div
          className="absolute inset-0"
          aria-hidden
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 0%, hsl(var(--primary-deep) / 0.5) 100%)",
          }}
        />

        <div className="relative container max-w-3xl text-center py-24 lg:py-36">
          <Botanical cat="flowers" slug="flower-bouquet" className="mx-auto w-24 h-24 text-[hsl(38_85%_75%)] mb-6" />
          <p className="font-ui text-[11px] uppercase tracking-[0.25em] text-[hsl(38_85%_75%)] font-semibold">Începe azi</p>
          <h2 className="mt-5 font-display font-light text-4xl md:text-6xl leading-[1.05] text-cream-soft">
            Pământul tău<br />
            <span className="font-script italic text-[hsl(38_85%_75%)]">așteaptă</span>.
          </h2>
          <p className="mt-6 text-lg text-cream-soft/85 max-w-xl mx-auto">
            Alege un lot, plantează ce dorești, și lasă restul pe seama fermierilor noștri.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/lands"
              className="press inline-flex items-center gap-2 h-14 px-8 rounded-lg bg-primary text-primary-foreground hover:bg-primary-deep font-ui text-[15px] font-semibold shadow-card"
            >
              <BookOpen className="h-5 w-5" strokeWidth={2} />
              Vezi loturile disponibile
            </Link>
            <Link
              to="/farmer"
              className="press inline-flex items-center gap-2 h-14 px-8 rounded-lg bg-cream-soft/15 backdrop-blur-md border border-cream-soft/40 text-cream-soft hover:bg-cream-soft/25 font-ui text-[15px] font-semibold"
            >
              Sunt fermier <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
