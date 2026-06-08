import { Trash2 } from "lucide-react";
import { useData } from "@/context/DataContext";
import { DataTable, StatusBadge } from "@/components/dashboard";
import type { StatusKind } from "@/components/dashboard";

const roleColor: Record<string, StatusKind> = { admin: "info", farmer: "active", client: "in_progress" };

const AdminUsers = () => {
  const { users, deleteUser } = useData();
  return (
    <DataTable
      data={users}
      rowKey={u => u.id}
      columns={[
        { key: "name",  header: "Nume",  render: u => <span className="font-display text-primary-deep">{u.name}</span> },
        { key: "email", header: "Email", render: u => <span className="text-sm">{u.email}</span>, hideOnMobile: true },
        { key: "role",  header: "Rol",   render: u => <StatusBadge status={roleColor[u.role]}>{u.role}</StatusBadge> },
        { key: "phone", header: "Telefon", render: u => <span className="font-ui text-xs">{u.phone ?? "—"}</span>, hideOnMobile: true },
        { key: "since", header: "Membru", render: u => <span className="font-ui text-xs text-muted-foreground">{u.joinedAt ?? "—"}</span>, hideOnMobile: true },
      ]}
      actions={u => (
        <button
          onClick={() => { if (confirm(`Șterge ${u.name}?`)) deleteUser(u.id); }}
          disabled={u.role === "admin"}
          className="text-muted-foreground hover:text-destructive disabled:opacity-20"
          aria-label="Șterge"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      )}
    />
  );
};
export default AdminUsers;
