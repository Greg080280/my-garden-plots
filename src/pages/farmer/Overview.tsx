import { useAuth } from "@/context/AuthContext";
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

const FarmerOverview = () => {
  const { user } = useAuth();
  const { lands, reservations, tasks, products, productOrders, services, activity } = useData();
  if (!user) return null;

  const myLands = lands.filter(l => l.farmerId === user.id);
  const myRes = reservations.filter(r => myLands.some(l => l.id === r.landId));
  const myTasks = tasks.filter(t => t.farmerId === user.id);
  const myProducts = products.filter(p => p.farmerId === user.id);
  const myOrders = productOrders.filter(o => myProducts.some(p => p.id === o.productId));
  const mySvc = services.filter(s => s.farmerId === user.id);
  const myActivity = activity.filter(a => a.message.toLowerCase().includes(user.name.split(" ")[0].toLowerCase())).slice(0, 6);

  const revenue = myRes.reduce((s, r) => s + r.totalPrice, 0) + myOrders.reduce((s, o) => s + o.total, 0);
  const pending = myTasks.filter(t => t.status !== "Finalizat").length;

  const chartData = ["Rezervat", "Arat", "Plantat", "În creștere", "Recoltat"].map(st => ({
    name: st.slice(0, 4),
    value: myRes.filter(r => r.status === st).length,
  }));

  return (
    <div className="space-y-16">
      <header className="pb-8 border-b border-border/70">
        <p className="eyebrow">Bună dimineața, {user.name.split(" ")[0]}</p>
        <h1 className="mt-3 font-display text-4xl text-primary-deep font-normal leading-[1.1]">
          Astăzi sunt <span className="font-script italic text-primary">{pending}</span> sarcini de făcut.
        </h1>
      </header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <Stat label="Loturi"      value={String(myLands.length)} hint="în îngrijire" />
        <Stat label="Rezervări"   value={String(myRes.length)} hint="active" />
        <Stat label="Sarcini"     value={String(pending)} hint={`din ${myTasks.length}`} />
        <Stat label="Venit total" value={mdl(revenue)} hint="sezon" />
      </div>

      <div className="grid lg:grid-cols-[1fr_360px] gap-12 pt-12 border-t border-border/70">
        <div>
          <p className="eyebrow">Distribuție pe etape</p>
          <h2 className="mt-3 font-display text-2xl text-primary-deep font-normal mb-6">Rezervări pe stadii</h2>
          <HandDrawnChart type="bar" data={chartData} height={260} />
        </div>
        <div>
          <p className="eyebrow">Activitate recentă</p>
          <h2 className="mt-3 font-display text-2xl text-primary-deep font-normal mb-6">Ultimele evenimente</h2>
          <ul className="space-y-4">
            {myActivity.length === 0 ? (
              <li className="text-sm text-muted-foreground">Nimic recent.</li>
            ) : myActivity.map(a => (
              <li key={a.id} className="text-sm border-l-2 border-primary/40 pl-3">
                <p className="text-primary-deep">{a.message}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{a.at}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-8 pt-12 border-t border-border/70">
        <Stat label="Servicii oferite" value={String(mySvc.length)} />
        <Stat label="Produse"          value={String(myProducts.length)} />
        <Stat label="Comenzi primite"  value={String(myOrders.length)} />
      </div>
    </div>
  );
};
export default FarmerOverview;
