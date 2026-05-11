import Link from "next/link";
import { redirect } from "next/navigation";
import { CreditCard, Mail, ShieldCheck } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SetupNotice } from "@/components/SetupNotice";
import { isSupabaseConfigured, isSupabaseServiceConfigured } from "@/lib/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { ensureProfile, getUsageSummary } from "@/lib/usage";
import { SignOutButton } from "./SignOutButton";

export default async function AccountPage() {
  if (!isSupabaseConfigured() || !isSupabaseServiceConfigured()) {
    return <SetupNotice title="Account non ancora configurato" />;
  }

  const supabase = createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  await ensureProfile(user.id, user.email ?? null);
  const usage = await getUsageSummary(user.id);

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-ink">Account</h1>
          <p className="mt-2 text-ink/62">Gestisci accesso, stato del piano e abbonamento.</p>
        </div>

        <div className="grid gap-5">
          <section className="rounded-2xl border border-line bg-white p-6 shadow-soft">
            <div className="flex items-start gap-4">
              <span className="grid h-11 w-11 place-items-center rounded-lg bg-mist text-accent">
                <Mail size={21} />
              </span>
              <div>
                <h2 className="font-semibold text-ink">Email utente</h2>
                <p className="mt-1 text-ink/65">{user.email}</p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-line bg-white p-6 shadow-soft">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-mist text-accent">
                  <ShieldCheck size={21} />
                </span>
                <div>
                  <h2 className="font-semibold text-ink">Stato abbonamento</h2>
                  <p className="mt-1 text-ink/65">{usage.isPro ? "Pro attivo" : `Free, ${usage.remaining} utilizzi gratuiti rimasti`}</p>
                  <p className="mt-1 text-sm text-ink/45">Stato Stripe: {usage.status}</p>
                </div>
              </div>
              {usage.stripeCustomerId ? (
                <a href="/api/stripe/portal" className="focus-ring inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-ink px-4 font-semibold text-white transition hover:bg-ink/90">
                  <CreditCard size={18} />
                  Gestisci piano
                </a>
              ) : (
                <Link href="/api/stripe/checkout" className="focus-ring inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-accent px-4 font-semibold text-white transition hover:bg-accent/90">
                  <CreditCard size={18} />
                  Passa a Pro
                </Link>
              )}
            </div>
          </section>

          <div className="flex justify-end">
            <SignOutButton />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
