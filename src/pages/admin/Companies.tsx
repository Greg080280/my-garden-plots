import { CheckCircle2, Circle } from "lucide-react";
import { useData } from "@/context/DataContext";

const AdminCompanies = () => {
  const { companies, lands, users, toggleCompanyVerified } = useData();
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {companies.map(c => {
        const owner = users.find(u => u.id === c.farmerId);
        const ownerLands = lands.filter(l => l.farmerId === c.farmerId);
        return (
          <article key={c.id} className="editorial-card p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow text-[10px]">{c.region} · de la {c.joinedAt}</p>
                <h3 className="mt-2 font-display text-2xl text-primary-deep flex items-center gap-2">
                  {c.name}
                  {c.verified && <CheckCircle2 className="h-5 w-5 text-primary" />}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">Proprietar: {owner?.name}</p>
              </div>
              <button
                onClick={() => toggleCompanyVerified(c.id)}
                className={`press inline-flex items-center gap-1.5 h-9 px-3 rounded-md text-xs font-ui ${
                  c.verified ? "bg-paper text-primary-deep border border-border" : "bg-primary text-primary-foreground"
                }`}
              >
                {c.verified ? <><Circle className="h-3.5 w-3.5" /> Anulează</> : <><CheckCircle2 className="h-3.5 w-3.5" /> Verifică</>}
              </button>
            </div>
            <p className="mt-4 text-sm text-foreground/75 leading-relaxed">{c.description}</p>
            <p className="mt-4 font-ui text-xs text-muted-foreground tracking-wide uppercase">
              {ownerLands.length} terenuri în îngrijire
            </p>
          </article>
        );
      })}
    </div>
  );
};
export default AdminCompanies;
