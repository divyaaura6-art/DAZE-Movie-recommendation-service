import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { fetchHello } from "../api/movies.js";

export function LoginPage({ user, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [welcome, setWelcome] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const hello = await fetchHello();
      setWelcome(hello);
      onLogin({ email, name: email.split("@")[0] || "Movie Lover" });
      setTimeout(() => navigate("/dashboard"), 500);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Could not reach the server. Is Spring Boot running on http://localhost:8080?",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-hero">
      <div className="auth-card glass">
        <h1>Welcome back to Daze</h1>
        <p className="muted">
          Sign in to explore curated popular, top-rated and recommended movies.
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </label>
          <label>
            Password
            <input
              type="password"
              required
              minLength={4}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </label>
          <button type="submit" className="btn primary wide" disabled={loading}>
            {loading ? "Connecting…" : "Login"}
          </button>
        </form>

        {welcome && <p className="pill success">{welcome}</p>}
        {error && <p className="pill error">{error}</p>}

        <p className="muted small">
          New here? <Link to="/register">Create a free account</Link>
        </p>
      </div>
      <div className="auth-side">
        <h2>Streamline your movie nights</h2>
        <ul className="feature-list">
          <li>Smart filters for genre, language and mood.</li>
          <li>Side-by-side popular vs top-rated views.</li>
          <li>AI-style recommendation lane powered by your API.</li>
        </ul>
      </div>
    </section>
  );
}

