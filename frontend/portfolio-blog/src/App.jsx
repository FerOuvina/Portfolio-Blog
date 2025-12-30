/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    fetch("http://localhost:8000/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Invalid Credentials");
        }
        return res.json();
      })
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  useEffect(() => {
    fetch("http://localhost:8000/api/admin/me", {
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

  if (loading) return <p>Loading...</p>;
  if (authenticated) {
    const handleLogout = () => {
      fetch("http://localhost:8000/api/admin/logout", {
        method: "POST",
        credentials: "include",
      }).then(() => {
        setAuthenticated(false);
      });
    };

    return (
      <div style={{ padding: 20 }}>
        <h1>Admin Dashboard</h1>
        <p>You are logged in 🎉</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 20, maxWidth: 400 }}>
      <h1>Admin Login</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Login</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default App;
