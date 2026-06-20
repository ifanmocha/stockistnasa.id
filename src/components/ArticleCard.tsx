import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Article } from "@/lib/types";

const categoryLabels: Record<string, string> = {
  pertanian: "Pertanian",
  peternakan: "Peternakan",
  herbal: "Herbal",
  bodycare: "Bodycare",
  homecare: "Home Care",
  teknologi: "Agroteknologi",
  kemitraan: "Kemitraan",
  umum: "Info",
};

export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="card card-hover group p-5">
      <div className="flex items-center justify-between gap-2">
        <span className="badge-navy rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">
          {categoryLabels[article.category] ?? article.category}
        </span>
        <time className="text-[10px] font-medium text-ink-muted">{article.publishedAt}</time>
      </div>
      <Link href={`/artikel/${article.slug}/`}>
        <h3 className="mt-3 text-lg font-bold leading-snug text-ink group-hover:text-[var(--navy)] line-clamp-2">
          {article.title}
        </h3>
      </Link>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted line-clamp-2">
        {article.excerpt}
      </p>
      <Link
        href={`/artikel/${article.slug}/`}
        className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-[var(--navy)]"
      >
        Baca selengkapnya <ArrowUpRight className="h-4 w-4" />
      </Link>
    </article>
  );
}
