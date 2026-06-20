import { siteConfig } from "@/lib/site";
import type { Product, Article } from "@/lib/types";

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Store",
    name: `Stockist NASA AB.720 ${siteConfig.city}`,
    description: siteConfig.description,
    url: siteConfig.domain,
    telephone: `+${siteConfig.phoneIntl}`,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.city,
      addressRegion: siteConfig.region,
      addressCountry: "ID",
    },
    areaServed: "Indonesia",
    priceRange: "$$",
  };
}

export function productSchema(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: `${siteConfig.domain}${product.image}`,
    brand: { "@type": "Brand", name: "PT Natural Nusantara" },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: `Stockist NASA AB.${siteConfig.stockistCode}`,
      },
    },
  };
}

export function articleSchema(article: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    author: {
      "@type": "Organization",
      name: `Stockist NASA AB.${siteConfig.stockistCode}`,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.domain,
    },
  };
}

export function faqSchema(faq: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
