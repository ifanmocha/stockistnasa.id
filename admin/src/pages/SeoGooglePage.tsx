import { FormEvent, useEffect, useState } from "react";
import { api, type SeoGlobal } from "../api";

export default function SeoGooglePage() {
  const [form, setForm] = useState<SeoGlobal>({
    metaTitle: "",
    metaDescription: "",
    ogImage: "",
    robots: "index,follow",
    googleVerification: "",
    jsonLdExtra: "",
  });
  const [msg, setMsg] = useState("");

  useEffect(() => {
    api.seo.getGlobal().then(setForm);
  }, []);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    await api.seo.updateGlobal(form);
    setMsg("SEO global tersimpan!");
  };

  return (
    <div>
      <h1 style={{ margin: "0 0 0.5rem" }}>SEO Google</h1>
      <p style={{ color: "var(--muted)", marginBottom: "1.5rem" }}>
        Pengaturan meta tag global, Open Graph, dan verifikasi Google Search Console.
      </p>
      <form onSubmit={submit} className="card" style={{ maxWidth: 720 }}>
        <div className="field">
          <label>Meta Title Default ({form.metaTitle.length}/60)</label>
          <input value={form.metaTitle} onChange={(e) => setForm({ ...form, metaTitle: e.target.value })} />
        </div>
        <div className="field">
          <label>Meta Description Default ({form.metaDescription.length}/160)</label>
          <textarea
            value={form.metaDescription}
            onChange={(e) => setForm({ ...form, metaDescription: e.target.value })}
            rows={3}
          />
        </div>
        <div className="field">
          <label>OG Image URL</label>
          <input value={form.ogImage} onChange={(e) => setForm({ ...form, ogImage: e.target.value })} />
        </div>
        <div className="field">
          <label>Robots</label>
          <select value={form.robots} onChange={(e) => setForm({ ...form, robots: e.target.value })}>
            <option value="index,follow">index, follow</option>
            <option value="noindex,nofollow">noindex, nofollow</option>
          </select>
        </div>
        <div className="field">
          <label>Google Search Console Verification Code</label>
          <input
            value={form.googleVerification}
            onChange={(e) => setForm({ ...form, googleVerification: e.target.value })}
            placeholder="content dari meta google-site-verification"
          />
        </div>
        <div className="field">
          <label>JSON-LD Tambahan (opsional)</label>
          <textarea
            value={form.jsonLdExtra}
            onChange={(e) => setForm({ ...form, jsonLdExtra: e.target.value })}
            rows={6}
            placeholder='{"@type": "Organization", ...}'
          />
        </div>
        <button type="submit" className="btn btn-primary">Simpan SEO Google</button>
        {msg && <span style={{ marginLeft: "0.75rem", color: "var(--brand)" }}>{msg}</span>}
      </form>
    </div>
  );
}
