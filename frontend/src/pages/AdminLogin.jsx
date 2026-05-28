import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch(
        "https://ai-powered-product-discovery-production.up.railway.app",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
        }
      );

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("isAdmin", "true");
        navigate("/admin");
      } else {
        alert("Wrong password");
      }
    } catch (err) {
      alert("Server error");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Admin Login</h2>

      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ padding: "10px", marginRight: "10px" }}
      />

      <button onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default AdminLogin;