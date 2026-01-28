import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    /* ================= ADMIN LOGIN ================= */
    if (email === "admin@gmail.com" && password === "admin123") {
      localStorage.setItem("role", "admin");
      localStorage.setItem("isLoggedIn", "true");
      alert("Admin Login Successful");
      navigate("/admin-dashboard");
      return;
    }

    /* ================= USER LOGIN ================= */
    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (
      savedUser &&
      savedUser.email === email &&
      savedUser.password === password
    ) {
      localStorage.setItem("role", "user");
      localStorage.setItem("isLoggedIn", "true");
      alert("User Login Successful");
      navigate("/");
      return;
    }

    /* ================= INVALID ================= */
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
