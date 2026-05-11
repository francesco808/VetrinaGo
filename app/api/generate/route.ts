import { NextResponse } from "next/server";
import { mockAI } from "@/lib/ai";
import { createServerSupabaseClient, createServiceSupabaseClient } from "@/lib/supabase/server";
import { ensureProfile, getUsageSummary } from "@/lib/usage";
import { generateSchema } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const supabaseAuth = createServerSupabaseClient();
    const {
      data: { user },
      error: authError
    } = await supabaseAuth.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Devi accedere per generare contenuti." }, { status: 401 });
    }

    const body = await request.json();
    const parsed = generateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0]?.message || "Dati non validi." }, { status: 400 });
    }

    await ensureProfile(user.id, user.email ?? null);
    const usageBefore = await getUsageSummary(user.id);

    if (!usageBefore.isPro && usageBefore.remaining <= 0) {
      return NextResponse.json(
        {
          error: "Hai usato i tuoi 2 contenuti gratuiti. Passa al piano Pro a 5€/mese per continuare.",
          usage: usageBefore
        },
        { status: 402 }
      );
    }

    const result = await mockAI(parsed.data);
    const supabase = createServiceSupabaseClient();

    const { error: insertError } = await supabase.from("usage_events").insert({
      user_id: user.id,
      prompt_input: parsed.data,
      result_output: result
    });

    if (insertError) throw insertError;

    const usageAfter = await getUsageSummary(user.id);

    return NextResponse.json({ result, usage: usageAfter });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Errore durante la generazione. Riprova tra poco." }, { status: 500 });
  }
}
