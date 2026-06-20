import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { products } from "@/data/products";
import { articles } from "@/data/articles";
import { categories } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.domain;

  const staticPages = [
    "",
    "/produk/",
    "/artikel/",
    "/mitra/",
    "/kontak/",
    "/keranjang/",
    "/stockist-nasa-yogyakarta/",
  ];

  return [
    ...staticPages.map((path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...products.map((p) => ({
      url: `${base}/produk/${p.slug}/`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...categories.map((c) => ({
      url: `${base}/kategori/${c.slug}/`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...articles.map((a) => ({
      url: `${base}/artikel/${a.slug}/`,
      lastModified: new Date(a.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
