import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { Botanical } from "@/components/decor/Botanical";

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

  const isLogin = mode === "login";

  return (
    <div className="min-h-[calc(100vh-4rem)] grid lg:grid-cols-2">
      {/* Left — editorial copy */}
      <div className="hidden lg:flex flex-col justify-between p-16 bg-paper border-r border-border">
        <span className="font-script text-3xl text-primary-deep">MyGarden</span>
        <div className="max-w-md">
          <p className="eyebrow">{isLogin ? "Bun găsit" : "Bun venit"}</p>
          <h1 className="mt-5 font-display text-4xl lg:text-5xl text-primary-deep leading-[1.1] font-normal">
            {isLogin ? (
              <>Pământul tău te <span className="font-script italic text-primary">așteaptă</span>.</>
            ) : (
              <>Începe-ți prima <span className="font-script italic text-primary">grădină</span>.</>
            )}
          </h1>
          <p className="mt-6 text-lg text-foreground/70 leading-[1.7]">
            {isLogin
              ? "Intră în cont și vezi cum merge cultura ta — ce s-a plantat, ce s-a udat, când vine recolta."
              : "Alege un lot din Moldova, planifică ce să crești și lasă fermierii locali să se ocupe de restul."}
          </p>
        </div>
        <div className="flex items-end justify-between">
          <p className="font-display italic text-sm text-brown max-w-[60%]">„Tot ce semeni, vei culege."</p>
          <Botanical
            cat={isLogin ? "tools" : "flowers"}
            slug={isLogin ? "watering-can" : "flower-bouquet"}
            className="w-32 h-32 text-primary-deep/80"
          />
        </div>
      </div>

      {/* Right — form */}
      <div className="flex items-center justify-center p-8 lg:p-16">
        <div className="w-full max-w-md">
          <span className="font-script text-3xl text-primary-deep block lg:hidden mb-8">MyGarden</span>
          <p className="eyebrow">{isLogin ? "Autentificare" : "Cont nou"}</p>
          <h2 className="mt-3 font-display text-3xl text-primary-deep font-normal">
            {isLogin ? "Intră în cont" : "Creează cont"}
          </h2>

          <form onSubmit={submit} className="mt-10 space-y-6">
            {!isLogin && (
              <div>
                <label className="block font-ui text-[11px] uppercase tracking-widest text-primary-deep mb-2">Nume</label>
                <Input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Maria Popescu"
                  className="h-12 rounded-md bg-card border-border focus:border-primary font-display text-[15px]"
                />
              </div>
            )}

            <div>
              <label className="block font-ui text-[11px] uppercase tracking-widest text-primary-deep mb-2">E-mail</label>
              <Input
                type="email" required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="maria@email.md"
                className="h-12 rounded-md bg-card border-border focus:border-primary font-display text-[15px]"
              />
            </div>

            <div>
              <label className="block font-ui text-[11px] uppercase tracking-widest text-primary-deep mb-2">Parolă</label>
              <Input
                type="password" required
                value={pw}
                onChange={e => setPw(e.target.value)}
                placeholder="••••••••"
                className="h-12 rounded-md bg-card border-border focus:border-primary font-display text-[15px]"
              />
            </div>

            {!isLogin && (
              <div>
                <label className="block font-ui text-[11px] uppercase tracking-widest text-primary-deep mb-2">Rol</label>
                <div className="grid grid-cols-2 gap-3">
                  {([
                    { v: "client", label: "Grădinar" },
                    { v: "farmer", label: "Fermier" },
                  ] as const).map(r => (
                    <button
                      key={r.v}
                      type="button"
                      onClick={() => setRole(r.v)}
                      className={`press h-12 rounded-md border font-display text-[15px] transition-colors ${
                        role === r.v
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-transparent border-border hover:border-primary"
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              type="submit"
              className="press w-full h-12 rounded-md bg-primary text-primary-foreground hover:bg-primary-deep font-display text-[15px]"
            >
              {isLogin ? "Intră în cont" : "Creează cont"}
            </button>

            <p className="text-center font-display text-sm text-muted-foreground pt-2">
              {isLogin ? (
                <>Nu ai cont? <Link to="/register" className="text-primary-deep link-underline">Înregistrează-te</Link></>
              ) : (
                <>Ai deja cont? <Link to="/login" className="text-primary-deep link-underline">Intră aici</Link></>
              )}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
