import { FormEvent, useEffect, useState } from "react";
import { api, type SeoAi } from "../api";

export default function SeoAiPage() {
  const [form, setForm] = useState<SeoAi>({
    llmsTxt: "",
    aiSiteSummary: "",
    aiBrandFacts: "",
  });
  const [msg, setMsg] = useState("");

  useEffect(() => {
    api.seo.getAi().then(setForm);
  }, []);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    await api.seo.updateAi(form);
    setMsg("SEO AI tersimpan!");
  };

  return (
    <div>
      <h1 style={{ margin: "0 0 0.5rem" }}>SEO AI</h1>
      <p style={{ color: "var(--muted)", marginBottom: "1.5rem" }}>
        Optimasi untuk ChatGPT, Perplexity, Gemini, dan AI search crawler via llms.txt dan ringkasan faktual.
      </p>
      <form onSubmit={submit} className="card" style={{ maxWidth: 800 }}>
        <div className="field">
          <label>llms.txt - file panduan untuk AI crawler</label>
          <textarea
            value={form.llmsTxt}
            onChange={(e) => setForm({ ...form, llmsTxt: e.target.value })}
            rows={16}
            style={{ fontFamily: "monospace", fontSize: "0.8rem" }}
          />
          <p style={{ fontSize: "0.75rem", color: "var(--muted)", marginTop: "0.375rem" }}>
            Akan di-deploy ke https://stockistnasa.id/llms.txt saat publish
          </p>
        </div>
        <div className="field">
          <label>Ringkasan Situs untuk AI (1 paragraf faktual)</label>
          <textarea
            value={form.aiSiteSummary}
            onChange={(e) => setForm({ ...form, aiSiteSummary: e.target.value })}
            rows={4}
          />
        </div>
        <div className="field">
          <label>Fakta Brand (JSON atau teks terstruktur)</label>
          <textarea
            value={form.aiBrandFacts}
            onChange={(e) => setForm({ ...form, aiBrandFacts: e.target.value })}
            rows={8}
            style={{ fontFamily: "monospace", fontSize: "0.8rem" }}
          />
        </div>
        <button type="submit" className="btn btn-primary">Simpan SEO AI</button>
        {msg && <span style={{ marginLeft: "0.75rem", color: "var(--brand)" }}>{msg}</span>}
      </form>
    </div>
  );
}
