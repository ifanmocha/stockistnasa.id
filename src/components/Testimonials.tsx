import { Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  return (
    <section className="section-mint section-pad mx-auto max-w-7xl px-4">
      <div className="text-center">
        <p className="eyebrow-dark">Testimoni pelanggan</p>
        <h2 className="section-heading mt-2">Dipercaya di Yogyakarta & se-Indonesia</h2>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {testimonials.map((t) => (
          <blockquote key={t.name} className="card p-6">
            <Quote className="h-8 w-8 text-[var(--mint)]" />
            <p className="mt-4 text-sm leading-relaxed text-ink-muted">&ldquo;{t.quote}&rdquo;</p>
            <footer className="mt-4 border-t border-border pt-4">
              <p className="font-bold text-ink">{t.name}</p>
              <p className="text-xs text-ink-muted">{t.role}</p>
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
