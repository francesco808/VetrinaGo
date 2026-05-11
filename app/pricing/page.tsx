import { Check } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { isSupabaseConfigured } from "@/lib/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export default async function PricingPage() {
  let user = null;

  if (isSupabaseConfigured()) {
    const supabase = createServerSupabaseClient();
    const response = await supabase.auth.getUser();
    user = response.data.user;
  }

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-semibold text-ink">Prezzi semplici</h1>
          <p className="mt-4 leading-8 text-ink/65">Parti gratis, poi sblocca generazioni illimitate per creare contenuti ogni settimana.</p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <Plan title="Free" price="0€" cta="Inizia gratis" href="/login" items={["2 utilizzi gratuiti totali", "Idee post e reel", "Caption, hashtag e scaletta video"]} />
          <Plan title="Pro" price="5€/mese" cta="Passa a Pro" href={user ? "/api/stripe/checkout" : "/login"} highlight items={["Generazioni illimitate", "Accesso da web e PWA", "Customer Portal Stripe per gestire il piano"]} />
        </div>
      </main>
      <Footer />
    </>
  );
}

function Plan({ title, price, cta, href, items, highlight = false }: { title: string; price: string; cta: string; href: string; items: string[]; highlight?: boolean }) {
  return (
    <div className={`rounded-2xl border p-6 ${highlight ? "border-accent bg-ink text-white shadow-soft" : "border-line bg-white text-ink"}`}>
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="mt-4 text-4xl font-semibold">{price}</p>
      <ul className="mt-6 space-y-3">
        {items.map((item) => (
          <li key={item} className={`flex gap-3 ${highlight ? "text-white/75" : "text-ink/70"}`}>
            <Check size={19} className={highlight ? "text-white" : "text-accent"} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <a href={href} className={`focus-ring mt-8 inline-flex h-11 w-full items-center justify-center rounded-lg font-semibold transition ${highlight ? "bg-white text-ink hover:bg-white/90" : "bg-accent text-white hover:bg-accent/90"}`}>
        {cta}
      </a>
    </div>
  );
}
