import { Link } from "react-router-dom";
import { BotanicalSVG } from "@/components/decor/BotanicalSVG";

/**
 * Public footer (spec §3.4): garden-700 background, cream-soft text,
 * wave divider on top, 4 columns + bottom copyright row.
 */
export const Footer = () => (
  <footer className="mt-24 bg-garden-700 text-cream-soft">
    {/* Wave divider — inverted, sits at the very top */}
    <div className="text-cream relative -mt-px">
      <BotanicalSVG name="dividers/wave" className="block w-full h-10" />
    </div>

    {/* Botanical accent row */}
    <div className="max-w-7xl mx-auto px-6 pt-10 flex items-center justify-center gap-10 text-cream-soft/55">
      <BotanicalSVG name="gallery/flowers/seedling" className="w-10 h-10" />
      <BotanicalSVG name="gallery/vegetables/carrot" className="w-10 h-10" />
      <BotanicalSVG name="gallery/tools/watering-can" className="w-10 h-10" />
      <BotanicalSVG name="gallery/vegetables/tomato" className="w-10 h-10" />
      <BotanicalSVG name="gallery/accents/bee" className="w-10 h-10" />
      <BotanicalSVG name="gallery/decor/veggie-basket" className="w-10 h-10" />
    </div>

    <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-12 gap-10">
      <div className="md:col-span-4">
        <Link to="/" className="font-script text-[32px] text-cream-soft block leading-none">
          MyGarden
        </Link>
        <p className="font-ui text-sm text-cream-soft/75 mt-4 max-w-xs leading-relaxed">
          Cultivă-ți visul. Pământ adevărat în Moldova, îngrijit de fermieri locali.
        </p>
      </div>

      <div className="md:col-span-2">
        <h4 className="font-ui text-[11px] uppercase tracking-widest text-cream-soft/60 mb-4">Despre</h4>
        <ul className="space-y-2.5 font-ui text-[14px]">
          <li><Link to="/how-it-works" className="link-underline text-cream-soft/85 hover:text-cream-soft">Cum funcționează</Link></li>
          <li><a href="#" className="link-underline text-cream-soft/85 hover:text-cream-soft">Echipa</a></li>
          <li><a href="#" className="link-underline text-cream-soft/85 hover:text-cream-soft">Termeni</a></li>
        </ul>
      </div>

      <div className="md:col-span-3">
        <h4 className="font-ui text-[11px] uppercase tracking-widest text-cream-soft/60 mb-4">Contact</h4>
        <ul className="space-y-2.5 font-ui text-[14px] text-cream-soft/85">
          <li>contact@mygarden.md</li>
          <li>Telegram @mygarden</li>
          <li>Chișinău, Moldova</li>
        </ul>
      </div>

      <div className="md:col-span-3">
        <h4 className="font-ui text-[11px] uppercase tracking-widest text-cream-soft/60 mb-4">Resurse</h4>
        <ul className="space-y-2.5 font-ui text-[14px]">
          <li><a href="#" className="link-underline text-cream-soft/85 hover:text-cream-soft">Blog</a></li>
          <li><Link to="/cultures" className="link-underline text-cream-soft/85 hover:text-cream-soft">Catalog culturi</Link></li>
          <li><a href="#" className="link-underline text-cream-soft/85 hover:text-cream-soft">FAQ</a></li>
        </ul>
      </div>
    </div>

    <div className="border-t border-cream-soft/15">
      <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="font-ui text-xs text-cream-soft/60">
          © {new Date().getFullYear()} MyGarden — proiect studențesc
        </span>
        <span className="font-ui text-xs text-cream-soft/60">🌐 RO · RU</span>
      </div>
    </div>
  </footer>
);
