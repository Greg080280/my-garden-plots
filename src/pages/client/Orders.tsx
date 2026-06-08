import { useAuth } from "@/context/AuthContext";
import { useData } from "@/context/DataContext";
import { DataTable, StatusBadge, statusKind, EmptyState } from "@/components/dashboard";
import { mdl } from "@/data/mock";

const ClientOrders = () => {
  const { user } = useAuth();
  const { productOrders, products } = useData();
  const mine = productOrders.filter(o => o.clientId === user?.id);

  if (mine.length === 0) {
    return <EmptyState cat="accents" slug="wheelbarrow" tilt={-3}
      title="Nicio comandă încă"
      description="Comenzile din marketplace vor apărea aici." />;
  }

  return (
    <DataTable
      data={mine}
      rowKey={o => o.id}
      columns={[
        { key: "date", header: "Data", render: o => <span className="font-ui text-xs text-muted-foreground">{o.createdAt}</span> },
        { key: "prod", header: "Produs", render: o => {
          const p = products.find(x => x.id === o.productId);
          return <span className="font-display text-primary-deep">{p?.name ?? "—"}</span>;
        }},
        { key: "qty", header: "Cant.", render: o => <span className="num">{o.qty}</span> },
        { key: "total", header: "Total", render: o => <span className="num text-primary-deep">{mdl(o.total)}</span> },
        { key: "status", header: "Status", render: o => <StatusBadge status={statusKind(o.status)}>{o.status}</StatusBadge> },
      ]}
    />
  );
};
export default ClientOrders;
