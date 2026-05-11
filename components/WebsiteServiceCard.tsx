import Link from "next/link";
import { CheckCircle2, Globe, Mail, MessageCircle, Smartphone } from "lucide-react";

export const websiteServiceContact = {
  phoneLabel: "+39 3478219394",
  email: "francescoiannone06@gmail.com",
  whatsappUrl: "https://wa.me/393478219394",
  emailUrl: "mailto:francescoiannone06@gmail.com",
  pec: "francescoiannone@namirialpec.it"
};

const servicePoints = [
  "Sito vetrina moderno e mobile-friendly",
  "Menu online chiaro e facile da consultare",
  "Foto, orari, contatti e Google Maps",
  "Pulsante WhatsApp o chiamata diretta",
  "Collegamento a Instagram, Facebook e social",
  "Ideale per ristoranti, bar, pizzerie, pub, pasticcerie e piccole attività locali"
];

export function WebsiteServiceCard({ compact = false }: { compact?: boolean }) {
  return (
    <section className={compact ? "" : "mx-auto max-w-6xl px-4 py-16 sm:px-6"}>
      <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-soft">
        <div className="grid gap-0 lg:grid-cols-[1fr_360px]">
          <div className="p-6 sm:p-8">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent">
              <Globe size={16} />
              Creazione siti web
            </div>
            <h2 className={`${compact ? "text-2xl" : "text-3xl"} font-semibold leading-tight text-ink`}>
              Vuoi un sito web per il tuo ristorante o la tua attività?
            </h2>
            <p className="mt-4 max-w-3xl leading-8 text-ink/68">
              Creo siti web moderni, semplici e ottimizzati per telefono, pensati per aiutare ristoranti, bar e piccole attività a mostrare menu, foto, orari, posizione, contatti e pulsanti rapidi per chiamate o WhatsApp.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {servicePoints.map((point) => (
                <div key={point} className="flex gap-3 text-sm leading-6 text-ink/72">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-accent" />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-xl border border-line bg-mist p-5">
              <h3 className="font-semibold text-ink">Richiedi una bozza gratuita</h3>
              <p className="mt-2 leading-7 text-ink/65">
                Contattami per ricevere una prima bozza gratuita del tuo sito. Se ti piace, possiamo sviluppare insieme il sito completo.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <a
                  href={websiteServiceContact.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="focus-ring inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-accent px-5 font-semibold text-white transition hover:bg-accent/90"
                >
                  <MessageCircle size={19} />
                  Scrivimi su WhatsApp
                </a>
                <a
                  href={websiteServiceContact.emailUrl}
                  className="focus-ring inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-line bg-white px-5 font-semibold text-ink transition hover:bg-white/80"
                >
                  <Mail size={19} />
                  Mandami una email
                </a>
              </div>
            </div>
          </div>

          <aside className="border-t border-line bg-gradient-to-b from-mist to-white p-6 sm:p-8 lg:border-l lg:border-t-0">
            <div className="grid h-full content-between gap-6">
              <div>
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-ink text-white shadow-soft">
                  <Smartphone size={25} />
                </div>
                <p className="mt-6 text-sm font-medium uppercase tracking-[0.16em] text-ink/45">Contatti</p>
                <div className="mt-3 space-y-2 text-ink">
                  <p className="font-semibold">WhatsApp / Telefono</p>
                  <a href={websiteServiceContact.whatsappUrl} target="_blank" rel="noreferrer" className="block text-ink/68 hover:text-accent">
                    {websiteServiceContact.phoneLabel}
                  </a>
                  <p className="pt-3 font-semibold">Email</p>
                  <a href={websiteServiceContact.emailUrl} className="block break-words text-ink/68 hover:text-accent">
                    {websiteServiceContact.email}
                  </a>
                </div>
              </div>
              {!compact ? (
                <Link href="/creazione-siti-web" className="focus-ring inline-flex h-11 items-center justify-center rounded-lg bg-ink px-4 font-semibold text-white transition hover:bg-ink/90">
                  Scopri il servizio
                </Link>
              ) : null}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
