import { useData } from "@/context/DataContext";

const KIND_COLORS: Record<string, string> = {
  reservation: "bg-garden-100 text-garden-700",
  order:       "bg-[#E8D26A]/40 text-garden-900",
  service:     "bg-primary/10 text-primary-deep",
  user:        "bg-[#D5E3EA] text-[hsl(205_45%_28%)]",
  land:        "bg-[#E8C4D2] text-garden-900",
};

const AdminActivity = () => {
  const { activity } = useData();
  return (
    <ul className="border-y border-border/60">
      {activity.map(a => (
        <li key={a.id} className="flex items-start gap-4 py-4 border-b border-border/40 last:border-0">
          <span className={`font-ui text-[10px] uppercase tracking-widest px-2 py-1 rounded shrink-0 ${KIND_COLORS[a.kind] ?? "bg-paper"}`}>
            {a.kind}
          </span>
          <p className="flex-1 text-sm text-foreground/85">{a.message}</p>
          <p className="text-xs text-muted-foreground shrink-0">{a.at}</p>
        </li>
      ))}
    </ul>
  );
};
export default AdminActivity;
