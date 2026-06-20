import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api, type Article } from "../api";

export default function ArticlesPage() {
  const [items, setItems] = useState<Article[]>([]);

  useEffect(() => {
    api.articles.list().then(setItems);
  }, []);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <div>
          <h1 style={{ margin: 0 }}>Artikel</h1>
          <p style={{ color: "var(--muted)", margin: "0.25rem 0 0" }}>{items.length} artikel</p>
        </div>
        <Link to="/articles/new" className="btn btn-primary">+ Tambah</Link>
      </div>
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <table className="table">
          <thead>
            <tr>
              <th>Judul</th>
              <th>Kategori</th>
              <th>Tanggal</th>
              <th>SEO</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((a) => (
              <tr key={a.id}>
                <td>
                  <strong style={{ display: "block", maxWidth: 320 }}>{a.title}</strong>
                  <span style={{ fontSize: "0.75rem", color: "var(--muted)" }}>{a.slug}</span>
                </td>
                <td>{a.category}</td>
                <td>{a.publishedAt}</td>
                <td>
                  {(a.seoDescription?.length ?? 0) < 120 ? (
                    <span className="badge badge-warning">pendek</span>
                  ) : (
                    <span className="badge badge-info">ok</span>
                  )}
                </td>
                <td>
                  <Link to={`/articles/${a.id}`} className="btn btn-ghost" style={{ padding: "0.375rem 0.75rem" }}>
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
