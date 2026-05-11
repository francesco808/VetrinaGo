"use client";

import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

export function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="focus-ring inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-accent px-5 font-semibold text-white transition hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? <Loader2 size={18} className="animate-spin" /> : null}
      {children}
    </button>
  );
}
