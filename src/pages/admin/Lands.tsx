import { Trash2 } from "lucide-react";
import { useData } from "@/context/DataContext";
import { DataTable } from "@/components/dashboard";

const AdminLands = () => {
  const { lands, users, deleteLand } = useData();
  return (
    <DataTable
      data={lands}
      rowKey={l => l.id}
      columns={[
        { key: "name", header: "Nume", render: l => (
          <div className="flex items-center gap-3">
            <img src={l.photo} alt="" className="h-10 w-14 object-cover rounded" />
            <span className="font-display text-primary-deep">{l.name}</span>
          </div>
        )},
        { key: "region", header: "Regiune", render: l => <span>{l.region} · {l.village}</span>, hideOnMobile: true },
        { key: "farmer", header: "Fermier", render: l => <span>{users.find(u => u.id === l.farmerId)?.name ?? "—"}</span>, hideOnMobile: true },
        { key: "plots", header: "Loturi", render: l => <span className="num">{l.totalPlots - l.availablePlots}/{l.totalPlots}</span> },
        { key: "price", header: "MDL/ar", render: l => <span className="num text-primary-deep">{l.pricePerAre}</span> },
      ]}
      actions={l => (
        <button onClick={() => { if (confirm(`Șterge ${l.name}?`)) deleteLand(l.id); }} className="text-muted-foreground hover:text-destructive">
          <Trash2 className="h-4 w-4" />
        </button>
      )}
    />
  );
};
export default AdminLands;
