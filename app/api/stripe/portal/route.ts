import { NextResponse } from "next/server";
import { getSiteUrl } from "@/lib/env";
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
    const { data: subscription } = await supabase
      .from("subscriptions")
      .select("stripe_customer_id")
      .eq("user_id", user.id)
      .not("stripe_customer_id", "is", null)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!subscription?.stripe_customer_id) {
      return NextResponse.redirect(`${getSiteUrl()}/pricing`);
    }

    const portal = await stripe.billingPortal.sessions.create({
      customer: subscription.stripe_customer_id,
      return_url: `${getSiteUrl()}/account`
    });

    return NextResponse.redirect(portal.url);
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(`${getSiteUrl()}/account?error=stripe_portal`);
  }
}
