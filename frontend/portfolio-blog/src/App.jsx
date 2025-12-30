import { useEffect, useState } from "react";

function App() {
  const [status, setStatus] = useState("loading...");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/health", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Request failed");
        return res.json();
      })
      .then((data) => {
        setStatus(data.status);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>React ↔ PHP Test</h1>
      <p>Backend status: {status}</p>
    </div>
  );
}

export default App;
