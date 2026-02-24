import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./Home.css"; // Reuse shared book card styles

function BookList() {
  const { category } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5000/api/books?category=${category}`)
      .then(response => {
        setBooks(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching books:", error);
        setLoading(false);
      });
  }, [category]);

  const sort = new URLSearchParams(location.search).get("sort");

  if (loading) return <p>Loading books...</p>;

  let categoryBooks = [...books];

  // 🔹 SORT LOGIC
  if (sort === "price-low") categoryBooks.sort((a, b) => a.price - b.price);
  if (sort === "price-high") categoryBooks.sort((a, b) => b.price - a.price);
  if (sort === "top-rated") categoryBooks.sort((a, b) => b.rating - a.rating);
  if (sort === "newest") categoryBooks.sort((a, b) => b._id.localeCompare(a._id));
  if (sort === "oldest") categoryBooks.sort((a, b) => a._id.localeCompare(b._id));
  if (sort === "most-bought")
    categoryBooks.sort((a, b) => (b.bought || 0) - (a.bought || 0));

  const addToCart = async (book) => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (!isLoggedIn || !user || !token) {
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
      alert("Added to Cart 🛒");
    } catch (err) {
      console.error("Error adding to cart", err);
      alert("Failed to add to cart");
    }
  };

  const addToWishlist = async (book) => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (!isLoggedIn || !user || !token) {
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
      alert("Added to Wishlist ❤️");
    } catch (err) {
      console.error("Error adding to wishlist", err);
      if (err.response && err.response.data && err.response.data.message) {
        alert(err.response.data.message);
      }
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "30px", color: "var(--primary-color)" }}>
        Category: {category}
      </h2>

      <div className="book-grid">
        {categoryBooks.map((book) => (
          <div className="book-card" key={book._id}>
            <div className="book-image-container">
              <img src={book.image} alt={book.title} />
              <div className="book-overlay">
                <button
                  className="quick-view-btn"
                  onClick={() => navigate(`/book/${book._id}`)}
                >
                  View Details
                </button>
              </div>
            </div>

            <div className="book-info">
              <h3 className="book-title" title={book.title}>{book.title}</h3>
              <p className="book-author">{book.author}</p>

              <div className="book-meta">
                <span className="book-price">₹{book.price}</span>
                <span className="book-rating">★ {book.rating}</span>
              </div>

              <div className="book-actions">
                <button
                  className="add-btn cart-btn"
                  onClick={() => addToCart(book)}
                >
                  🛒 Add to Cart
                </button>
                <button
                  className="add-btn wishlist-btn"
                  onClick={() => addToWishlist(book)}
                >
                  ❤️
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookList;
