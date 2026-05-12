"use client";

import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function AccountError() {
  return (
    <main className="grid min-h-screen place-items-center px-4">
      <section className="max-w-md rounded-2xl border border-line bg-white p-6 text-center shadow-soft">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-coral/10 text-coral">
          <AlertTriangle size={26} />
        </div>
        <h1 className="mt-5 text-2xl font-semibold text-ink">Account non disponibile</h1>
        <p className="mt-3 leading-7 text-ink/65">
          C&apos;è un problema temporaneo con la configurazione del database. Controlla le chiavi Supabase su Vercel e riprova.
        </p>
        <Link href="/" className="focus-ring mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-accent px-5 font-semibold text-white transition hover:bg-accent/90">
          Torna alla home
        </Link>
      </section>
    </main>
  );
}
