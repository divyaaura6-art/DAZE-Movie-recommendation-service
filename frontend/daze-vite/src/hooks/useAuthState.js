import { useEffect, useState } from "react";

const STORAGE_KEY = "daze_auth_user";

export function useAuthState() {
  const [user, setUser] = useState(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(() => {
    if (user) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const login = (payload) => {
    setUser({
      name: payload.name || "Movie Lover",
      email: payload.email,
    });
  };

  const logout = () => {
    setUser(null);
  };

  return { user, login, logout };
}

