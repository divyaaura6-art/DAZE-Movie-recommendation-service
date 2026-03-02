import { Link, NavLink } from "react-router-dom";

export function AppLayout({ children, user, onLogout }) {
  return (
    <div className="app-shell">
      <header className="app-header glass">
        <div className="logo">
          <span className="logo-mark">Daze</span>
          <span className="logo-sub">cinematic picks</span>
        </div>
        <nav className="nav-links">
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </nav>
        <div className="header-right">
          {user ? (
            <>
              <span className="user-pill">Hi, {user.name}</span>
              <button type="button" className="btn ghost" onClick={onLogout}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="btn primary">
              Get started
            </Link>
          )}
        </div>
      </header>
      <main className="app-main">{children}</main>
      <footer className="app-footer">
        <span>Daze · Powered by your Spring Boot API</span>
      </footer>
    </div>
  );
}

