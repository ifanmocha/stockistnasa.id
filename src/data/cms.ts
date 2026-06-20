import productsJson from "../../cms-export/products.json";
import articlesJson from "../../cms-export/articles.json";
import type { Product, Article } from "@/lib/types";

type ProductExport = Product & {
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
    robots?: string;
    sitemapPriority?: number;
    sitemapChangefreq?: string;
  };
  aiSummary?: string;
};

type ArticleExport = Article & {
  seo?: {
    title?: string;
    description?: string;
    focusKeyword?: string;
    robots?: string;
    sitemapPriority?: number;
    sitemapChangefreq?: string;
  };
  aiSummary?: string;
  aiKeyFacts?: string[];
};

export const products = productsJson as ProductExport[];
export const articles = articlesJson as ArticleExport[];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts() {
  return products.filter((p) => p.featured);
}

export function getProductsByCategory(category: string) {
  return products.filter((p) => p.category === category);
}

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}

export function getRecentArticles(limit = 4) {
  return [...articles]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, limit);
}

export function getArticlesByCategory(category: string) {
  return articles.filter((a) => a.category === category);
}

export { products as productsData, articles as articlesData };
