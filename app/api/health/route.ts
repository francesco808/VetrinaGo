import { NextResponse } from "next/server";
import { createServiceSupabaseClient } from "@/lib/supabase/server";
import { requireEnv } from "@/lib/env";
import { isSupabaseConfigured, isSupabaseServiceConfigured } from "@/lib/env";

export const dynamic = "force-dynamic";

export async function GET() {
  const checks: Record<string, unknown> = {
    supabasePublicEnv: isSupabaseConfigured(),
    supabaseServiceEnv: isSupabaseServiceConfigured(),
    serviceKeyShape: getServiceKeyShape(),
    restApiStatus: "not_checked",
    profilesTable: "not_checked",
    usageEventsTable: "not_checked",
    subscriptionsTable: "not_checked"
  };

  if (!isSupabaseConfigured() || !isSupabaseServiceConfigured()) {
    return NextResponse.json({ ok: false, checks });
  }

  try {
    const supabase = createServiceSupabaseClient();
    checks.restApiStatus = await checkRestApi();

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
    stringValue: String(error),
    constructor: error.constructor?.name ?? "",
    message: record.message ?? "",
    code: record.code ?? "",
    details: record.details ?? "",
    hint: record.hint ?? "",
    name: record.name ?? "",
    status: record.status ?? "",
    statusText: record.statusText ?? ""
  };
}

function getServiceKeyShape() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

  return {
    exists: Boolean(key),
    length: key.length,
    startsWithJwt: key.startsWith("eyJ"),
    startsWithSecret: key.startsWith("sb_secret_"),
    hasSpaces: /\s/.test(key),
    hasQuotes: key.startsWith("\"") || key.endsWith("\"") || key.startsWith("'") || key.endsWith("'")
  };
}

async function checkRestApi() {
  try {
    const url = `${requireEnv("NEXT_PUBLIC_SUPABASE_URL")}/rest/v1/profiles?select=id&limit=1`;
    const key = requireEnv("SUPABASE_SERVICE_ROLE_KEY");
    const response = await fetch(url, {
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`
      },
      cache: "no-store"
    });

    const text = await response.text();

    return {
      ok: response.ok,
      status: response.status,
      statusText: response.statusText,
      bodyPreview: text.slice(0, 240)
    };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : String(error)
    };
  }
}
