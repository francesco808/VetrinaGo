"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { createBrowserSupabaseClient } from "@/lib/supabase/browser";

export function SignOutButton() {
  const router = useRouter();
  const supabase = createBrowserSupabaseClient();

  async function signOut() {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <button onClick={signOut} className="focus-ring inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-line bg-white px-4 font-semibold text-ink transition hover:bg-mist">
      <LogOut size={18} />
      Esci
    </button>
  );
}
