import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("role");
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    if (user && token) {
      const userId = user.userId || user._id;
      if (!userId) return;

      // Fetch Cart Count
      axios.get(`http://localhost:5000/api/cart/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => setCartCount(res.data.items?.length || 0))
        .catch(err => console.error("Cart count error:", err));

      // Fetch Wishlist Count
      axios.get(`http://localhost:5000/api/wishlist/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => setWishlistCount(res.data.length))
        .catch(err => console.error("Wishlist count error:", err));
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="logo">📚 BookVerse</Link>
        <Link to="/">Home</Link>
        <Link to="/categories">Categories</Link>
        <Link to="/wishlist">
           Wishlist {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
        </Link>
        <Link to="/cart">
           Cart {cartCount > 0 && <span className="badge">{cartCount}</span>}
        </Link>
        <Link to="/track-order"> Track Order</Link>
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
