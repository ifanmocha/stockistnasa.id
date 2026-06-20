import { useState } from "react";
import { api } from "../api";

export default function PublishPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const publish = async () => {
    setLoading(true);
    setResult("");
    try {
      const res = await api.publish();
      setResult(res.message);
    } catch (err) {
      setResult(err instanceof Error ? err.message : "Gagal export");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 style={{ margin: "0 0 0.5rem" }}>Publish</h1>
      <p style={{ color: "var(--muted)", marginBottom: "1.5rem" }}>
        Export konten dari database ke JSON, lalu rebuild & deploy situs publik.
      </p>

      <div className="card" style={{ maxWidth: 640 }}>
        <h2 style={{ margin: "0 0 1rem", fontSize: "1.125rem" }}>Langkah publish</h2>
        <ol style={{ color: "var(--muted)", fontSize: "0.875rem", lineHeight: 1.7, paddingLeft: "1.25rem" }}>
          <li>Klik <strong>Export Database</strong> - simpan perubahan ke file JSON</li>
          <li>Dari komputer lokal, jalankan: <code>npm run publish</code></li>
          <li>Script akan build situs + deploy ke stockistnasa.id</li>
        </ol>

        <button
          type="button"
          className="btn btn-accent"
          onClick={publish}
          disabled={loading}
          style={{ marginTop: "1rem" }}
        >
          {loading ? "Mengekspor..." : "Export Database"}
        </button>

        {result && (
          <p style={{ marginTop: "1rem", fontSize: "0.875rem", color: "var(--brand)" }}>{result}</p>
        )}
      </div>

      <div className="card" style={{ maxWidth: 640, marginTop: "1rem" }}>
        <h3 style={{ margin: "0 0 0.5rem" }}>Deploy dari terminal</h3>
        <pre style={{ background: "var(--bg)", padding: "1rem", borderRadius: "0.75rem", overflow: "auto", fontSize: "0.8rem" }}>
{`cd ~/Projects/stockistnasa-id
npm run publish`}
        </pre>
      </div>
    </div>
  );
}
