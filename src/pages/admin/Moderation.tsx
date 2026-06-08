import { CheckCircle2 } from "lucide-react";
import { useData } from "@/context/DataContext";
import { EmptyState } from "@/components/dashboard";

const AdminModeration = () => {
  const { companies, users, toggleCompanyVerified } = useData();
  const pending = companies.filter(c => !c.verified);

  if (pending.length === 0) {
    return <EmptyState cat="accents" slug="bee" tilt={-4}
      title="Totul e în ordine"
      description="Nu există companii care așteaptă verificarea." />;
  }

  return (
    <div className="space-y-4">
      {pending.map(c => {
        const owner = users.find(u => u.id === c.farmerId);
        return (
          <article key={c.id} className="editorial-card p-6 flex items-start gap-6">
            <div className="flex-1">
              <p className="eyebrow text-[10px]">Așteaptă verificare · {c.region}</p>
              <h3 className="mt-2 font-display text-2xl text-primary-deep">{c.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">Proprietar: {owner?.name} · {owner?.email}</p>
              <p className="mt-3 text-sm text-foreground/75">{c.description}</p>
            </div>
            <button
              onClick={() => toggleCompanyVerified(c.id)}
              className="press inline-flex items-center gap-1.5 h-10 px-5 rounded-md bg-primary text-primary-foreground font-display text-sm"
            >
              <CheckCircle2 className="h-4 w-4" /> Aprobă
            </button>
          </article>
        );
      })}
    </div>
  );
};
export default AdminModeration;
