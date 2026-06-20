import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api, type SeoAudit } from "../api";

export default function DashboardPage() {
  const [stats, setStats] = useState({ products: 0, articles: 0, testimonials: 0, lastPublish: null as string | null });
  const [audit, setAudit] = useState<SeoAudit | null>(null);

  useEffect(() => {
    api.dashboard().then(setStats);
    api.seo.audit().then(setAudit).catch(() => {});
  }, []);

  return (
    <div>
      <h1 style={{ margin: "0 0 0.5rem" }}>Dashboard</h1>
      <p style={{ color: "var(--muted)", marginBottom: "1.5rem" }}>
        Ringkasan konten dan kesehatan SEO situs.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
        {[
          ["Produk", stats.products],
          ["Artikel", stats.articles],
          ["Testimoni", stats.testimonials],
        ].map(([label, val]) => (
          <div key={label as string} className="card">
            <p style={{ margin: 0, fontSize: "0.75rem", color: "var(--muted)" }}>{label}</p>
            <p style={{ margin: "0.25rem 0 0", fontSize: "2rem", fontWeight: 800 }}>{val}</p>
          </div>
        ))}
      </div>

      {audit && (
        <div className="card" style={{ marginBottom: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h2 style={{ margin: 0, fontSize: "1.125rem" }}>Audit SEO</h2>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <span className="badge badge-error">{audit.errors} error</span>
              <span className="badge badge-warning">{audit.warnings} warning</span>
              <span className="badge badge-info">{audit.total} total</span>
            </div>
          </div>
          <ul style={{ margin: 0, paddingLeft: "1.25rem", color: "var(--muted)", fontSize: "0.875rem" }}>
            {audit.issues.slice(0, 8).map((issue, i) => (
              <li key={i} style={{ marginBottom: "0.375rem" }}>
                <span className={`badge badge-${issue.type === "error" ? "error" : issue.type === "warning" ? "warning" : "info"}`}>
                  {issue.entity}
                </span>{" "}
                {issue.slug}: {issue.message}
              </li>
            ))}
          </ul>
          {audit.issues.length > 8 && (
            <p style={{ fontSize: "0.75rem", color: "var(--muted)", marginTop: "0.75rem" }}>
              +{audit.issues.length - 8} isu lainnya - perbaiki di halaman Produk/Artikel/SEO
            </p>
          )}
        </div>
      )}

      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
        <Link to="/products" className="btn btn-primary">Kelola Produk</Link>
        <Link to="/articles" className="btn btn-ghost">Kelola Artikel</Link>
        <Link to="/publish" className="btn btn-accent">Publish Situs</Link>
      </div>

      {stats.lastPublish && (
        <p style={{ marginTop: "1.5rem", fontSize: "0.75rem", color: "var(--muted)" }}>
          Terakhir publish: {stats.lastPublish}
        </p>
      )}
    </div>
  );
}
