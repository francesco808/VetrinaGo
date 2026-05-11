"use client";

import { useEffect, useState } from "react";
import { Mail, MessageCircle, X } from "lucide-react";
import { websiteServiceContact } from "@/components/WebsiteServiceCard";

const STORAGE_KEY = "ai_creator_website_cta_closed";

export function FloatingWebsiteCTA() {
  const [canShowByTime, setCanShowByTime] = useState(false);
  const [canShowByScroll, setCanShowByScroll] = useState(false);
  const [closed, setClosed] = useState(true);

  useEffect(() => {
    const wasClosed = sessionStorage.getItem(STORAGE_KEY) === "true";
    setClosed(wasClosed);

    const timer = window.setTimeout(() => setCanShowByTime(true), 5000);

    function handleScroll() {
      if (window.scrollY >= 240) {
        setCanShowByScroll(true);
      }
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function closeWidget() {
    sessionStorage.setItem(STORAGE_KEY, "true");
    setClosed(true);
  }

  function trackContactClick(type: "whatsapp" | "email") {
    const win = window as Window & {
      gtag?: (eventName: string, action: string, params?: Record<string, string>) => void;
    };
    win.gtag?.("event", "website_service_contact_click", {
      contact_type: type
    });
  }

  if (closed || !canShowByTime || !canShowByScroll) return null;

  return (
    <aside
      aria-label="Servizio creazione siti web"
      className="fixed bottom-4 right-4 z-50 w-[calc(100vw-2rem)] max-w-[380px] animate-[websiteCtaIn_420ms_ease-out] sm:bottom-6 sm:right-6"
    >
      <div className="relative rounded-2xl border border-line bg-white p-4 shadow-soft">
        <button
          type="button"
          onClick={closeWidget}
          aria-label="Chiudi il messaggio sul servizio siti web"
          className="focus-ring absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-mist text-ink/65 transition hover:text-ink"
        >
          <X size={17} />
        </button>

        <div className="flex gap-3 pr-8">
          <div className="relative shrink-0">
            <span className="absolute inset-0 animate-ping rounded-full bg-accent/20" aria-hidden="true" />
            <img
              src="/website-avatar.svg"
              alt="Consulente web sorridente"
              className="relative h-16 w-16 rounded-full border-4 border-white bg-mist object-cover shadow-lg"
            />
          </div>
          <div>
            <h2 className="text-base font-semibold leading-snug text-ink">Vuoi anche un sito web tutto tuo?</h2>
            <p className="mt-2 text-sm leading-6 text-ink/65">
              Creo siti web moderni e ottimizzati per telefono per ristoranti e piccole attività. Se vuoi una prima bozza gratuita del tuo sito, contattami.
            </p>
          </div>
        </div>

        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <a
            href={websiteServiceContact.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackContactClick("whatsapp")}
            className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-accent px-3 text-sm font-semibold text-white transition hover:bg-accent/90"
          >
            <MessageCircle size={17} />
            WhatsApp
          </a>
          <a
            href={websiteServiceContact.emailUrl}
            onClick={() => trackContactClick("email")}
            className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-line bg-white px-3 text-sm font-semibold text-ink transition hover:bg-mist"
          >
            <Mail size={17} />
            Email
          </a>
        </div>
      </div>
      <style jsx>{`
        @keyframes websiteCtaIn {
          from {
            opacity: 0;
            transform: translateY(18px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </aside>
  );
}
