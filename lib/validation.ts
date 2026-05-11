import { z } from "zod";

export const generateSchema = z.object({
  businessType: z.string().trim().min(2, "Inserisci il tipo di attività.").max(80),
  goal: z.string().trim().min(4, "Inserisci un obiettivo.").max(140),
  tone: z.string().trim().min(2, "Inserisci un tono.").max(80),
  platform: z.string().trim().min(2, "Inserisci una piattaforma.").max(80)
});
