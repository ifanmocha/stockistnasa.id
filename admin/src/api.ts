const API = "/api";

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((data as { error?: string }).error || "Request failed");
  return data as T;
}

export const api = {
  login: (username: string, password: string) =>
    request<{ ok: boolean }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    }),
  logout: () => request("/auth/logout", { method: "POST" }),
  me: () => request<{ user: { username: string } }>("/auth/me"),
  dashboard: () =>
    request<{ products: number; articles: number; testimonials: number; lastPublish: string | null }>(
      "/dashboard",
    ),
  products: {
    list: () => request<Product[]>("/products"),
    get: (id: number) => request<Product>(`/products/${id}`),
    create: (body: Partial<Product>) =>
      request("/products", { method: "POST", body: JSON.stringify(body) }),
    update: (id: number, body: Partial<Product>) =>
      request(`/products/${id}`, { method: "PUT", body: JSON.stringify(body) }),
    delete: (id: number) => request(`/products/${id}`, { method: "DELETE" }),
  },
  articles: {
    list: () => request<Article[]>("/articles"),
    get: (id: number) => request<Article>(`/articles/${id}`),
    create: (body: Partial<Article>) =>
      request("/articles", { method: "POST", body: JSON.stringify(body) }),
    update: (id: number, body: Partial<Article>) =>
      request(`/articles/${id}`, { method: "PUT", body: JSON.stringify(body) }),
    delete: (id: number) => request(`/articles/${id}`, { method: "DELETE" }),
  },
  seo: {
    getGlobal: () => request<SeoGlobal>("/seo/global"),
    updateGlobal: (body: SeoGlobal) =>
      request("/seo/global", { method: "PUT", body: JSON.stringify(body) }),
    getAi: () => request<SeoAi>("/seo/ai"),
    updateAi: (body: SeoAi) => request("/seo/ai", { method: "PUT", body: JSON.stringify(body) }),
    audit: () => request<SeoAudit>("/seo/audit"),
  },
  publish: () =>
    request<{ ok: boolean; message: string }>("/publish", { method: "POST" }),
};

export interface Product {
  id?: number;
  slug: string;
  name: string;
  category: string;
  shortDescription: string;
  description: string;
  benefits: string[];
  usage: string;
  faq: { question: string; answer: string }[];
  image: string;
  featured: boolean;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  aiSummary: string;
  robots: string;
}

export interface Article {
  id?: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  keywords: string[];
  relatedProducts: string[];
  faq: { question: string; answer: string }[];
  publishedAt: string;
  seoTitle: string;
  seoDescription: string;
  focusKeyword: string;
  aiSummary: string;
  aiKeyFacts: string[];
  robots: string;
}

export interface SeoGlobal {
  metaTitle: string;
  metaDescription: string;
  ogImage: string;
  robots: string;
  googleVerification: string;
  jsonLdExtra: string;
}

export interface SeoAi {
  llmsTxt: string;
  aiSiteSummary: string;
  aiBrandFacts: string;
}

export interface SeoAudit {
  total: number;
  errors: number;
  warnings: number;
  issues: { type: string; entity: string; slug: string; message: string }[];
}
