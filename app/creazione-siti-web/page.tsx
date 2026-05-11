import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, CheckCircle2, Globe, Mail, MapPin, MessageCircle, Smartphone } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { websiteServiceContact } from "@/components/WebsiteServiceCard";

const includes = [
  "Homepage moderna e chiara",
  "Menu online consultabile da telefono",
  "Galleria foto e sezioni per prodotti o servizi",
  "Orari, contatti, Google Maps e pulsanti rapidi",
  "Collegamenti a Instagram, Facebook e altri social",
  "Design responsive pensato prima per smartphone"
];

const audiences = [
  "Ristoranti",
  "Bar",
  "Pizzerie",
  "Pub",
  "Pasticcerie",
  "Parrucchieri",
  "Centri estetici",
  "Palestre",
  "Piccole attività locali"
];

const process = [
  "Mi contatti via WhatsApp o email",
  "Mi mandi nome attività, logo, foto e informazioni principali",
  "Ti preparo una prima bozza gratuita",
  "Se la bozza ti piace, procediamo con il sito completo",
  "Il pagamento avviene alla consegna finale"
];

const faqs = [
  {
    question: "La bozza è davvero gratuita?",
    answer: "Sì, preparo una prima bozza senza impegno. Se ti piace, possiamo procedere con il sito completo."
  },
  {
    question: "Il sito funziona da telefono?",
    answer: "Sì, il sito viene creato con design mobile-first, quindi è pensato prima di tutto per smartphone."
  },
  {
    question: "Il dominio e l’hosting sono inclusi?",
    answer: "Dominio e hosting possono essere configurati, ma il costo annuale è a carico del cliente."
  },
  {
    question: "Posso aggiornare menu e foto in futuro?",
    answer: "Sì, posso aiutarti con aggiornamenti occasionali o con un piccolo servizio mensile."
  },
  {
    question: "Per quali attività è adatto?",
    answer: "Ristoranti, bar, pizzerie, pasticcerie, pub, parrucchieri, centri estetici, palestre e piccole attività locali."
  }
];

