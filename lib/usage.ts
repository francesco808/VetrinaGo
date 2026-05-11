import { createServiceSupabaseClient } from "@/lib/supabase/server";

export const FREE_USAGE_LIMIT = 2;

export async function ensureProfile(userId: string, email: string | null) {
  const supabase = createServiceSupabaseClient();
  await supabase.from("profiles").upsert(
    {
      id: userId,
      email
    },
    { onConflict: "id" }
  );
}

export async function getUsageSummary(userId: string) {
  const supabase = createServiceSupabaseClient();

  const [{ count, error: usageError }, { data: subscription, error: subscriptionError }] = await Promise.all([
    supabase.from("usage_events").select("id", { count: "exact", head: true }).eq("user_id", userId),
    supabase
      .from("subscriptions")
      .select("status, current_period_end, stripe_customer_id")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle()
  ]);

  if (usageError) throw usageError;
  if (subscriptionError) throw subscriptionError;

  const status = subscription?.status ?? "free";
  const isPro = status === "active" || status === "trialing";
  const used = count ?? 0;
  const remaining = Math.max(FREE_USAGE_LIMIT - used, 0);

  return {
    used,
    remaining,
    isPro,
    status,
    stripeCustomerId: subscription?.stripe_customer_id ?? null
  };
}
