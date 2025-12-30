import { useState } from "react";
import useAuth from "./hooks/useAuth.js";

function App() {
  const { authenticated, loading, error, login, logout } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  if (loading) return <p>Loading...</p>;
  if (authenticated) {
    return (
      <div style={{ padding: 20 }}>
        <h1>Admin Dashboard</h1>
        <p>You are logged in 🎉</p>
        <button onClick={logout}>Logout</button>
      </div>
    );
  }

  if (!authenticated) {
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
}

export default App;
