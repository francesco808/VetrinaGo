export type GenerateInput = {
  businessType: string;
  goal: string;
  tone: string;
  platform: string;
};

export type GenerateResult = {
  ideas: string[];
  captions: string[];
  hashtags: string[];
  videoOutline: string[];
};

function clean(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

export async function mockAI(input: GenerateInput): Promise<GenerateResult> {
  const businessType = clean(input.businessType);
  const goal = clean(input.goal);
  const tone = clean(input.tone);
  const platform = clean(input.platform);

  // Future OpenAI integration:
  // 1. Add OPENAI_API_KEY to your environment variables.
  // 2. Replace this deterministic mock with a call to the OpenAI Responses API.
  // 3. Keep returning the same GenerateResult shape so the UI and database stay unchanged.
  await new Promise((resolve) => setTimeout(resolve, 450));

  return {
    ideas: [
      `Un reel "${businessType} in 20 secondi" che mostra il prodotto o servizio chiave con ritmo ${tone}.`,
      `Una mini storia cliente: problema iniziale, soluzione offerta dalla tua attività e risultato finale.`,
      `Un contenuto dietro le quinte per ${platform}: preparazione, dettaglio umano e invito all'azione.`
    ],
    captions: [
      `${goal} senza sembrare forzati: oggi ti portiamo dentro il nostro modo di lavorare. Salva questo post e passa a trovarci.`,
      `Se ami le cose fatte bene, questo è per te. Scopri cosa rende speciale il nostro ${businessType}.`,
      `Nuova idea, stesso obiettivo: creare valore per chi ci segue. Scrivici "info" e ti raccontiamo tutto.`
    ],
    hashtags: [
      `#${businessType.replace(/\s+/g, "")}`,
      `#${platform.replace(/\s+/g, "")}`,
      "#marketinglocale",
      "#contenutisocial",
      "#piccoleimprese"
    ],
    videoOutline: [
      "0-3s: apertura con dettaglio visivo forte e testo breve sullo schermo.",
      `4-10s: mostra il contesto della tua attività e collega il messaggio a "${goal}".`,
      `11-20s: evidenzia il beneficio principale con tono ${tone}.`,
      "21-30s: chiudi con call to action chiara: prenota, scrivi, visita o salva il post."
    ]
  };
}
