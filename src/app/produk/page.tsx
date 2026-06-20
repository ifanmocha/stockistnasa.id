import type { Metadata } from "next";
import { ProductCard } from "@/components/ProductCard";
import { PageHeader } from "@/components/PageHeader";
import { createMetadata } from "@/lib/seo";
import { products } from "@/data/products";

export const metadata: Metadata = createMetadata({
  title: "Katalog Produk NASA",
  description:
    "Katalog lengkap produk NASA original dari Stockist AB.720 Yogyakarta. WA 081328975345.",
  path: "/produk/",
  keywords: ["katalog produk nasa", "produk nasa original"],
});

export default function ProdukPage() {
  return (
    <>
      <PageHeader
        eyebrow="Katalog"
        title="Semua Produk NASA"
        description="29+ produk original PT Natural Nusantara - pupuk, herbal, ternak, dan perawatan tubuh."
      />
      <div className="section-light mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}
