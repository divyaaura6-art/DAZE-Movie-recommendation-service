import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { AppLayout } from "./components/Layout.jsx";
import { LoginPage } from "./pages/LoginPage.jsx";
import { RegisterPage } from "./pages/RegisterPage.jsx";
import { DashboardPage } from "./pages/DashboardPage.jsx";
import { useAuthState } from "./hooks/useAuthState.js";

function RequireAuth({ children }) {
  const { user } = useAuthState();
  const location = useLocation();
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
}

export default function App() {
  const { user, login, logout } = useAuthState();

  return (
    <AppLayout user={user} onLogout={logout}>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={user ? "/dashboard" : "/login"} replace />}
        />
        <Route
          path="/login"
          element={<LoginPage user={user} onLogin={login} />}
        />
        <Route
          path="/register"
          element={<RegisterPage user={user} onRegister={login} />}
        />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <DashboardPage user={user} />
            </RequireAuth>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppLayout>
  );
}

