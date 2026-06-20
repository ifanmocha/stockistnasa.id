import type { Metadata } from "next";
import { siteConfig, seoConfig } from "./site";

export function createMetadata({
  title,
  description,
  path = "",
  keywords = [],
  robots,
  ogImage,
}: {
  title?: string;
  description?: string;
  path?: string;
  keywords?: string[];
  robots?: string;
  ogImage?: string;
}): Metadata {
  const fullTitle = title
    ? `${title} | ${siteConfig.name} AB.${siteConfig.stockistCode}`
    : seoConfig.global.metaTitle || siteConfig.title;
  const desc = description ?? seoConfig.global.metaDescription ?? siteConfig.description;
  const url = `${siteConfig.domain}${path}`;
  const indexable = !(robots ?? seoConfig.global.robots)?.includes("noindex");

  return {
    title: fullTitle,
    description: desc,
    keywords: [
      "stockist nasa",
      "stockist nasa yogyakarta",
      "distributor nasa",
      "produk nasa original",
      "AB.720",
      ...keywords,
    ],
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description: desc,
      url,
      siteName: siteConfig.name,
      locale: "id_ID",
      type: "website",
      images: ogImage || seoConfig.global.ogImage ? [{ url: ogImage || seoConfig.global.ogImage }] : undefined,
    },
    robots: { index: indexable, follow: indexable },
    ...(seoConfig.global.googleVerification
      ? { verification: { google: seoConfig.global.googleVerification } }
      : {}),
  };
}
