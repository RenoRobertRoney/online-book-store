import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./BookDetails.css";

function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Determine the API URL based on environment or default to localhost
    const API_URL = "http://localhost:5000/api";

    axios.get(`${API_URL}/books/${id}`)
      .then(response => {
        setBook(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching book details:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="loading-container">Loading book details...</div>;

  if (!book) {
    return <div className="error-container">Book not found</div>;
  }


  /* =========================
     ADD TO CART
  ========================= */
  const addToCart = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (!user || !token) {
      alert("Please login to add to cart");
      navigate("/login");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/cart",
        {
          userId: user.userId,
          item: { ...book, quantity: 1 }
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      alert("Book added to cart 🛒");
    } catch (err) {
      console.error("Error adding to cart", err);
      alert("Failed to add to cart");
    }
  };


  /* =========================
     ADD TO WISHLIST
  ========================= */
  const addToWishlist = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (!user || !token) {
      alert("Please login to add to wishlist");
      navigate("/login");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/wishlist",
        {
          userId: user.userId,
          item: book
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      alert("Added to wishlist ❤️");
    } catch (err) {
      console.error("Error adding to wishlist", err);
      // alert("Failed to add to wishlist"); // Optional: fail silently or show error
      if (err.response && err.response.data && err.response.data.message) {
        alert(err.response.data.message);
      }
    }
  };

  /* =========================
     RATING STARS
  ========================= */
  const renderStars = (rating) => {
    const full = Math.floor(rating);
    const empty = 5 - full;
    return "★".repeat(full) + "☆".repeat(empty);
  };

  return (
    <div className="book-details-page">
      <div className="book-details-container">

        {/* LEFT: IMAGE */}
        <div className="book-image-section">
          <img
            src={book.image}
            alt={book.title}
            onError={(e) => (e.target.src = "/no-cover.png")}
          />
        </div>

        {/* RIGHT: DETAILS */}
        <div className="book-info-section">
          <span className="book-category">{book.category}</span>
          <h1 className="book-title">{book.title}</h1>
          <p className="book-author">by {book.author}</p>

          <div className="book-rating">
            <span className="stars">{renderStars(book.rating)}</span>
            <span className="rating-count">({book.rating} / 5)</span>
          </div>

          <p className="book-price">₹{book.price}</p>

          <p className="book-description">
            {book.description || "No description available for this book. Dive into this amazing read and discover a new world!"}
          </p>

          <div className="action-buttons">
            <button className="btn btn-primary" onClick={addToCart}>
              🛒 Add to Cart
            </button>
            <button className="btn btn-wishlist" onClick={addToWishlist}>
              ❤️ Wishlist
            </button>
            <button className="btn btn-secondary" onClick={() => navigate(-1)}>
              ← Back
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default BookDetails;
