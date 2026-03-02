import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function RegisterPage({ user, onRegister }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    onRegister({ name: name || "Movie Lover", email });
    setSuccess("Account created locally. You are now logged in.");
    setTimeout(() => navigate("/dashboard"), 600);
  };

  return (
    <section className="auth-hero">
      <div className="auth-card glass">
        <h1>Create your Daze account</h1>
        <p className="muted">
          This UI simulates auth on the front-end while your real APIs focus on
          movies.
        </p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Movie Lover"
            />
          </label>
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
          <label>
            Confirm password
            <input
              type="password"
              required
              minLength={4}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="••••••••"
            />
          </label>
          <button type="submit" className="btn primary wide">
            Register
          </button>
        </form>

        {success && <p className="pill success">{success}</p>}
        {error && <p className="pill error">{error}</p>}

        <p className="muted small">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
      <div className="auth-side">
        <h2>Designed for experimentation</h2>
        <p className="muted">
          Wire this screen to a real Spring Security backend later without
          changing the UI structure.
        </p>
      </div>
    </section>
  );
}

