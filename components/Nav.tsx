import Link from "next/link";
import { Sparkles } from "lucide-react";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/env";

export async function Nav() {
  let user = null;

  if (isSupabaseConfigured()) {
    const supabase = createServerSupabaseClient();
    const response = await supabase.auth.getUser();
    user = response.data.user;
  }

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-white/90 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold text-ink">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent text-white">
            <Sparkles size={18} />
          </span>
          <span>VetrinaGo</span>
        </Link>
        <div className="flex items-center gap-2 text-sm">
          <Link href="/creazione-siti-web" className="rounded-lg px-3 py-2 text-ink/70 transition hover:bg-mist hover:text-ink">
            Siti Web
          </Link>
          <Link href="/pricing" className="rounded-lg px-3 py-2 text-ink/70 transition hover:bg-mist hover:text-ink">
            Prezzi
          </Link>
          {user ? (
            <>
              <Link href="/dashboard" className="rounded-lg px-3 py-2 text-ink/70 transition hover:bg-mist hover:text-ink">
                Dashboard
              </Link>
              <Link href="/account" className="rounded-lg bg-ink px-4 py-2 font-medium text-white transition hover:bg-ink/90">
                Account
              </Link>
            </>
          ) : (
            <>
              <Link href="/login" className="rounded-lg px-3 py-2 text-ink/70 transition hover:bg-mist hover:text-ink">
                Accedi
              </Link>
              <Link href="/login" className="rounded-lg bg-accent px-4 py-2 font-medium text-white transition hover:bg-accent/90">
                Prova gratis
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
