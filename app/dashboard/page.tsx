import { redirect } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SetupNotice } from "@/components/SetupNotice";
import { isSupabaseConfigured, isSupabaseServiceConfigured } from "@/lib/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { ensureProfile, getUsageSummary } from "@/lib/usage";
import { Generator } from "./Generator";
import { WebsiteServiceCard } from "@/components/WebsiteServiceCard";

export default async function DashboardPage() {
  if (!isSupabaseConfigured() || !isSupabaseServiceConfigured()) {
    return <SetupNotice title="Dashboard non ancora configurata" />;
  }

  const supabase = createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  let usage;

  try {
    await ensureProfile(user.id, user.email ?? null);
    usage = await getUsageSummary(user.id);
  } catch (error) {
    console.error("Dashboard setup error", error);
    return <SetupNotice title="Database non ancora pronto" />;
  }

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="mb-7">
          <h1 className="text-3xl font-semibold text-ink">Dashboard</h1>
          <p className="mt-2 text-ink/62">Crea contenuti social pronti da adattare alla tua attività.</p>
        </div>
        <Generator initialUsage={usage} />
        <div className="mt-8">
          <WebsiteServiceCard compact />
        </div>
      </main>
      <Footer />
    </>
  );
}
