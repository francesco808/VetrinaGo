import { redirect } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SetupNotice } from "@/components/SetupNotice";
import { isSupabaseConfigured } from "@/lib/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { LoginForm } from "./LoginForm";

export default async function LoginPage() {
  if (!isSupabaseConfigured()) {
    return <SetupNotice title="Login non ancora configurato" />;
  }

  const supabase = createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (user) redirect("/dashboard");

  return (
    <>
      <Nav />
      <main className="mx-auto grid min-h-[calc(100vh-8rem)] max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_420px]">
        <div>
          <h1 className="text-4xl font-semibold text-ink">Entra e crea i tuoi primi contenuti.</h1>
          <p className="mt-4 max-w-xl leading-8 text-ink/65">
            Registrati gratis, prova 2 generazioni e sblocca il piano Pro quando vuoi continuare.
          </p>
        </div>
        <LoginForm />
      </main>
      <Footer />
    </>
  );
}
