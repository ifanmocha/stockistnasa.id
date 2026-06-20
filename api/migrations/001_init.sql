CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS seo_global (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  meta_title TEXT,
  meta_description TEXT,
  og_image TEXT,
  robots TEXT DEFAULT 'index,follow',
  google_verification TEXT,
  json_ld_extra TEXT
);

CREATE TABLE IF NOT EXISTS seo_ai (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  llms_txt TEXT,
  ai_site_summary TEXT,
  ai_brand_facts TEXT
);

CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  short_description TEXT,
  description TEXT,
  benefits TEXT DEFAULT '[]',
  usage TEXT,
  faq TEXT DEFAULT '[]',
  image TEXT,
  featured INTEGER NOT NULL DEFAULT 0,
  seo_title TEXT,
  seo_description TEXT,
  seo_keywords TEXT DEFAULT '[]',
  ai_summary TEXT,
  robots TEXT DEFAULT 'index,follow',
  sitemap_priority REAL DEFAULT 0.8,
  sitemap_changefreq TEXT DEFAULT 'weekly',
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS articles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  category TEXT,
  keywords TEXT DEFAULT '[]',
  related_products TEXT DEFAULT '[]',
  faq TEXT DEFAULT '[]',
  published_at TEXT,
  seo_title TEXT,
  seo_description TEXT,
  focus_keyword TEXT,
  ai_summary TEXT,
  ai_key_facts TEXT DEFAULT '[]',
  robots TEXT DEFAULT 'index,follow',
  sitemap_priority REAL DEFAULT 0.7,
  sitemap_changefreq TEXT DEFAULT 'monthly',
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS testimonials (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  role TEXT,
  quote TEXT NOT NULL,
  product TEXT DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS publish_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  published_at TEXT NOT NULL DEFAULT (datetime('now')),
  note TEXT
);

CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
