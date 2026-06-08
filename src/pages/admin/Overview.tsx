import { useData } from "@/context/DataContext";
import { HandDrawnChart } from "@/components/dashboard";
import { mdl } from "@/data/mock";

const Stat = ({ label, value, hint }: { label: string; value: string; hint?: string }) => (
  <div className="border-l border-primary/40 pl-5">
    <p className="eyebrow text-[10px]">{label}</p>
    <p className="mt-2 font-display text-4xl text-primary-deep leading-none">{value}</p>
    {hint && <p className="mt-2 font-ui text-xs text-muted-foreground">{hint}</p>}
  </div>
);

const AdminOverview = () => {
  const { users, companies, lands, reservations, productOrders, activity } = useData();
  const revenue = reservations.reduce((s, r) => s + r.totalPrice, 0) + productOrders.reduce((s, o) => s + o.total, 0);
  const clients = users.filter(u => u.role === "client").length;
  const farmers = users.filter(u => u.role === "farmer").length;
  const verified = companies.filter(c => c.verified).length;

  const byRegion = Array.from(new Set(lands.map(l => l.region))).map(reg => ({
    name: reg, value: lands.filter(l => l.region === reg).length,
  }));

  const byStatus = ["Rezervat", "Arat", "Plantat", "În creștere", "Recoltat"].map(st => ({
    name: st.slice(0, 4), value: reservations.filter(r => r.status === st).length,
  }));

  return (
    <div className="space-y-16">
      <header className="pb-8 border-b border-border/70">
        <p className="eyebrow">Panou administrator</p>
        <h1 className="mt-3 font-display text-4xl text-primary-deep font-normal leading-[1.1]">
          Întreaga <span className="font-script italic text-primary">platformă</span>, dintr-o privire.
        </h1>
      </header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <Stat label="Utilizatori"  value={String(users.length)}   hint={`${clients} grădinari · ${farmers} fermieri`} />
        <Stat label="Companii"     value={String(companies.length)} hint={`${verified} verificate`} />
        <Stat label="Terenuri"     value={String(lands.length)}   hint={`${lands.reduce((s,l)=>s+l.totalPlots,0)} loturi`} />
        <Stat label="Venit total"  value={mdl(revenue)}            hint={`${reservations.length} rez · ${productOrders.length} cmd`} />
      </div>

      <div className="grid lg:grid-cols-2 gap-12 pt-12 border-t border-border/70">
        <div>
          <p className="eyebrow">Terenuri pe regiune</p>
          <h2 className="mt-3 font-display text-2xl text-primary-deep font-normal mb-6">Distribuție geografică</h2>
          <HandDrawnChart type="pie" data={byRegion} height={260} />
        </div>
        <div>
          <p className="eyebrow">Rezervări pe stadii</p>
          <h2 className="mt-3 font-display text-2xl text-primary-deep font-normal mb-6">Pipeline activ</h2>
          <HandDrawnChart type="bar" data={byStatus} height={260} />
        </div>
      </div>

      <div className="pt-12 border-t border-border/70">
        <p className="eyebrow">Ultimele evenimente</p>
        <h2 className="mt-3 font-display text-2xl text-primary-deep font-normal mb-6">Activitate</h2>
        <ul className="border-y border-border/60">
          {activity.slice(0, 8).map(a => (
            <li key={a.id} className="flex items-start gap-4 py-3 border-b border-border/40 last:border-0">
              <span className="font-ui text-[10px] uppercase tracking-widest text-primary-deep bg-paper px-2 py-1 rounded shrink-0">{a.kind}</span>
              <p className="flex-1 text-sm text-foreground/80">{a.message}</p>
              <p className="text-xs text-muted-foreground shrink-0">{a.at}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default AdminOverview;
