import { useState } from "react";
import { Trash2, Plus } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useData } from "@/context/DataContext";
import { tools } from "@/assets";
import { Input } from "@/components/ui/input";

const FarmerServices = () => {
  const { user } = useAuth();
  const { services, addService, deleteService } = useData();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("lot");
  const [desc, setDesc] = useState("");
  if (!user) return null;
  const mine = services.filter(s => s.farmerId === user.id);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;
    addService({ farmerId: user.id, name, price: Number(price), unit, description: desc, icon: tools.bag });
    setName(""); setPrice(""); setUnit("lot"); setDesc("");
  };

  return (
    <div className="space-y-10">
      <form onSubmit={submit} className="editorial-card p-6 grid sm:grid-cols-[1fr_120px_120px_auto] gap-3 items-end">
        <div>
          <label className="eyebrow text-[10px]">Serviciu nou</label>
          <Input value={name} onChange={e => setName(e.target.value)} placeholder="Nume serviciu" className="mt-1" />
        </div>
        <div>
          <label className="eyebrow text-[10px]">Preț MDL</label>
          <Input value={price} onChange={e => setPrice(e.target.value)} type="number" placeholder="150" className="mt-1" />
        </div>
        <div>
          <label className="eyebrow text-[10px]">Unitate</label>
          <Input value={unit} onChange={e => setUnit(e.target.value)} placeholder="lot" className="mt-1" />
        </div>
        <button type="submit" className="press h-10 px-4 rounded-md bg-primary text-primary-foreground font-display text-sm inline-flex items-center gap-1.5">
          <Plus className="h-4 w-4" /> Adaugă
        </button>
        <div className="sm:col-span-4">
          <Input value={desc} onChange={e => setDesc(e.target.value)} placeholder="Descriere scurtă" />
        </div>
      </form>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mine.map(s => (
          <article key={s.id} className="editorial-card p-6 group">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-display text-lg text-primary-deep">{s.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{s.description}</p>
              </div>
              <button onClick={() => deleteService(s.id)} className="text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition" aria-label="Șterge">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-4 font-display text-2xl text-primary-deep">{s.price} <span className="text-xs text-muted-foreground font-ui">MDL/{s.unit}</span></p>
          </article>
        ))}
      </div>
    </div>
  );
};
export default FarmerServices;
