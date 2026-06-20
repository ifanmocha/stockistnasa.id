import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api, type Article } from "../api";

const empty: Article = {
  slug: "",
  title: "",
  excerpt: "",
  content: "",
  category: "pertanian",
  keywords: [],
  relatedProducts: [],
  faq: [],
  publishedAt: new Date().toISOString().slice(0, 10),
  seoTitle: "",
  seoDescription: "",
  focusKeyword: "",
  aiSummary: "",
  aiKeyFacts: [],
  robots: "index,follow",
};

export default function ArticleEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === "new";
  const [form, setForm] = useState<Article>(empty);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (!isNew && id) api.articles.get(Number(id)).then(setForm);
  }, [id, isNew]);

  const set = (key: keyof Article, value: unknown) => setForm((f) => ({ ...f, [key]: value }));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMsg("");
    try {
      const body = {
        ...form,
        keywords: typeof form.keywords === "string"
          ? (form.keywords as unknown as string).split(",").map((s) => s.trim()).filter(Boolean)
          : form.keywords,
        relatedProducts: typeof form.relatedProducts === "string"
          ? (form.relatedProducts as unknown as string).split(",").map((s) => s.trim()).filter(Boolean)
          : form.relatedProducts,
        aiKeyFacts: typeof form.aiKeyFacts === "string"
          ? (form.aiKeyFacts as unknown as string).split("\n").filter(Boolean)
          : form.aiKeyFacts,
      };
      if (isNew) {
        const res = await api.articles.create(body);
        navigate(`/articles/${(res as { id: number }).id}`);
      } else {
        await api.articles.update(Number(id), body);
      }
      setMsg("Tersimpan!");
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "Gagal menyimpan");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1 style={{ margin: "0 0 1.5rem" }}>{isNew ? "Artikel Baru" : "Edit Artikel"}</h1>
      <form onSubmit={submit} className="card" style={{ maxWidth: 800 }}>
        <div className="field">
          <label>Judul</label>
          <input value={form.title} onChange={(e) => set("title", e.target.value)} required />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div className="field">
            <label>Slug</label>
            <input value={form.slug} onChange={(e) => set("slug", e.target.value)} required />
          </div>
          <div className="field">
            <label>Tanggal</label>
            <input type="date" value={form.publishedAt} onChange={(e) => set("publishedAt", e.target.value)} />
          </div>
        </div>
        <div className="field">
          <label>Kategori</label>
          <select value={form.category} onChange={(e) => set("category", e.target.value)}>
            {["pertanian", "peternakan", "herbal", "bodycare", "homecare", "teknologi", "kemitraan", "umum"].map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label>Excerpt / Ringkasan</label>
          <textarea value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} rows={2} />
        </div>
        <div className="field">
          <label>Konten (Markdown)</label>
          <textarea value={form.content} onChange={(e) => set("content", e.target.value)} rows={12} />
        </div>
        <div className="field">
          <label>Keywords (pisah koma)</label>
          <input
            value={Array.isArray(form.keywords) ? form.keywords.join(", ") : ""}
            onChange={(e) => set("keywords", e.target.value.split(",").map((s) => s.trim()))}
          />
        </div>

        <hr style={{ border: "none", borderTop: "1px solid var(--border)", margin: "1.5rem 0" }} />
        <h3 style={{ margin: "0 0 1rem" }}>SEO Google</h3>
        <div className="field">
          <label>Meta Title ({form.seoTitle.length}/60)</label>
          <input value={form.seoTitle} onChange={(e) => set("seoTitle", e.target.value)} />
        </div>
        <div className="field">
          <label>Meta Description ({form.seoDescription.length}/160)</label>
          <textarea value={form.seoDescription} onChange={(e) => set("seoDescription", e.target.value)} rows={2} />
        </div>
        <div className="field">
          <label>Focus Keyword</label>
          <input value={form.focusKeyword} onChange={(e) => set("focusKeyword", e.target.value)} />
        </div>

        <h3 style={{ margin: "1.5rem 0 1rem" }}>SEO AI</h3>
        <div className="field">
          <label>Ringkasan AI (2-3 kalimat faktual)</label>
          <textarea value={form.aiSummary} onChange={(e) => set("aiSummary", e.target.value)} rows={3} />
        </div>
        <div className="field">
          <label>Fakta Kunci AI (satu per baris)</label>
          <textarea
            value={Array.isArray(form.aiKeyFacts) ? form.aiKeyFacts.join("\n") : ""}
            onChange={(e) => set("aiKeyFacts", e.target.value.split("\n").filter(Boolean))}
            rows={4}
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? "Menyimpan..." : "Simpan"}
        </button>
        {msg && <span style={{ marginLeft: "0.75rem", color: "var(--brand)" }}>{msg}</span>}
      </form>
    </div>
  );
}
