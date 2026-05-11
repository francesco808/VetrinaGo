"use client";

import { useMemo, useState } from "react";
import { Copy, Loader2, Lock, Sparkles } from "lucide-react";
import type { GenerateResult } from "@/lib/ai";

type UsageSummary = {
  used: number;
  remaining: number;
  isPro: boolean;
  status: string;
};

export function Generator({ initialUsage }: { initialUsage: UsageSummary }) {
  const [businessType, setBusinessType] = useState("ristorante");
  const [goal, setGoal] = useState("promuovere un nuovo menu pranzo");
  const [tone, setTone] = useState("professionale e caldo");
  const [platform, setPlatform] = useState("Instagram");
  const [usage, setUsage] = useState(initialUsage);
  const [result, setResult] = useState<GenerateResult | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isLocked = !usage.isPro && usage.remaining <= 0;

  const resultText = useMemo(() => {
    if (!result) return "";
    return [
      "IDEE POST/REEL",
      ...result.ideas.map((item, index) => `${index + 1}. ${item}`),
      "",
      "CAPTION",
      ...result.captions.map((item, index) => `${index + 1}. ${item}`),
      "",
      "HASHTAG",
      result.hashtags.join(" "),
      "",
      "SCALETTA VIDEO",
      ...result.videoOutline.map((item) => `- ${item}`)
    ].join("\n");
  }, [result]);

  async function handleGenerate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ businessType, goal, tone, platform })
    });

    const payload = await response.json();
    setLoading(false);

    if (!response.ok) {
      setError(payload.error || "Non sono riuscito a generare il contenuto.");
      if (payload.usage) setUsage(payload.usage);
      return;
    }

    setResult(payload.result);
    setUsage(payload.usage);
  }

  async function copyResult() {
    if (!resultText) return;
    await navigator.clipboard.writeText(resultText);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[390px_1fr]">
      <section className="rounded-2xl border border-line bg-white p-5 shadow-soft">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-ink/55">Utilizzi gratis rimasti</p>
            <p className="text-3xl font-semibold text-ink">{usage.isPro ? "∞" : usage.remaining}</p>
          </div>
          <span className={`rounded-full px-3 py-1 text-sm font-medium ${usage.isPro ? "bg-accent/10 text-accent" : "bg-gold/10 text-gold"}`}>
            {usage.isPro ? "Pro attivo" : "Free"}
          </span>
        </div>

        {isLocked ? (
          <div className="rounded-xl border border-coral/30 bg-coral/10 p-4 text-coral">
            <Lock size={21} className="mb-3" />
            <p className="font-semibold">Hai usato i tuoi 2 contenuti gratuiti. Passa al piano Pro a 5€/mese per continuare.</p>
            <a href="/api/stripe/checkout" className="focus-ring mt-4 inline-flex h-11 w-full items-center justify-center rounded-lg bg-ink font-semibold text-white transition hover:bg-ink/90">
              Passa a Pro
            </a>
          </div>
        ) : null}

        <form onSubmit={handleGenerate} className="mt-5 space-y-4">
          <Field label="Tipo di attività" value={businessType} onChange={setBusinessType} placeholder="Bar, ristorante, palestra..." />
          <Field label="Obiettivo" value={goal} onChange={setGoal} placeholder="Promuovere un prodotto..." />
          <Field label="Tono" value={tone} onChange={setTone} placeholder="Elegante, giovane..." />
          <Field label="Piattaforma" value={platform} onChange={setPlatform} placeholder="TikTok, Instagram..." />
          <button disabled={loading || isLocked} className="focus-ring inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-accent font-semibold text-white transition hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-60">
            {loading ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
            Genera contenuto
          </button>
        </form>

        {error ? <p className="mt-4 rounded-lg bg-coral/10 p-3 text-sm text-coral">{error}</p> : null}
      </section>

      <section className="rounded-2xl border border-line bg-white p-5 shadow-soft">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold text-ink">Risultato AI</h2>
            <p className="text-sm text-ink/55">Idee, caption, hashtag e scaletta video.</p>
          </div>
          <button onClick={copyResult} disabled={!result} className="focus-ring inline-flex h-10 items-center gap-2 rounded-lg border border-line bg-white px-3 text-sm font-semibold text-ink transition hover:bg-mist disabled:opacity-45">
            <Copy size={16} />
            Copia
          </button>
        </div>

        {result ? (
          <div className="space-y-6">
            <ResultBlock title="3 idee post/reel" items={result.ideas} />
            <ResultBlock title="3 caption" items={result.captions} />
            <div>
              <h3 className="mb-3 font-semibold text-ink">5 hashtag</h3>
              <div className="flex flex-wrap gap-2">
                {result.hashtags.map((tag) => (
                  <span key={tag} className="rounded-full bg-mist px-3 py-1 text-sm text-ink/75">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <ResultBlock title="Mini scaletta video 15-30s" items={result.videoOutline} />
          </div>
        ) : (
          <div className="grid min-h-[420px] place-items-center rounded-xl border border-dashed border-line bg-mist p-8 text-center text-ink/55">
            Compila il box e genera il primo contenuto.
          </div>
        )}
      </section>
    </div>
  );
}

function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (value: string) => void; placeholder: string }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-ink/75">{label}</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} required placeholder={placeholder} className="h-11 w-full rounded-lg border border-line bg-white px-3 text-ink outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20" />
    </label>
  );
}

function ResultBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="mb-3 font-semibold text-ink">{title}</h3>
      <div className="grid gap-2">
        {items.map((item, index) => (
          <div key={item} className="rounded-xl border border-line bg-white p-4 text-ink/72">
            <span className="mr-2 font-semibold text-accent">{index + 1}.</span>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
