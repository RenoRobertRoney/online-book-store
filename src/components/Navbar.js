import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/">📚 BookStore</Link>
        <Link to="/">Home</Link>
        <Link to="/categories">Categories</Link>
        <Link to="/wishlist">❤️ Wishlist</Link>
        <Link to="/cart">🛒 Cart</Link>
        <Link to="/track-order">🚚 Track Order</Link>
        <Link to="/settings">Settings</Link>
      </div>

      <div className="nav-right">
        {!isLoggedIn ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/registration">Register</Link>
          </>
        ) : (
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
