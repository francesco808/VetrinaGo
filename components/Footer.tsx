import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-line bg-white/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-ink/60 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>© {new Date().getFullYear()} VetrinaGo</p>
        <div className="flex flex-wrap gap-4">
          <Link href="/creazione-siti-web" className="hover:text-ink">
            Siti Web
          </Link>
          <Link href="/legal/privacy" className="hover:text-ink">
            Privacy
          </Link>
          <Link href="/legal/terms" className="hover:text-ink">
            Termini
          </Link>
          <Link href="/legal/cookies" className="hover:text-ink">
            Cookie
          </Link>
        </div>
        <p className="text-xs text-ink/45">PEC per comunicazioni formali: francescoiannone@namirialpec.it</p>
      </div>
    </footer>
  );
}
