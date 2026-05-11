import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <article className="rounded-2xl border border-line bg-white p-6 shadow-soft sm:p-8">
          <h1 className="text-3xl font-semibold text-ink">{title}</h1>
          <div className="mt-6 space-y-5 leading-8 text-ink/68">{children}</div>
        </article>
      </main>
      <Footer />
    </>
  );
}
