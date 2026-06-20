import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { PageHeader } from "@/components/PageHeader";
import { createMetadata } from "@/lib/seo";
import { categories } from "@/lib/site";
import { getProductsByCategory } from "@/data/products";

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: slug } = await params;
  const cat = categories.find((c) => c.slug === slug);
  if (!cat) return {};
  return createMetadata({
    title: `Produk NASA ${cat.name}`,
    description: `${cat.description}. Stockist AB.720 Yogyakarta.`,
    path: `/kategori/${slug}/`,
    keywords: [`produk nasa ${cat.name.toLowerCase()}`],
  });
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = await params;
  const cat = categories.find((c) => c.slug === slug);
  if (!cat) notFound();

  const items = getProductsByCategory(slug);

  return (
    <>
      <PageHeader
        eyebrow="Kategori"
        title={cat.name}
        description={cat.description}
      />
      <div className="section-light mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
        {items.length === 0 && (
          <p className="text-center text-ink-muted">Belum ada produk di kategori ini.</p>
        )}
      </div>
    </>
  );
}
