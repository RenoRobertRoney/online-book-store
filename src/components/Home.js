import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./Home.css";

function Home() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(12);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    axios.get("http://localhost:5000/api/books")
      .then((res) => setBooks(res.data))
      .catch((err) => console.error("Error fetching books:", err));
  }, []);

  const sort = new URLSearchParams(location.search).get("sort");

  /* ================= SEARCH FILTER ================= */
  let filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase())
  );

  /* ================= SORT LOGIC ================= */
  if (sort === "price-low") filteredBooks.sort((a, b) => a.price - b.price);
  if (sort === "price-high") filteredBooks.sort((a, b) => b.price - a.price);
  if (sort === "top-rated") filteredBooks.sort((a, b) => b.rating - a.rating);
  if (sort === "newest") filteredBooks.sort((a, b) => b._id.localeCompare(a._id));
  if (sort === "oldest") filteredBooks.sort((a, b) => a._id.localeCompare(b._id));
  if (sort === "most-bought")
    filteredBooks.sort((a, b) => (b.bought || 0) - (a.bought || 0));

  const displayBooks = search
    ? filteredBooks
    : filteredBooks.slice(0, visibleCount);

  const loadMoreBooks = () => setVisibleCount((prev) => prev + 12);

  const handleSortChange = (e) => {
    navigate(`/?sort=${e.target.value}`);
  };

  /* ================= 🛒 CART LOGIC ================= */
  const addToCart = async (book) => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (!isLoggedIn || !user || !token) {
      alert("Please login to add books to cart");
      navigate("/login");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/cart",
        {
          userId: user.userId, // Use userId from stored user object
          item: { ...book, quantity: 1 } // Ensure item has quantity
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

  /* ================= 🔐 WISHLIST PROTECTION ================= */
  const addToWishlist = async (book) => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (!isLoggedIn || !user || !token) {
      alert("Please login to add books to wishlist");
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
    <div className="home">
      {/* ================= HERO ================= */}
      <section className="hero">
        <div className="hero-content">
          <h1>Discover Your Next Favorite Book</h1>
          <p>Explore our curated collection of bestsellers, classics, and hidden gems.</p>
          <input
            type="text"
            className="hero-search"
            placeholder="Search by title, author, or ISBN..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </section>

      {/* ================= FILTERS ================= */}
      <div className="filters-container">
        <h2>{search ? `Results for "${search}"` : "Trending Now"}</h2>
        <select className="sort-select" value={sort || ""} onChange={handleSortChange}>
          <option value="">Sort by: Recommended</option>
          <option value="top-rated">⭐ Top Rated</option>
          <option value="most-bought">🔥 Best Sellers</option>
          <option value="price-low">💰 Price: Low to High</option>
          <option value="price-high">💰 Price: High to Low</option>
          <option value="newest">🆕 Newest Arrivals</option>
        </select>
      </div>

      {/* ================= BOOK GRID ================= */}
      <div className="book-grid">
        {displayBooks.map((book) => (
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

      {/* ================= LOAD MORE ================= */}
      {!search && visibleCount < filteredBooks.length && (
        <div className="load-more">
          <button onClick={loadMoreBooks}>Load More Books</button>
        </div>
      )}
    </div>
  );
}

export default Home;
