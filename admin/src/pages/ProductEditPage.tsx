import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api, type Product } from "../api";

const empty: Product = {
  slug: "",
  name: "",
  category: "pertanian",
  shortDescription: "",
  description: "",
  benefits: [],
  usage: "",
  faq: [],
  image: "",
  featured: false,
  seoTitle: "",
  seoDescription: "",
  seoKeywords: [],
  aiSummary: "",
  robots: "index,follow",
};

export default function ProductEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === "new";
  const [form, setForm] = useState<Product>(empty);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (!isNew && id) {
      api.products.get(Number(id)).then(setForm);
    }
  }, [id, isNew]);

  const set = (key: keyof Product, value: unknown) => setForm((f) => ({ ...f, [key]: value }));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMsg("");
    try {
      const body = {
        ...form,
        benefits: typeof form.benefits === "string" ? (form.benefits as string).split("\n").filter(Boolean) : form.benefits,
        seoKeywords: typeof form.seoKeywords === "string"
          ? (form.seoKeywords as unknown as string).split(",").map((s) => s.trim()).filter(Boolean)
          : form.seoKeywords,
      };
      if (isNew) {
        const res = await api.products.create(body);
        navigate(`/products/${(res as { id: number }).id}`);
      } else {
        await api.products.update(Number(id), body);
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
      <h1 style={{ margin: "0 0 1.5rem" }}>{isNew ? "Produk Baru" : `Edit: ${form.name}`}</h1>
      <form onSubmit={submit} className="card" style={{ maxWidth: 720 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div className="field">
            <label>Nama</label>
            <input value={form.name} onChange={(e) => set("name", e.target.value)} required />
          </div>
          <div className="field">
            <label>Slug</label>
            <input value={form.slug} onChange={(e) => set("slug", e.target.value)} required />
          </div>
        </div>
        <div className="field">
          <label>Kategori</label>
          <select value={form.category} onChange={(e) => set("category", e.target.value)}>
            {["pertanian", "peternakan", "herbal", "bodycare", "homecare", "teknologi"].map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label>Deskripsi Singkat</label>
          <input value={form.shortDescription} onChange={(e) => set("shortDescription", e.target.value)} />
        </div>
        <div className="field">
          <label>Deskripsi Lengkap</label>
          <textarea value={form.description} onChange={(e) => set("description", e.target.value)} rows={4} />
        </div>
        <div className="field">
          <label>Manfaat (satu per baris)</label>
          <textarea
            value={Array.isArray(form.benefits) ? form.benefits.join("\n") : ""}
            onChange={(e) => set("benefits", e.target.value.split("\n").filter(Boolean))}
          />
        </div>
        <div className="field">
          <label>Cara Pakai</label>
          <textarea value={form.usage} onChange={(e) => set("usage", e.target.value)} rows={2} />
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
          <label>Keywords (pisah koma)</label>
          <input
            value={Array.isArray(form.seoKeywords) ? form.seoKeywords.join(", ") : ""}
            onChange={(e) => set("seoKeywords", e.target.value.split(",").map((s) => s.trim()))}
          />
        </div>

        <h3 style={{ margin: "1.5rem 0 1rem" }}>SEO AI (ChatGPT, Perplexity, dll)</h3>
        <div className="field">
          <label>Ringkasan AI - fakta singkat untuk AI crawler</label>
          <textarea value={form.aiSummary} onChange={(e) => set("aiSummary", e.target.value)} rows={3} />
        </div>

        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? "Menyimpan..." : "Simpan"}
          </button>
          {msg && <span style={{ fontSize: "0.875rem", color: "var(--brand)" }}>{msg}</span>}
        </div>
      </form>
    </div>
  );
}
