import { useData, STAGE_ORDER } from "@/context/DataContext";
import { DataTable, StatusBadge, statusKind } from "@/components/dashboard";
import { mdl } from "@/data/mock";
import { ChevronRight } from "lucide-react";

const AdminReservations = () => {
  const { reservations, lands, users, advanceReservation } = useData();
  return (
    <DataTable
      data={reservations}
      rowKey={r => r.id}
      columns={[
        { key: "date", header: "Data", render: r => <span className="font-ui text-xs">{r.createdAt}</span> },
        { key: "land", header: "Teren", render: r => <span className="font-display text-primary-deep">{lands.find(l => l.id === r.landId)?.name}</span> },
        { key: "client", header: "Client", render: r => <span>{users.find(u => u.id === r.clientId)?.name ?? "—"}</span>, hideOnMobile: true },
        { key: "total", header: "Total", render: r => <span className="num text-primary-deep">{mdl(r.totalPrice)}</span> },
        { key: "status", header: "Stadiu", render: r => <StatusBadge status={statusKind(r.status)}>{r.status}</StatusBadge> },
      ]}
      actions={r => {
        const idx = STAGE_ORDER.indexOf(r.status);
        const canAdv = idx >= 0 && idx < STAGE_ORDER.length - 1;
        return (
          <button onClick={() => canAdv && advanceReservation(r.id)} disabled={!canAdv}
            className="press h-8 px-2 rounded bg-primary text-primary-foreground text-xs disabled:opacity-30">
            <ChevronRight className="h-3 w-3" />
          </button>
        );
      }}
    />
  );
};
export default AdminReservations;
