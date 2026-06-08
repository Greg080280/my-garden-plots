import { useAuth } from "@/context/AuthContext";
import { useData } from "@/context/DataContext";
import { DataTable, StatusBadge, statusKind, EmptyState } from "@/components/dashboard";

const FarmerTasks = () => {
  const { user } = useAuth();
  const { tasks, services, lands, users, setTaskStatus } = useData();
  if (!user) return null;
  const mine = tasks.filter(t => t.farmerId === user.id);

  if (mine.length === 0) {
    return <EmptyState cat="tools" slug="hanging-gloves" title="Nicio sarcină programată" description="Sarcinile noi vor apărea aici." />;
  }

  const next = (s: string): "În așteptare" | "În lucru" | "Finalizat" => s === "În așteptare" ? "În lucru" : s === "În lucru" ? "Finalizat" : "Finalizat";

  return (
    <DataTable
      data={mine}
      rowKey={t => t.id}
      columns={[
        { key: "date", header: "Programat", render: t => <span className="font-ui text-xs">{t.scheduledFor}</span> },
        { key: "svc", header: "Serviciu", render: t => <span className="font-display text-primary-deep">{services.find(s => s.id === t.serviceId)?.name ?? "—"}</span> },
        { key: "land", header: "Teren", render: t => <span>{lands.find(l => l.id === t.landId)?.name}</span>, hideOnMobile: true },
        { key: "client", header: "Client", render: t => <span>{users.find(u => u.id === t.clientId)?.name ?? "—"}</span>, hideOnMobile: true },
        { key: "status", header: "Status", render: t => <StatusBadge status={statusKind(t.status)}>{t.status}</StatusBadge> },
      ]}
      actions={t => (
        <button
          disabled={t.status === "Finalizat"}
          onClick={() => setTaskStatus(t.id, next(t.status))}
          className="press h-8 px-3 rounded-md bg-primary text-primary-foreground text-xs font-ui disabled:opacity-30"
        >
          {t.status === "În așteptare" ? "Pornește" : t.status === "În lucru" ? "Finalizează" : "Gata"}
        </button>
      )}
    />
  );
};
export default FarmerTasks;
