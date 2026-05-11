import Link from "next/link";
import { ArrowRight, BadgeEuro, CheckCircle2, Clock3, LineChart, Smartphone, WandSparkles } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { FloatingWebsiteCTA } from "@/components/FloatingWebsiteCTA";
import { WebsiteServiceCard } from "@/components/WebsiteServiceCard";

const benefits = [
  { icon: WandSparkles, title: "Idee pronte", text: "Post, reel, caption e hashtag in pochi secondi." },
  { icon: LineChart, title: "Pensato per vendere", text: "Input semplici per trasformare offerte e prodotti in contenuti." },
  { icon: Smartphone, title: "Installabile", text: "Usalo anche come app dal browser mobile grazie alla PWA." }
];

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <section className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1 text-sm text-ink/70 shadow-sm">
              <Clock3 size={15} />
              2 contenuti gratis, poi Pro a 5€/mese
            </div>
            <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-normal text-ink sm:text-6xl">
              VetrinaGo
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/70">
              Una mini app AI per commercianti, locali e professionisti che vogliono creare contenuti social più velocemente senza partire ogni volta da zero.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/login" className="focus-ring inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-accent px-6 font-semibold text-white transition hover:bg-accent/90">
                Prova gratis
                <ArrowRight size={18} />
              </Link>
              <Link href="/login" className="focus-ring inline-flex h-12 items-center justify-center rounded-lg border border-line bg-white px-6 font-semibold text-ink transition hover:bg-mist">
                Accedi
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-line bg-white p-4 shadow-soft">
            <div className="rounded-xl bg-ink p-5 text-white">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm text-white/65">Anteprima generatore</span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs">Instagram</span>
              </div>
              <h2 className="text-2xl font-semibold">Centro estetico</h2>
              <p className="mt-2 text-white/70">Obiettivo: annunciare offerta viso con tono elegante.</p>
            </div>
            <div className="mt-4 grid gap-3">
              {["Reel prima/dopo con dettaglio trattamento", "Caption empatica con invito alla prenotazione", "#centroestetico #bellezza #promo"].map((item) => (
                <div key={item} className="rounded-xl border border-line bg-mist p-4 text-sm text-ink/75">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-line bg-white">
          <div className="mx-auto grid max-w-6xl gap-4 px-4 py-14 sm:px-6 md:grid-cols-3">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="rounded-xl border border-line bg-white p-6">
                <benefit.icon className="mb-5 text-accent" size={24} />
                <h3 className="text-lg font-semibold text-ink">{benefit.title}</h3>
                <p className="mt-2 leading-7 text-ink/65">{benefit.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
            <div>
              <h2 className="text-3xl font-semibold text-ink">Creato per chi lavora ogni giorno con i social.</h2>
              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                {["Bar e ristoranti", "Palestre", "Centri estetici", "Negozi locali"].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-ink/75">
                    <CheckCircle2 size={19} className="text-accent" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-line bg-white p-6 shadow-soft">
              <div className="mb-4 flex items-center gap-2 text-accent">
                <BadgeEuro size={22} />
                <span className="font-semibold">Piano Pro</span>
              </div>
              <p className="text-4xl font-semibold text-ink">5€<span className="text-base font-medium text-ink/55">/mese</span></p>
              <p className="mt-3 leading-7 text-ink/65">Generazioni illimitate dopo i 2 contenuti gratuiti.</p>
              <Link href="/pricing" className="focus-ring mt-6 inline-flex h-11 w-full items-center justify-center rounded-lg bg-ink font-semibold text-white transition hover:bg-ink/90">
                Vedi prezzi
              </Link>
            </div>
          </div>
        </section>

        <WebsiteServiceCard />
      </main>
      <FloatingWebsiteCTA />
      <Footer />
    </>
  );
}
