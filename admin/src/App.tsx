import { useEffect, useState } from "react";
import { NavLink, Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  FileText,
  Search,
  Bot,
  Rocket,
  LogOut,
} from "lucide-react";
import { api } from "./api";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ProductsPage from "./pages/ProductsPage";
import ProductEditPage from "./pages/ProductEditPage";
import ArticlesPage from "./pages/ArticlesPage";
import ArticleEditPage from "./pages/ArticleEditPage";
import SeoGooglePage from "./pages/SeoGooglePage";
import SeoAiPage from "./pages/SeoAiPage";
import PublishPage from "./pages/PublishPage";

function Layout() {
  const navigate = useNavigate();
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.me()
      .then((r) => setUser(r.user.username))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div style={{ padding: "2rem" }}>Memuat...</div>;
  }

  if (!user) return <Navigate to="/login" replace />;

  const logout = async () => {
    await api.logout();
    navigate("/login");
  };

  const link = ({ isActive }: { isActive: boolean }) =>
    `sidebar-link${isActive ? " active" : ""}`;

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside
        style={{
          width: 240,
          borderRight: "1px solid var(--border)",
          padding: "1.25rem",
          background: "var(--surface)",
        }}
      >
        <div style={{ marginBottom: "2rem" }}>
          <p style={{ margin: 0, fontWeight: 800, fontSize: "1rem" }}>
            StockistNasa<span style={{ color: "var(--brand)" }}>.id</span>
          </p>
          <p style={{ margin: "0.25rem 0 0", fontSize: "0.75rem", color: "var(--muted)" }}>
            CMS Admin · {user}
          </p>
        </div>
        <nav style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
          <NavLink to="/" end className={link}>
            <LayoutDashboard size={16} /> Dashboard
          </NavLink>
          <NavLink to="/products" className={link}>
            <Package size={16} /> Produk
          </NavLink>
          <NavLink to="/articles" className={link}>
            <FileText size={16} /> Artikel
          </NavLink>
          <NavLink to="/seo/google" className={link}>
            <Search size={16} /> SEO Google
          </NavLink>
          <NavLink to="/seo/ai" className={link}>
            <Bot size={16} /> SEO AI
          </NavLink>
          <NavLink to="/publish" className={link}>
            <Rocket size={16} /> Publish
          </NavLink>
        </nav>
        <button
          type="button"
          className="btn btn-ghost"
          style={{ marginTop: "2rem", width: "100%" }}
          onClick={logout}
        >
          <LogOut size={16} /> Keluar
        </button>
      </aside>
      <main style={{ flex: 1, padding: "1.5rem 2rem", overflow: "auto" }}>
        <Outlet />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<Layout />}>
        <Route index element={<DashboardPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/:id" element={<ProductEditPage />} />
        <Route path="articles" element={<ArticlesPage />} />
        <Route path="articles/:id" element={<ArticleEditPage />} />
        <Route path="seo/google" element={<SeoGooglePage />} />
        <Route path="seo/ai" element={<SeoAiPage />} />
        <Route path="publish" element={<PublishPage />} />
      </Route>
    </Routes>
  );
}
