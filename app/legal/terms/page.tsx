import { LegalPage } from "@/components/LegalPage";

export default function TermsPage() {
  return (
    <LegalPage title="Terms and Conditions">
      <p>
        Questi sono Termini e Condizioni placeholder. Prima della pubblicazione sostituiscili con condizioni complete su registrazione, uso consentito, pagamenti, cancellazione, responsabilità, disponibilità del servizio e proprietà dei contenuti.
      </p>
      <p>
        Il piano Pro costa 5€ al mese e viene gestito tramite Stripe. Gli utenti possono gestire o cancellare l'abbonamento dal Customer Portal.
      </p>
    </LegalPage>
  );
}
