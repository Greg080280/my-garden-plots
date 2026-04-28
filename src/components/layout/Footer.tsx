import { Link } from "react-router-dom";
import { botanicals, deco } from "@/assets";

export const Footer = () => (
  <footer className="mt-24 bg-paper border-t border-primary/20">
    <div className="container py-14 grid md:grid-cols-4 gap-10">
      <div>
        <div className="flex items-center gap-2 mb-3">
          <img src={botanicals.wreath} alt="" className="h-10 w-10 object-contain" />
          <span className="font-script text-3xl text-primary pt-1">MyGarden</span>
        </div>
        <p className="text-sm text-muted-foreground max-w-xs">
          Pământ adevărat, grijit cu drag, în mijlocul Moldovei. Pentru oameni cărora le-a fost dor de grădina bunicii.
        </p>
      </div>

      <div>
        <h4 className="font-display font-bold mb-3">Explorează</h4>
        <ul className="space-y-2 text-sm">
          <li><Link to="/lands" className="hover:text-primary">Loturi disponibile</Link></li>
          <li><Link to="/marketplace" className="hover:text-primary">Magazin</Link></li>
          <li><Link to="/dashboard" className="hover:text-primary">Grădina mea</Link></li>
          <li><Link to="/farmer" className="hover:text-primary">Sunt fermier</Link></li>
        </ul>
      </div>

      <div>
        <h4 className="font-display font-bold mb-3">Pentru tine</h4>
        <ul className="space-y-2 text-sm">
          <li><a className="hover:text-primary" href="#">Cum funcționează</a></li>
          <li><a className="hover:text-primary" href="#">Întrebări frecvente</a></li>
          <li><a className="hover:text-primary" href="#">Despre noi</a></li>
          <li><a className="hover:text-primary" href="#">Contact</a></li>
        </ul>
      </div>

      <div className="relative">
        <h4 className="font-display font-bold mb-3">Scrie-ne</h4>
        <p className="text-sm text-muted-foreground">salut@mygarden.md</p>
        <p className="text-sm text-muted-foreground">Chișinău, Moldova</p>
        <img src={deco.bow} alt="" className="absolute -top-2 right-0 h-16 w-16 object-contain opacity-80" />
        <img src={botanicals.bouquetBow} alt="" className="absolute -bottom-6 right-0 h-28 object-contain" />
      </div>
    </div>
    <div className="border-t border-primary/15">
      <div className="container py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
        <span>© {new Date().getFullYear()} MyGarden. Cu drag, din Moldova.</span>
        <span className="font-script text-lg text-primary">„Tot ce semeni, vei culege."</span>
      </div>
    </div>
  </footer>
);
