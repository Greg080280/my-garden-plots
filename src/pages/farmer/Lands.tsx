import { useAuth } from "@/context/AuthContext";
import { useData } from "@/context/DataContext";
import { EmptyState } from "@/components/dashboard";

const FarmerLands = () => {
  const { user } = useAuth();
  const { lands } = useData();
  const mine = lands.filter(l => l.farmerId === user?.id);

  if (mine.length === 0) {
    return <EmptyState cat="decor" slug="garden-door" title="Nu ai loturi încă"
      description="Contactează administratorul pentru a-ți adăuga terenuri." />;
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {mine.map(l => {
        const occupied = l.totalPlots - l.availablePlots;
        const pct = (occupied / l.totalPlots) * 100;
        return (
          <article key={l.id} className="editorial-card overflow-hidden">
            <div className="aspect-[16/9] overflow-hidden">
              <img src={l.photo} alt={l.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-7">
              <p className="eyebrow text-[10px]">{l.region} · {l.village}</p>
              <h3 className="mt-2 font-display text-2xl text-primary-deep">{l.name}</h3>
              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{l.description}</p>
              <div className="mt-5 flex items-center justify-between text-sm">
                <span className="font-ui text-xs text-muted-foreground tracking-wide uppercase">
                  {occupied}/{l.totalPlots} rezervate
                </span>
                <span className="font-display text-primary-deep">{l.pricePerAre} MDL/ar</span>
              </div>
              <div className="mt-2 h-px bg-border relative overflow-hidden">
                <div className="absolute inset-y-0 left-0 bg-primary" style={{ width: `${pct}%` }} />
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
};
export default FarmerLands;
