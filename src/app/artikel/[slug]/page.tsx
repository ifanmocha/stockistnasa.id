import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { JsonLd, articleSchema, faqSchema } from "@/components/JsonLd";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { articles, getArticle } from "@/data/articles";
import { getProduct } from "@/data/products";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return createMetadata({
    title: article.seo?.title || article.title,
    description: article.seo?.description || article.excerpt,
    path: `/artikel/${slug}/`,
    keywords: article.keywords,
    robots: article.seo?.robots,
  });
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const related = article.relatedProducts.map((s) => getProduct(s)).filter(Boolean);

  const waUrl = buildWhatsAppUrl(
    `Halo Stockist NASA AB.${siteConfig.stockistCode}, saya baca artikel "${article.title}" dan ingin konsultasi.`,
  );

  const paragraphs = article.content.split("\n\n");

  return (
    <>
      <JsonLd data={articleSchema(article)} />
      <JsonLd data={faqSchema(article.faq)} />

      <div className="section-dark section-hero-top relative pb-16">
        <div className="relative mx-auto max-w-3xl px-4 py-10">
          <nav className="text-xs font-medium text-white/60">
            <Link href="/" className="hover:text-white">Beranda</Link>
            <span className="mx-2">/</span>
            <Link href="/artikel/" className="hover:text-white">Panduan</Link>
          </nav>
          <time className="mt-6 block text-xs font-bold uppercase tracking-wider text-[var(--mint)]">
            {article.publishedAt}
          </time>
          <h1 className="mt-3 text-3xl font-bold leading-tight text-white md:text-4xl">
            {article.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-white/75">{article.excerpt}</p>
        </div>
      </div>

      <article className="section-white mx-auto max-w-3xl px-4 py-10 section-pad">
        <div className="prose max-w-none">
          {paragraphs.map((p, i) => {
            if (p.startsWith("## ")) {
              return (
                <h2 key={i} className="mt-10 mb-4 text-xl font-bold text-[var(--navy)]">
                  {p.replace("## ", "")}
                </h2>
              );
            }
            return <p key={i}>{p}</p>;
          })}
        </div>

        {related.length > 0 && (
          <div className="card mt-10 bg-surface-alt p-6">
            <h2 className="font-bold text-ink">Produk terkait</h2>
            <ul className="mt-3 space-y-2">
              {related.map(
                (p) =>
                  p && (
                    <li key={p.slug}>
                      <Link href={`/produk/${p.slug}/`} className="font-semibold text-[var(--navy)] hover:underline">
                        {p.name} →
                      </Link>
                    </li>
                  ),
              )}
            </ul>
          </div>
        )}

        <div className="card mt-10 p-6">
          <h2 className="font-bold text-ink">Pertanyaan umum</h2>
          <div className="mt-4 space-y-4">
            {article.faq.map((item) => (
              <div key={item.question}>
                <h3 className="text-sm font-bold text-ink">{item.question}</h3>
                <p className="mt-1 text-sm text-ink-muted">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 text-center">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex"
          >
            <MessageCircle className="h-5 w-5" />
            Tanya stockist via WhatsApp
          </a>
        </div>
      </article>
    </>
  );
}
