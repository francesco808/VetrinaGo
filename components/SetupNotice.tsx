import Link from "next/link";
import { Settings } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";

export function SetupNotice({ title = "Configurazione richiesta" }: { title?: string }) {
  return (
    <>
      <Nav />
      <main className="mx-auto grid min-h-[calc(100vh-8rem)] max-w-3xl place-items-center px-4 py-12 sm:px-6">
        <section className="rounded-2xl border border-line bg-white p-6 text-center shadow-soft sm:p-8">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-mist text-accent">
            <Settings size={26} />
          </div>
          <h1 className="mt-5 text-3xl font-semibold text-ink">{title}</h1>
          <p className="mt-4 leading-8 text-ink/65">
            La landing di VetrinaGo funziona già. Per usare login, dashboard, database e pagamenti devi aggiungere le chiavi Supabase e Stripe nel file <code className="rounded bg-mist px-1.5 py-1">.env.local</code>.
          </p>
          <Link href="/" className="focus-ring mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-accent px-5 font-semibold text-white transition hover:bg-accent/90">
            Torna alla home
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
