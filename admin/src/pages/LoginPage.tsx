import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("ifanmocha");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await api.login(username, password);
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "1rem",
      }}
    >
      <form onSubmit={submit} className="card" style={{ width: "100%", maxWidth: 400 }}>
        <h1 style={{ margin: "0 0 0.5rem", fontSize: "1.5rem" }}>Admin CMS</h1>
        <p style={{ margin: "0 0 1.5rem", color: "var(--muted)", fontSize: "0.875rem" }}>
          StockistNasa.id - kelola konten & SEO
        </p>
        {error && (
          <p style={{ color: "var(--danger)", fontSize: "0.875rem", marginBottom: "1rem" }}>
            {error}
          </p>
        )}
        <div className="field">
          <label>Username</label>
          <input value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" />
        </div>
        <div className="field">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </div>
        <button type="submit" className="btn btn-primary" style={{ width: "100%" }} disabled={loading}>
          {loading ? "Masuk..." : "Masuk"}
        </button>
      </form>
    </div>
  );
}
