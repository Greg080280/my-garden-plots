import { useAuth } from "@/context/AuthContext";
import { useData } from "@/context/DataContext";
import { mdl } from "@/data/mock";

const ClientProfile = () => {
  const { user } = useAuth();
  const { reservations, productOrders } = useData();
  if (!user) return null;
  const myRes = reservations.filter(r => r.clientId === user.id);
  const myOrders = productOrders.filter(o => o.clientId === user.id);
  const spent = myRes.reduce((s, r) => s + r.totalPrice, 0) + myOrders.reduce((s, o) => s + o.total, 0);

  return (
    <div className="space-y-12">
      <div className="flex items-center gap-6 pb-8 border-b border-border/70">
        <div className="h-20 w-20 rounded-full bg-garden-600 text-cream-soft grid place-items-center font-display text-3xl">
          {user.name.charAt(0)}
        </div>
        <div>
          <h1 className="font-display text-3xl text-primary-deep">{user.name}</h1>
          <p className="text-sm text-muted-foreground mt-1">{user.email}</p>
          {user.phone && <p className="text-sm text-muted-foreground">{user.phone}</p>}
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-8">
        <Stat label="Rezervări" value={String(myRes.length)} />
        <Stat label="Comenzi"   value={String(myOrders.length)} />
        <Stat label="Cheltuit"  value={mdl(spent)} />
      </div>

      <div>
        <p className="eyebrow">Detalii cont</p>
        <dl className="mt-4 grid grid-cols-[140px_1fr] gap-y-3 text-sm">
          <dt className="text-muted-foreground">Membru din</dt><dd className="text-primary-deep">{user.joinedAt}</dd>
          <dt className="text-muted-foreground">Rol</dt><dd className="text-primary-deep capitalize">{user.role}</dd>
          <dt className="text-muted-foreground">ID</dt><dd className="font-mono text-xs">{user.id}</dd>
        </dl>
      </div>
    </div>
  );
};

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div className="border-l border-primary/40 pl-5">
    <p className="eyebrow text-[10px]">{label}</p>
    <p className="mt-2 font-display text-4xl text-primary-deep">{value}</p>
  </div>
);

export default ClientProfile;
