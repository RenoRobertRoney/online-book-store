import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // ✅ ADMIN LOGIN
    if (email === "admin@gmail.com" && password === "admin123") {
      localStorage.setItem("role", "admin");
      alert("Admin Login Successful");
      navigate("/admin-dashboard");
      return;
    }

    // ✅ NORMAL USER LOGIN (Dummy logic)
    if (email && password) {
      localStorage.setItem("role", "user");
      alert("User Login Successful");
      navigate("/");
      return;
    }

    alert("Invalid Email or Password");
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleLogin}>
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>

        <p>
          Don’t have an account?{" "}
          <span onClick={() => navigate("/registration")}>Register</span>
        </p>
      </form>
    </div>
  );
}

export default Login;
