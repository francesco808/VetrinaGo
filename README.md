# VetrinaGo

Web app SaaS in Next.js per generare contenuti social con 2 utilizzi gratuiti, abbonamento Pro a 5€/mese e servizio di creazione siti web per attività locali.

## 1. Installazione

```bash
npm install
```

## 2. Configurazione Supabase

1. Crea un progetto su Supabase.
2. Apri SQL Editor e lancia `supabase/schema.sql`.
3. In Authentication abilita Email/Password e, se vuoi, Magic Link.
4. Aggiungi tra gli URL consentiti:
   - `http://localhost:3000/auth/callback`
   - `https://tuo-dominio.vercel.app/auth/callback`

## 3. Configurazione Stripe

1. Crea un prodotto “VetrinaGo Pro”.
2. Crea un prezzo ricorrente mensile da `5 EUR`.
3. Copia il Price ID in `NEXT_PUBLIC_STRIPE_PRICE_ID`.
4. Attiva il Customer Portal da Stripe Billing.
5. Crea un webhook verso `/api/stripe/webhook` con eventi:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`

## 4. Variabili ambiente

Copia `.env.example` in `.env.local` e compila:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PRICE_ID=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Non inserire mai `SUPABASE_SERVICE_ROLE_KEY`, `STRIPE_SECRET_KEY` o `STRIPE_WEBHOOK_SECRET` nel frontend.

## 5. Avvio locale

```bash
npm run dev
```

Apri `http://localhost:3000`.

## 6. Deploy su Vercel

1. Carica il progetto su GitHub.
2. Importa il repository in Vercel.
3. Inserisci tutte le variabili ambiente in Project Settings.
4. Imposta `NEXT_PUBLIC_SITE_URL` al dominio Vercel, per esempio `https://vetrinago.vercel.app`.
5. Aggiorna in Supabase gli URL di redirect.
6. Aggiorna in Stripe il webhook con il dominio di produzione.

## 7. Test pagamento Stripe

In modalità test usa una carta Stripe di prova:

```text
4242 4242 4242 4242
Data futura
CVC qualsiasi
CAP qualsiasi
```

Per testare i webhook in locale puoi usare Stripe CLI:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Copia il webhook secret mostrato dalla CLI in `STRIPE_WEBHOOK_SECRET`.

## PWA mobile

La PWA include `manifest.json`, icone PNG per browser moderni, Apple touch icon, icona maskable, service worker e pagina offline.

Su iPhone/iPad: apri il sito in Safari, premi Condividi, poi “Aggiungi alla schermata Home”.

Su Android: apri il sito in Chrome e scegli “Installa app” o “Aggiungi a schermata Home”.

Su macOS/Windows/Linux: apri il sito con Chrome, Edge o un browser compatibile PWA e usa “Installa app” dalla barra indirizzi o dal menu del browser.

Nota: i browser decidono se mostrare il prompt di installazione. Su iOS l’installazione passa da Safari e dal comando “Aggiungi alla schermata Home”. Il service worker viene registrato in produzione. In sviluppo puoi verificare manifest e icone, mentre l’installazione completa va provata dopo build/deploy HTTPS.

## AI reale in futuro

La generazione è simulata in `lib/ai.ts` con `mockAI()`. Per collegare OpenAI:

1. Aggiungi `OPENAI_API_KEY` alle variabili ambiente.
2. Sostituisci il corpo di `mockAI()` con una chiamata API.
3. Mantieni lo stesso formato di ritorno `GenerateResult`.
