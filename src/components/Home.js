import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import books from "../data/books";
import "./Home.css";

function Home() {
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(12);

  const navigate = useNavigate();
  const location = useLocation();

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
  if (sort === "newest") filteredBooks.sort((a, b) => b.id - a.id);
  if (sort === "oldest") filteredBooks.sort((a, b) => a.id - b.id);
  if (sort === "most-bought")
    filteredBooks.sort((a, b) => (b.bought || 0) - (a.bought || 0));

  const displayBooks = search
    ? filteredBooks
    : filteredBooks.slice(0, visibleCount);

  const loadMoreBooks = () => setVisibleCount((prev) => prev + 12);

  const handleSortChange = (e) => {
    navigate(`/?sort=${e.target.value}`);
  };

  const addToWishlist = (book) => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    if (!wishlist.find((b) => b.id === book.id)) {
      wishlist.push(book);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      alert("Added to Wishlist ❤️");
    }
  };

  return (
    <div className="home">
      {/* ================= HERO ================= */}
      <section className="hero">
        <h1>Discover Your Next Favorite Book</h1>
        <p>Search, explore and buy books online</p>

        <input
          type="text"
          className="home-search"
          placeholder="Search by title or author..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </section>

      {/* ================= SORT BAR ================= */}
      <div className="sort-container">
        <div className="sort-box colorful">
          <span>Sort by</span>
          <select value={sort || ""} onChange={handleSortChange}>
            <option value="">Recommended</option>
            <option value="top-rated">⭐ Top Rated</option>
            <option value="most-bought">🔥 Most Bought</option>
            <option value="price-low">💰 Price: Low → High</option>
            <option value="price-high">💰 Price: High → Low</option>
            <option value="newest">🆕 Newest</option>
            <option value="oldest">📜 Oldest</option>
          </select>
        </div>
      </div>

      {/* ================= BOOK LIST ================= */}
      <section className="featured">
        <h2>{search ? "Search Results" : "Popular Books"}</h2>

        <div className="book-grid">
          {displayBooks.map((book) => (
            <div className="book-card" key={book.id}>
              <img src={book.image} alt={book.title} />

              <h3>{book.title}</h3>
              <p className="author">{book.author}</p>

              {/* ⭐ Rating */}
              <p className="rating">
                {"★".repeat(Math.round(book.rating))}
                {"☆".repeat(5 - Math.round(book.rating))}
                <span className="rating-value"> ({book.rating})</span>
              </p>

              <p className="price">₹{book.price}</p>

              {/* ✅ PROFESSIONAL ACTION ROW */}
              <div className="card-actions">
                <button
                  className="details-btn"
                  onClick={() => navigate(`/book/${book.id}`)}
                >
                  View Details
                </button>

                <button
                  className="wishlist-btn"
                  title="Add to Wishlist"
                  onClick={() => addToWishlist(book)}
                >
                  ❤️
                </button>
              </div>
            </div>
          ))}
        </div>

        {!search && visibleCount < filteredBooks.length && (
          <div className="load-more">
            <button onClick={loadMoreBooks}>Load More Books</button>
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;
