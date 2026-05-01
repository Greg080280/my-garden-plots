import { Link } from "react-router-dom";

export const Footer = () => (
  <footer className="mt-32 border-t border-border/70 bg-background">
    <div className="container py-20 grid md:grid-cols-12 gap-10">
      <div className="md:col-span-4">
        <span className="font-script text-3xl text-primary-deep block mb-3">MyGarden</span>
        <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
          Pământ adevărat, îngrijit cu grijă, în mijlocul Moldovei. Pentru oameni care vor să știe de unde vine recolta lor.
        </p>
      </div>

      <div className="md:col-span-2">
        <h4 className="font-ui text-[11px] uppercase tracking-widest text-primary mb-4">Explorează</h4>
        <ul className="space-y-2.5 font-display text-[15px]">
          <li><Link to="/lands" className="link-underline text-foreground/80 hover:text-primary-deep">Loturi</Link></li>
          <li><Link to="/marketplace" className="link-underline text-foreground/80 hover:text-primary-deep">Magazin</Link></li>
          <li><Link to="/dashboard" className="link-underline text-foreground/80 hover:text-primary-deep">Grădina mea</Link></li>
          <li><Link to="/farmer" className="link-underline text-foreground/80 hover:text-primary-deep">Pentru fermieri</Link></li>
        </ul>
      </div>

      <div className="md:col-span-2">
        <h4 className="font-ui text-[11px] uppercase tracking-widest text-primary mb-4">Despre</h4>
        <ul className="space-y-2.5 font-display text-[15px]">
          <li><a href="#" className="link-underline text-foreground/80 hover:text-primary-deep">Cum funcționează</a></li>
          <li><a href="#" className="link-underline text-foreground/80 hover:text-primary-deep">Întrebări</a></li>
          <li><a href="#" className="link-underline text-foreground/80 hover:text-primary-deep">Despre noi</a></li>
          <li><a href="#" className="link-underline text-foreground/80 hover:text-primary-deep">Contact</a></li>
        </ul>
      </div>

      <div className="md:col-span-4">
        <h4 className="font-ui text-[11px] uppercase tracking-widest text-primary mb-4">Scrie-ne</h4>
        <p className="font-display text-[15px] text-foreground/85">salut@mygarden.md</p>
        <p className="font-display text-[15px] text-foreground/85">Chișinău, Moldova</p>
        <p className="font-ui text-xs text-muted-foreground mt-6 leading-relaxed max-w-xs">
          Răspundem în 24 de ore. Pentru rezervări de sezon, sună-ne direct.
        </p>
      </div>
    </div>

    <div className="border-t border-border/70">
      <div className="container py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="font-ui text-xs text-muted-foreground">
          © {new Date().getFullYear()} MyGarden. Toate drepturile rezervate.
        </span>
        <span className="font-display italic text-sm text-brown">
          „Tot ce semeni, vei culege."
        </span>
      </div>
    </div>
  </footer>
);
