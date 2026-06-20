import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api, type Product } from "../api";

export default function ProductsPage() {
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    api.products.list().then(setItems);
  }, []);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <div>
          <h1 style={{ margin: 0 }}>Produk</h1>
          <p style={{ color: "var(--muted)", margin: "0.25rem 0 0" }}>{items.length} produk</p>
        </div>
        <Link to="/products/new" className="btn btn-primary">+ Tambah</Link>
      </div>
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <table className="table">
          <thead>
            <tr>
              <th>Nama</th>
              <th>Kategori</th>
              <th>SEO</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((p) => (
              <tr key={p.id}>
                <td>
                  <strong>{p.name}</strong>
                  <br />
                  <span style={{ fontSize: "0.75rem", color: "var(--muted)" }}>{p.slug}</span>
                </td>
                <td>{p.category}</td>
                <td>
                  {!p.seoDescription ? (
                    <span className="badge badge-warning">belum</span>
                  ) : (
                    <span className="badge badge-info">ok</span>
                  )}
                </td>
                <td>
                  <Link to={`/products/${p.id}`} className="btn btn-ghost" style={{ padding: "0.375rem 0.75rem" }}>
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
