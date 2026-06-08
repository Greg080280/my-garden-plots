import { useAuth } from "@/context/AuthContext";
import { useData, STAGE_ORDER } from "@/context/DataContext";
import { DataTable, StatusBadge, statusKind, EmptyState } from "@/components/dashboard";
import { mdl } from "@/data/mock";
import { ChevronRight } from "lucide-react";

const FarmerReservations = () => {
  const { user } = useAuth();
  const { reservations, lands, users, advanceReservation } = useData();
  if (!user) return null;
  const mine = reservations.filter(r => lands.some(l => l.farmerId === user.id && l.id === r.landId));

  if (mine.length === 0) {
    return <EmptyState cat="flowers" slug="seedling" title="Nicio rezervare activă"
      description="Rezervările pe terenurile tale vor apărea aici." />;
  }

  return (
    <DataTable
      data={mine}
      rowKey={r => r.id}
      columns={[
        { key: "land", header: "Teren", render: r => {
          const l = lands.find(x => x.id === r.landId);
          return <span className="font-display text-primary-deep">{l?.name} · L{r.plotId.split("-p")[1]}</span>;
        }},
        { key: "client", header: "Client", render: r => {
          const c = users.find(u => u.id === r.clientId);
          return <span>{c?.name ?? r.clientId}</span>;
        }, hideOnMobile: true },
        { key: "cult", header: "Culturi", render: r => <span className="num">{r.cultures.length}</span>, hideOnMobile: true },
        { key: "total", header: "Total", render: r => <span className="num text-primary-deep">{mdl(r.totalPrice)}</span> },
        { key: "status", header: "Stadiu", render: r => <StatusBadge status={statusKind(r.status)}>{r.status}</StatusBadge> },
      ]}
      actions={r => {
        const idx = STAGE_ORDER.indexOf(r.status);
        const canAdv = idx >= 0 && idx < STAGE_ORDER.length - 1;
        return (
          <button
            onClick={() => canAdv && advanceReservation(r.id)}
            disabled={!canAdv}
            className="press inline-flex items-center gap-1 h-8 px-3 rounded-md bg-primary text-primary-foreground text-xs font-ui disabled:opacity-30"
          >
            {canAdv ? <>Avansează <ChevronRight className="h-3 w-3" /></> : "Finalizat"}
          </button>
        );
      }}
    />
  );
};
export default FarmerReservations;
