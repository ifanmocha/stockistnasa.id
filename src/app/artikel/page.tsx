import type { Metadata } from "next";
import { ArticleCard } from "@/components/ArticleCard";
import { PageHeader } from "@/components/PageHeader";
import { createMetadata } from "@/lib/seo";
import { articles } from "@/data/articles";

export const metadata: Metadata = createMetadata({
  title: "Panduan & Artikel Produk NASA",
  description: "55+ panduan produk NASA dari Stockist AB.720 Yogyakarta.",
  path: "/artikel/",
});

const categoryLabels: Record<string, string> = {
  pertanian: "Pertanian",
  peternakan: "Peternakan",
  herbal: "Herbal & Kesehatan",
  bodycare: "Bodycare",
  homecare: "Home Care",
  teknologi: "Agroteknologi",
  kemitraan: "Kemitraan",
  umum: "Info Umum",
};

export default function ArtikelPage() {
  const grouped = Object.keys(categoryLabels).map((key) => ({
    key,
    label: categoryLabels[key],
    items: articles.filter((a) => a.category === key),
  }));

  return (
    <>
      <PageHeader
        eyebrow="Pustaka"
        title="Tips & Panduan NASA"
        description={`${articles.length} artikel informatif - cara pakai, manfaat, dan tips praktis.`}
      />
      <div className="section-light mx-auto max-w-7xl px-4 py-12">
        {grouped.map(
          (group) =>
            group.items.length > 0 && (
              <section key={group.key} className="mb-14 last:mb-0">
                <h2 className="text-xl font-bold text-ink">{group.label}</h2>
                <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {group.items.map((article) => (
                    <ArticleCard key={article.slug} article={article} />
                  ))}
                </div>
              </section>
            ),
        )}
      </div>
    </>
  );
}
