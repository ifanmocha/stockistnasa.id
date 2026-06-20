import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, MessageCircle } from "lucide-react";
import { AddToCartButton } from "@/components/AddToCartButton";
import { ProductStickyCTA } from "@/components/ProductStickyCTA";
import { JsonLd, productSchema, faqSchema } from "@/components/JsonLd";
import { createMetadata } from "@/lib/seo";
import { siteConfig, categories } from "@/lib/site";
import { products, getProduct } from "@/data/products";
import {
  buildConsultMessage,
  buildQuickOrderMessage,
  buildWhatsAppUrl,
} from "@/lib/whatsapp";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return createMetadata({
    title: product.seo?.title || `${product.name} NASA Original`,
    description: product.seo?.description || product.shortDescription,
    path: `/produk/${slug}/`,
    keywords: product.seo?.keywords ?? [product.name.toLowerCase(), `${product.name.toLowerCase()} nasa`],
    robots: product.seo?.robots,
  });
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = categories.find((c) => c.slug === product.category);
  const waOrder = buildWhatsAppUrl(buildQuickOrderMessage(product.name));
  const waConsult = buildWhatsAppUrl(buildConsultMessage(product.name));

  return (
    <>
      <JsonLd data={productSchema(product)} />
      {product.faq.length > 0 && <JsonLd data={faqSchema(product.faq)} />}

      <div className="section-light px-4 pt-4">
        <div className="card mx-auto max-w-7xl px-4 py-3 md:px-6">
          <nav className="text-xs font-semibold text-ink-muted">
            <Link href="/" className="hover:text-[var(--navy)]">Beranda</Link>
            <span className="mx-2">/</span>
            <Link href="/produk/" className="hover:text-[var(--navy)]">Katalog</Link>
            <span className="mx-2">/</span>
            <span className="text-ink">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="section-light mx-auto max-w-7xl px-4 py-8 pb-32">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
          <div className="card relative aspect-square overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain p-10"
              priority
            />
          </div>

          <div className="flex flex-col">
            {category && (
              <span className="badge-navy w-fit rounded-full px-3 py-1 text-xs font-bold">
                {category.name}
              </span>
            )}
            <h1 className="mt-4 text-3xl font-bold text-ink md:text-4xl lg:text-5xl">
              {product.name}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-ink-muted">{product.description}</p>

            <ul className="mt-8 space-y-3">
              {product.benefits.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm text-ink">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--mint)]/30 text-[var(--navy)]">
                    <Check className="h-3 w-3" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href={waOrder} target="_blank" rel="noopener noreferrer" className="btn-primary">
                <MessageCircle className="h-4 w-4" />
                Pesan via WhatsApp
              </a>
              <AddToCartButton product={product} />
              <a
                href={waConsult}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Konsultasi dulu
              </a>
            </div>

            <p className="card mt-6 rounded-xl px-4 py-3 text-xs text-ink-muted">
              ✓ Stockist AB.{siteConfig.stockistCode} {siteConfig.city} · 100% original · Kirim{" "}
              {siteConfig.shipping}
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <div className="card p-6">
            <h2 className="text-lg font-bold text-ink">Cara pakai</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">{product.usage}</p>
          </div>

          {product.faq.length > 0 && (
            <div className="card p-6">
              <h2 className="text-lg font-bold text-ink">FAQ</h2>
              <div className="mt-4 space-y-4">
                {product.faq.map((item) => (
                  <div key={item.question}>
                    <h3 className="text-sm font-bold text-ink">{item.question}</h3>
                    <p className="mt-1 text-sm text-ink-muted">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <ProductStickyCTA slug={product.slug} name={product.name} />
    </>
  );
}
