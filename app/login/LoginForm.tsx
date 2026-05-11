"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, Send } from "lucide-react";
import { createBrowserSupabaseClient } from "@/lib/supabase/browser";

type Mode = "login" | "register";

export function LoginForm() {
  const router = useRouter();
  const supabase = createBrowserSupabaseClient();
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handlePasswordAuth(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    const response =
      mode === "register"
        ? await supabase.auth.signUp({
            email,
            password,
            options: { emailRedirectTo: `${window.location.origin}/auth/callback` }
          })
        : await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);

    if (response.error) {
      setError(response.error.message);
      return;
    }

    if (mode === "register" && !response.data.session) {
      setMessage("Controlla la tua email per confermare la registrazione.");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  async function handleMagicLink() {
    setLoading(true);
    setError("");
    setMessage("");

    const { error: magicError } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` }
    });

    setLoading(false);

    if (magicError) {
      setError(magicError.message);
      return;
    }

    setMessage("Magic link inviato. Apri il link dalla tua email.");
  }

  return (
    <div className="rounded-2xl border border-line bg-white p-6 shadow-soft">
      <div className="mb-6 grid grid-cols-2 rounded-lg bg-mist p-1">
        <button type="button" onClick={() => setMode("login")} className={`h-10 rounded-md text-sm font-semibold ${mode === "login" ? "bg-white shadow-sm" : "text-ink/60"}`}>
          Accedi
        </button>
        <button type="button" onClick={() => setMode("register")} className={`h-10 rounded-md text-sm font-semibold ${mode === "register" ? "bg-white shadow-sm" : "text-ink/60"}`}>
          Registrati
        </button>
      </div>

      <form onSubmit={handlePasswordAuth} className="space-y-4">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-ink/75">Email</span>
          <span className="flex items-center gap-2 rounded-lg border border-line bg-white px-3">
            <Mail size={18} className="text-ink/45" />
            <input value={email} onChange={(event) => setEmail(event.target.value)} required type="email" placeholder="nome@email.it" className="h-12 w-full border-0 bg-transparent outline-none" />
          </span>
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-ink/75">Password</span>
          <span className="flex items-center gap-2 rounded-lg border border-line bg-white px-3">
            <Lock size={18} className="text-ink/45" />
            <input value={password} onChange={(event) => setPassword(event.target.value)} required minLength={6} type="password" placeholder="Minimo 6 caratteri" className="h-12 w-full border-0 bg-transparent outline-none" />
          </span>
        </label>
        <button disabled={loading} className="focus-ring h-12 w-full rounded-lg bg-accent font-semibold text-white transition hover:bg-accent/90 disabled:opacity-65">
          {loading ? "Attendi..." : mode === "register" ? "Crea account" : "Accedi"}
        </button>
      </form>

      <button type="button" onClick={handleMagicLink} disabled={loading || !email} className="focus-ring mt-3 inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-line bg-white font-semibold text-ink transition hover:bg-mist disabled:opacity-60">
        <Send size={18} />
        Invia magic link
      </button>

      {message ? <p className="mt-4 rounded-lg bg-accent/10 p-3 text-sm text-accent">{message}</p> : null}
      {error ? <p className="mt-4 rounded-lg bg-coral/10 p-3 text-sm text-coral">{error}</p> : null}
    </div>
  );
}