export default function WebsiteServicePage() {
  return (
    <>
      <Nav />
      <main>
        <section className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_420px]">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1 text-sm text-ink/70 shadow-sm">
              <Globe size={16} className="text-accent" />
              Siti web per attività locali
            </div>
            <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-ink sm:text-6xl">
              Creazione siti web per ristoranti e piccole attività
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/68">
              Creo siti moderni, semplici e ottimizzati per telefono per mostrare menu, foto, orari, posizione, contatti e pulsanti rapidi per WhatsApp o chiamate.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={websiteServiceContact.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="focus-ring inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-accent px-6 font-semibold text-white transition hover:bg-accent/90"
              >
                <MessageCircle size={19} />
                Scrivimi su WhatsApp
              </a>
              <a
                href={websiteServiceContact.emailUrl}
                className="focus-ring inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-line bg-white px-6 font-semibold text-ink transition hover:bg-mist"
              >
                <Mail size={19} />
                Mandami una email
              </a>
            </div>
          </div>

          <aside className="rounded-2xl border border-line bg-white p-6 shadow-soft">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-ink text-white">
              <Smartphone size={26} />
            </div>
            <p className="mt-6 text-sm font-medium uppercase tracking-[0.16em] text-ink/45">Prezzo indicativo</p>
            <p className="mt-2 text-5xl font-semibold text-ink">da 200€</p>
            <p className="mt-4 leading-7 text-ink/65">
              Prima bozza gratuita. Se ti piace, procediamo con il sito completo e il pagamento avviene alla consegna finale.
            </p>
          </aside>
        </section>

        <section className="border-y border-line bg-white">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <h2 className="text-3xl font-semibold text-ink">Cosa include il sito</h2>
              <p className="mt-4 leading-8 text-ink/65">
                Una presenza online ordinata, veloce da consultare e pensata per trasformare chi visita il sito in un contatto reale.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {includes.map((item) => (
                <div key={item} className="flex gap-3 rounded-xl border border-line bg-mist p-4 text-ink/72">
                  <CheckCircle2 size={19} className="mt-0.5 shrink-0 text-accent" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border border-line bg-white p-6 shadow-soft">
              <h2 className="text-2xl font-semibold text-ink">Per chi è pensato</h2>
              <div className="mt-6 flex flex-wrap gap-2">
                {audiences.map((item) => (
                  <span key={item} className="rounded-full bg-mist px-3 py-2 text-sm font-medium text-ink/72">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-line bg-white p-6 shadow-soft">
              <h2 className="text-2xl font-semibold text-ink">Contatti rapidi</h2>
              <div className="mt-5 space-y-4">
                <ContactLine icon={<MessageCircle size={20} />} label="WhatsApp / Telefono" value={websiteServiceContact.phoneLabel} href={websiteServiceContact.whatsappUrl} />
                <ContactLine icon={<Mail size={20} />} label="Email" value={websiteServiceContact.email} href={websiteServiceContact.emailUrl} />
                <ContactLine icon={<MapPin size={20} />} label="Ideale per" value="Attività locali e servizi di quartiere" />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-ink py-14 text-white">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <h2 className="text-3xl font-semibold">Come funziona</h2>
                <p className="mt-4 leading-8 text-white/65">
                  Processo semplice, senza impegno iniziale e con pagamento solo alla consegna finale.
                </p>
              </div>
              <div className="grid gap-3">
                {process.map((item, index) => (
                  <div key={item} className="flex gap-4 rounded-xl border border-white/10 bg-white/5 p-4">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white text-sm font-semibold text-ink">{index + 1}</span>
                    <p className="leading-7 text-white/80">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <h2 className="text-3xl font-semibold text-ink">FAQ</h2>
              <p className="mt-4 leading-8 text-ink/65">Le risposte alle domande più comuni prima di richiedere la bozza.</p>
            </div>
            <div className="grid gap-3">
              {faqs.map((faq) => (
                <details key={faq.question} className="rounded-xl border border-line bg-white p-5 shadow-sm">
                  <summary className="cursor-pointer font-semibold text-ink">{faq.question}</summary>
                  <p className="mt-3 leading-7 text-ink/65">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
          <div className="rounded-2xl border border-line bg-white p-6 text-center shadow-soft sm:p-8">
            <h2 className="text-3xl font-semibold text-ink">Richiedi una bozza gratuita</h2>
            <p className="mx-auto mt-4 max-w-2xl leading-8 text-ink/65">
              Mandami nome attività, foto e informazioni principali: preparo una prima proposta visuale del sito.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <a href={websiteServiceContact.whatsappUrl} target="_blank" rel="noreferrer" className="focus-ring inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-accent px-6 font-semibold text-white transition hover:bg-accent/90">
                <MessageCircle size={19} />
                Scrivimi su WhatsApp
              </a>
              <a href={websiteServiceContact.emailUrl} className="focus-ring inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-line bg-white px-6 font-semibold text-ink transition hover:bg-mist">
                <Mail size={19} />
                Mandami una email
              </a>
            </div>
            <Link href="/" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent/80">
              Torna a VetrinaGo
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function ContactLine({ icon, label, value, href }: { icon: ReactNode; label: string; value: string; href?: string }) {
  const content = (
    <>
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-mist text-accent">{icon}</span>
      <span>
        <span className="block text-sm text-ink/50">{label}</span>
        <span className="block break-words font-semibold text-ink">{value}</span>
      </span>
    </>
  );

  if (href) {
    return (
      <a href={href} target={href.startsWith("https://") ? "_blank" : undefined} rel={href.startsWith("https://") ? "noreferrer" : undefined} className="flex items-center gap-3 rounded-xl border border-line p-3 transition hover:bg-mist">
        {content}
      </a>
    );
  }

  return <div className="flex items-center gap-3 rounded-xl border border-line p-3">{content}</div>;
}
