import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User as UserIcon } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { ScallopedFrame } from "@/components/decor/ScallopedFrame";
import { HDButton } from "@/components/decor/HDButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { botanicals, tools, deco } from "@/assets";

interface Props { mode: "login" | "register" }

const Auth = ({ mode }: Props) => {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pw, setPw] = useState("");
  const [role, setRole] = useState<"client" | "farmer">("client");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !pw) return;
    login(email, name || email.split("@")[0], role);
    nav(role === "farmer" ? "/farmer" : "/dashboard");
  };

  return (
    <div className="container py-8 max-w-lg">
      <div className="relative">
        <img src={tools.wateringcan2} alt="" className="absolute -left-20 top-10 h-44 hidden md:block opacity-90" />
        <img src={botanicals.bouquetBow} alt="" className="absolute -right-16 -top-6 h-40 hidden md:block opacity-90" />

        <ScallopedFrame variant="oval" centerContent={false} className="aspect-[4/5]">
          <div className="absolute inset-[8%_15%] flex flex-col justify-center">
            <h1 className="font-script text-6xl text-primary text-center leading-none">MyGarden</h1>
            <p className="text-center font-script text-xl text-foreground mt-2">
              {mode === "login" ? "Bun găsit înapoi" : "Bun venit între noi"}
            </p>

            <form onSubmit={submit} className="mt-6 space-y-4 flex flex-col">
              {mode === "register" && (
                <div>
                  <Label className="font-display text-sm">Numele tău</Label>
                  <div className="relative mt-1">
                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
                    <Input value={name} onChange={e => setName(e.target.value)} placeholder="Maria" className="pl-9 bg-background border-primary/40 rounded-xl h-11" />
                  </div>
                </div>
              )}

              <div>
                <Label className="font-display text-sm">E-mail</Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
                  <Input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="maria@email.md" className="pl-9 bg-background border-primary/40 rounded-xl h-11" />
                </div>
              </div>

              <div>
                <Label className="font-display text-sm">Parolă</Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
                  <Input type="password" required value={pw} onChange={e => setPw(e.target.value)} placeholder="••••••" className="pl-9 bg-background border-primary/40 rounded-xl h-11" />
                </div>
              </div>

              {mode === "register" && (
                <div>
                  <Label className="font-display text-sm">Sunt</Label>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    {(["client", "farmer"] as const).map(r => (
                      <button key={r} type="button" onClick={() => setRole(r)}
                        className={`h-11 rounded-xl border-2 font-display font-semibold text-sm press
                          ${role === r ? "bg-primary text-primary-foreground border-primary-deep" : "bg-paper border-primary/30"}`}>
                        {r === "client" ? "Grădinar" : "Fermier"}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-2" />
              <HDButton type="submit" iconLeft={tools.trowel} className="w-full justify-center">
                {mode === "login" ? "Intră în grădină" : "Creează cont"}
              </HDButton>

              <p className="text-center text-sm text-muted-foreground">
                {mode === "login" ? (
                  <>Nu ai cont? <Link to="/register" className="text-primary font-display font-semibold underline">Înregistrează-te</Link></>
                ) : (
                  <>Ai deja cont? <Link to="/login" className="text-primary font-display font-semibold underline">Intră aici</Link></>
                )}
              </p>
            </form>
            <img src={deco.bow} alt="" className="absolute -top-3 left-1/2 -translate-x-1/2 h-12 w-12 object-contain" />
          </div>
        </ScallopedFrame>
      </div>
    </div>
  );
};

export default Auth;
