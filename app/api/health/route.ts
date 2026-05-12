import { NextResponse } from "next/server";
import { createServiceSupabaseClient } from "@/lib/supabase/server";
import { isSupabaseConfigured, isSupabaseServiceConfigured } from "@/lib/env";

export const dynamic = "force-dynamic";

export async function GET() {
  const checks: Record<string, unknown> = {
    supabasePublicEnv: isSupabaseConfigured(),
    supabaseServiceEnv: isSupabaseServiceConfigured(),
    profilesTable: "not_checked",
    usageEventsTable: "not_checked",
    subscriptionsTable: "not_checked"
  };

  if (!isSupabaseConfigured() || !isSupabaseServiceConfigured()) {
    return NextResponse.json({ ok: false, checks });
  }

  try {
    const supabase = createServiceSupabaseClient();

    const [profiles, usageEvents, subscriptions] = await Promise.all([
      supabase.from("profiles").select("id", { count: "exact", head: true }),
      supabase.from("usage_events").select("id", { count: "exact", head: true }),
      supabase.from("subscriptions").select("id", { count: "exact", head: true })
    ]);

    checks.profilesTable = profiles.error ? formatSupabaseError(profiles.error) : "ok";
    checks.usageEventsTable = usageEvents.error ? formatSupabaseError(usageEvents.error) : "ok";
    checks.subscriptionsTable = subscriptions.error ? formatSupabaseError(subscriptions.error) : "ok";

    return NextResponse.json({
      ok: !profiles.error && !usageEvents.error && !subscriptions.error,
      checks
    });
  } catch (error) {
    return NextResponse.json({
      ok: false,
      checks,
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
}

function formatSupabaseError(error: unknown) {
  if (!error || typeof error !== "object") {
    return String(error);
  }

  const record = error as Record<string, unknown>;

  return {
    message: record.message ?? "",
    code: record.code ?? "",
    details: record.details ?? "",
    hint: record.hint ?? "",
    name: record.name ?? "",
    status: record.status ?? "",
    statusText: record.statusText ?? ""
  };
}
