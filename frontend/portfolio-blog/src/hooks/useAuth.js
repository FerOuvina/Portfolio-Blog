import { useState, useEffect } from "react";

const API_URL = "http://localhost:8000";

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/admin/me`, {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error();
        }
        return res.json();
      })
      .then(() => {
        setAuthenticated(true);
      })
      .catch(() => {
        setAuthenticated(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const login = async (email, password) => {
    setError(null);

    const res = await fetch(`${API_URL}/api/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      setError("Invalid credentials");
      return false;
    }

    setAuthenticated(true);
    return true;
  };

  const logout = async () => {
    await fetch(`${API_URL}/api/admin/logout`, {
      method: "POST",
      credentials: "include",
    });

    setAuthenticated(false);
  };

  return {
    authenticated,
    loading,
    error,
    login,
    logout,
  };
}
