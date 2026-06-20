import type { ArticleCategory, CategorySlug } from "./site";

export interface Product {
  slug: string;
  name: string;
  category: CategorySlug;
  shortDescription: string;
  description: string;
  benefits: string[];
  usage: string;
  faq: { question: string; answer: string }[];
  featured?: boolean;
  image: string;
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: ArticleCategory;
  keywords: string[];
  relatedProducts: string[];
  faq: { question: string; answer: string }[];
  publishedAt: string;
}

export interface CartItem {
  slug: string;
  name: string;
  quantity: number;
}
