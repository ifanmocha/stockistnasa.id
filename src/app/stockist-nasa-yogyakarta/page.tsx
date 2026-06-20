import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Phone, Truck } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { PageHeader } from "@/components/PageHeader";
import { JsonLd, localBusinessSchema } from "@/components/JsonLd";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { getFeaturedProducts } from "@/data/products";

export const metadata: Metadata = createMetadata({
  title: "Stockist NASA Yogyakarta AB.720",
  description: "Stockist NASA resmi di Yogyakarta. Produk original, pengiriman nasional.",
  path: "/stockist-nasa-yogyakarta/",
  keywords: ["stockist nasa yogyakarta", "distributor nasa jogja"],
});

export default function StockistYogyakartaPage() {
  const products = getFeaturedProducts().slice(0, 4);

  return (
    <>
      <JsonLd data={localBusinessSchema()} />
      <PageHeader
        eyebrow="Lokasi"
        title={`Stockist NASA ${siteConfig.city}`}
        description={`Kode AB.${siteConfig.stockistCode} - distributor resmi PT Natural Nusantara. Melayani Jogja dan seluruh Indonesia.`}
      />

      <div className="section-light mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { icon: MapPin, title: "Alamat", text: siteConfig.address },
            { icon: Phone, title: "WhatsApp", text: siteConfig.phone, href: siteConfig.whatsappUrl },
            { icon: Truck, title: "Pengiriman", text: siteConfig.shipping },
          ].map((item) => (
            <div key={item.title} className="card p-6">
              <item.icon className="h-5 w-5 text-[var(--navy)]" />
              <h2 className="mt-3 font-bold text-ink">{item.title}</h2>
              {item.href ? (
                <a href={item.href} className="mt-1 block text-sm font-semibold text-wa">
                  {item.text}
                </a>
              ) : (
                <p className="mt-1 text-sm text-ink-muted">{item.text}</p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-14">
          <h2 className="text-2xl font-bold text-ink">Produk populer</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-wrap gap-4">
          <Link href="/produk/" className="text-sm font-bold text-[var(--navy)] hover:underline">Katalog lengkap →</Link>
          <Link href="/mitra/" className="text-sm font-bold text-[var(--navy)] hover:underline">Daftar mitra →</Link>
          <Link href="/artikel/" className="text-sm font-bold text-[var(--navy)] hover:underline">Panduan produk →</Link>
        </div>
      </div>
    </>
  );
}
