import { useAuth } from "@/context/AuthContext";
import { useData } from "@/context/DataContext";
import { DataTable, StatusBadge, statusKind, EmptyState } from "@/components/dashboard";
import { mdl } from "@/data/mock";
import type { ProductOrder } from "@/data/mock";

const NEXT: Record<ProductOrder["status"], ProductOrder["status"]> = {
  "În așteptare": "Confirmată",
  "Confirmată":  "Expediată",
  "Expediată":   "Livrată",
  "Livrată":     "Livrată",
};

const FarmerOrders = () => {
  const { user } = useAuth();
  const { productOrders, products, users, setOrderStatus } = useData();
  if (!user) return null;
  const mine = productOrders.filter(o => products.some(p => p.farmerId === user.id && p.id === o.productId));

  if (mine.length === 0) {
    return <EmptyState cat="accents" slug="wheelbarrow" title="Nicio comandă primită" description="Comenzile pentru produsele tale vor apărea aici." />;
  }

  return (
    <DataTable
      data={mine}
      rowKey={o => o.id}
      columns={[
        { key: "date", header: "Data", render: o => <span className="font-ui text-xs">{o.createdAt}</span> },
        { key: "prod", header: "Produs", render: o => <span className="font-display text-primary-deep">{products.find(p => p.id === o.productId)?.name}</span> },
        { key: "client", header: "Client", render: o => <span>{users.find(u => u.id === o.clientId)?.name ?? "—"}</span>, hideOnMobile: true },
        { key: "qty", header: "Cant", render: o => <span className="num">{o.qty}</span> },
        { key: "total", header: "Total", render: o => <span className="num text-primary-deep">{mdl(o.total)}</span> },
        { key: "status", header: "Status", render: o => <StatusBadge status={statusKind(o.status)}>{o.status}</StatusBadge> },
      ]}
      actions={o => (
        <button
          disabled={o.status === "Livrată"}
          onClick={() => setOrderStatus(o.id, NEXT[o.status])}
          className="press h-8 px-3 rounded-md bg-primary text-primary-foreground text-xs font-ui disabled:opacity-30"
        >
          {o.status === "Livrată" ? "Livrată" : `→ ${NEXT[o.status]}`}
        </button>
      )}
    />
  );
};
export default FarmerOrders;
