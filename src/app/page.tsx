import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Sparkles,
  Truck,
  BadgeCheck,
  Headphones,
  Check,
  MessageCircle,
} from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { ArticleCard } from "@/components/ArticleCard";
import { SectionHeading } from "@/components/PageHeader";
import { Testimonials } from "@/components/Testimonials";
import { HowToOrder } from "@/components/HowToOrder";
import { categories, siteConfig } from "@/lib/site";
import { getFeaturedProducts } from "@/data/products";
import { getRecentArticles } from "@/data/articles";
import { buildQuickOrderMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

const categoryEmoji: Record<string, string> = {
  pertanian: "🌱",
  peternakan: "🐄",
  herbal: "💊",
  bodycare: "✨",
  homecare: "🏠",
  teknologi: "🔬",
};

export default function HomePage() {
  const featured = getFeaturedProducts();
  const articles = getRecentArticles(4);
  const heroProduct = featured[0];
  const bentoProducts = featured.slice(1, 5);
  const heroWaUrl = heroProduct
    ? buildWhatsAppUrl(buildQuickOrderMessage(heroProduct.name))
    : siteConfig.whatsappUrl;

  return (
    <>
      <section className="section-dark section-hero-top relative overflow-hidden pb-20">
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 md:grid-cols-2 md:items-center lg:gap-16">
          <div className="order-2 md:order-1">
            <div className="badge badge-outline">
              <BadgeCheck className="h-3.5 w-3.5 text-[var(--mint)]" />
              Stockist resmi AB.{siteConfig.stockistCode} · {siteConfig.city}
            </div>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.1] text-white md:text-5xl lg:text-[3rem]">
              Produk NASA
              <span className="text-[var(--mint)]"> original</span>
              <br />
              untuk keluarga & usaha Anda
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-white/75 md:text-lg">
              Pupuk organik, herbal, peternakan, bodycare - langsung dari stockist
              terpercaya. Konsultasi gratis, pengiriman ke seluruh Indonesia.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-white/80">
              {["100% asli NASA", "Pengiriman seluruh Indonesia", "Konsultasi gratis via WA"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0 text-[var(--mint)]" />
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/produk/" className="btn-primary">
                Lihat Katalog
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                <Headphones className="h-4 w-4" />
                Konsultasi Gratis
              </a>
            </div>
          </div>

          <div className="relative order-1 md:order-2">
            <div className="card overflow-hidden p-6">
              {heroProduct && (
                <>
                  <div className="relative mx-auto aspect-square max-h-[280px] w-full overflow-hidden rounded-2xl bg-surface-alt">
                    <Image
                      src={heroProduct.image}
                      alt={heroProduct.name}
                      fill
                      className="object-contain p-8"
                      priority
                      sizes="300px"
                    />
                  </div>
                  <div className="mt-5">
                    <span className="badge badge-mint">Best seller</span>
                    <p className="mt-3 text-2xl font-bold text-[var(--navy)]">
                      {heroProduct.name}
                    </p>
                    <p className="mt-1 text-sm text-ink-muted">{heroProduct.shortDescription}</p>
                    <a
                      href={heroWaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary btn-sm mt-4 inline-flex"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Pesan sekarang
                    </a>
                  </div>
                </>
              )}
            </div>
            <div className="card absolute -bottom-4 -left-2 px-5 py-3 md:-left-4">
              <p className="text-3xl font-bold text-[var(--navy)]">{siteConfig.stats.years}</p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-ink-muted">Tahun melayani</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="section-mint section-pad px-4">
        <div className="card mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-6 py-4 text-sm">
          {[
            { icon: Truck, text: `Kirim ${siteConfig.shipping}` },
            { icon: Sparkles, text: `${siteConfig.stats.productsSold} produk terjual` },
            { icon: BadgeCheck, text: "Garansi keaslian" },
            { icon: Headphones, text: "Respon WA cepat" },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2 font-semibold text-ink-muted">
              <item.icon className="h-4 w-4 text-[var(--navy)]" />
              {item.text}
            </div>
          ))}
        </div>
      </section>

      <HowToOrder />

      {/* Categories */}
      <section className="section-light section-pad mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow="Katalog"
          title="Kategori produk"
          subtitle="Temukan solusi NASA sesuai kebutuhan Anda"
        />
        <div className="scroll-snap-x mt-8 flex gap-3 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/kategori/${cat.slug}/`}
              className="card card-hover flex min-w-[130px] shrink-0 flex-col items-center px-5 py-5 text-center"
            >
              <span className="text-3xl">{categoryEmoji[cat.slug] ?? "📦"}</span>
              <span className="mt-3 text-sm font-bold text-ink">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="section-white section-pad px-4">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Populer"
            title="Favorit pelanggan"
            subtitle="Produk yang paling sering dipesan - langsung klik Pesan"
            action={
              <Link href="/produk/" className="text-sm font-bold text-[var(--navy)] hover:underline">
                Semua produk →
              </Link>
            }
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
            {featured[0] && <ProductCard product={featured[0]} variant="featured" />}
            {bentoProducts.map((p) => (
              <ProductCard key={p.slug} product={p} variant="grid" />
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      {/* Mitra */}
      <section className="section-light section-pad mx-auto max-w-7xl px-4">
        <div className="panel-dark overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-12">
              <p className="eyebrow">Peluang bisnis</p>
              <h2 className="mt-3 text-3xl font-bold leading-tight text-white md:text-4xl">
                Mitra NASA hanya Rp {siteConfig.memberFee.toLocaleString("id-ID")}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/70">
                Harga distributor seumur hidup. Tanpa target, tanpa biaya bulanan.
              </p>
              <Link href="/mitra/" className="btn-primary mt-8">
                Daftar mitra <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="flex items-center justify-center border-t border-white/10 bg-white/5 p-8 md:border-l md:border-t-0">
              <ul className="space-y-4 text-sm text-white/85">
                {[
                  "Harga 30-40% di bawah eceran",
                  "ID mitra resmi PT NASA",
                  "Pendampingan stockist Jogja",
                  "Kelola via aplikasi NASA",
                ].map((t) => (
                  <li key={t} className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--mint)]/20 text-xs font-bold text-[var(--mint)]">
                      ✓
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="section-white section-pad mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow="Pustaka"
          title="Panduan & tips"
          subtitle="Artikel bermanfaat seputar produk NASA"
          action={
            <Link href="/artikel/" className="text-sm font-bold text-[var(--navy)] hover:underline">
              Arsip lengkap →
            </Link>
          }
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-dark section-pad text-center">
        <div className="relative mx-auto max-w-2xl px-4">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Siap pesan produk NASA?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-white/70">
            Chat tim stockist AB.{siteConfig.stockistCode} - gratis konsultasi, respon cepat.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <MessageCircle className="h-4 w-4" />
              WhatsApp {siteConfig.phone}
            </a>
            <Link href="/produk/" className="btn-outline">
              Jelajahi katalog
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
