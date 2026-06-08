import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useData } from "@/context/DataContext";
import { StatusBadge, statusKind, EmptyState } from "@/components/dashboard";
import { mdl } from "@/data/mock";

const ClientReservations = () => {
  const { user } = useAuth();
  const { reservations, lands } = useData();
  const mine = reservations.filter(r => r.clientId === user?.id);

  if (mine.length === 0) {
    return <EmptyState cat="flowers" slug="seedling" tilt={-3}
      title="Niciun lot rezervat"
      description="Vezi catalogul și rezervă primul tău lot."
      action={<Link to="/lands" className="press inline-flex h-10 px-5 items-center rounded-md bg-primary text-primary-foreground font-display text-sm">Răsfoiește loturi</Link>} />;
  }

  return (
    <div className="space-y-4">
      {mine.map(r => {
        const land = lands.find(l => l.id === r.landId);
        return (
          <article key={r.id} className="editorial-card p-6 flex items-center gap-6">
            <img src={land?.photo} alt={land?.name} className="h-24 w-32 object-cover rounded-md" />
            <div className="flex-1 min-w-0">
              <p className="eyebrow text-[10px]">{land?.region} · {r.season}</p>
              <h3 className="mt-2 font-display text-xl text-primary-deep">{land?.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">Lot {r.plotId.split("-p")[1]} · {r.cultures.length} culturi · {mdl(r.totalPrice)}</p>
            </div>
            <StatusBadge status={statusKind(r.status)}>{r.status}</StatusBadge>
          </article>
        );
      })}
    </div>
  );
};
export default ClientReservations;
