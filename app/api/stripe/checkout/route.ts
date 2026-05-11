import { NextResponse } from "next/server";
import { getSiteUrl, requireEnv } from "@/lib/env";
import { createServerSupabaseClient, createServiceSupabaseClient } from "@/lib/supabase/server";
import { getStripe } from "@/lib/stripe";

export async function GET() {
  try {
    const supabaseAuth = createServerSupabaseClient();
    const {
      data: { user }
    } = await supabaseAuth.auth.getUser();

    if (!user) return NextResponse.redirect(`${getSiteUrl()}/login`);

    const stripe = getStripe();
    const supabase = createServiceSupabaseClient();
    const { data: existing } = await supabase
      .from("subscriptions")
      .select("stripe_customer_id")
      .eq("user_id", user.id)
      .not("stripe_customer_id", "is", null)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    let customerId = existing?.stripe_customer_id ?? null;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: { supabase_user_id: user.id }
      });
      customerId = customer.id;

      await supabase.from("subscriptions").insert({
        user_id: user.id,
        stripe_customer_id: customerId,
        status: "incomplete"
      });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: customerId,
      line_items: [{ price: requireEnv("NEXT_PUBLIC_STRIPE_PRICE_ID"), quantity: 1 }],
      success_url: `${getSiteUrl()}/account?checkout=success`,
      cancel_url: `${getSiteUrl()}/pricing?checkout=cancelled`,
      subscription_data: {
        metadata: { supabase_user_id: user.id }
      },
      metadata: { supabase_user_id: user.id }
    });

    if (!session.url) throw new Error("Stripe Checkout URL missing");
    return NextResponse.redirect(session.url);
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(`${getSiteUrl()}/pricing?error=stripe_checkout`);
  }
}
