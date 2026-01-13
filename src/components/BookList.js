import { useParams, useNavigate, useLocation } from "react-router-dom";
import books from "../data/books";

function BookList() {
  const { category } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const sort = new URLSearchParams(location.search).get("sort");

  let categoryBooks = books.filter(
    (book) => book.category.toLowerCase() === category.toLowerCase()
  );

  // 🔹 SORT LOGIC
  if (sort === "price-low") categoryBooks.sort((a, b) => a.price - b.price);
  if (sort === "price-high") categoryBooks.sort((a, b) => b.price - a.price);
  if (sort === "top-rated") categoryBooks.sort((a, b) => b.rating - a.rating);
  if (sort === "newest") categoryBooks.sort((a, b) => b.id - a.id);
  if (sort === "oldest") categoryBooks.sort((a, b) => a.id - b.id);
  if (sort === "most-bought")
    categoryBooks.sort((a, b) => (b.bought || 0) - (a.bought || 0));

  const addToWishlist = (book) => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    if (!wishlist.find((b) => b.id === book.id)) {
      wishlist.push(book);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      alert("Added to Wishlist ❤️");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2 style={{ marginBottom: "25px" }}>
        Category: {category}
      </h2>

      <div className="book-grid">
        {categoryBooks.map((book) => (
          <div className="book-card" key={book.id}>
            <img src={book.image} alt={book.title} />

            <h3>{book.title}</h3>
            <p className="author">{book.author}</p>

            <p className="rating">
              {"★".repeat(Math.round(book.rating))}
              {"☆".repeat(5 - Math.round(book.rating))}
              <span> ({book.rating})</span>
            </p>

            <p className="price">₹{book.price}</p>

            <div className="card-actions">
              <button onClick={() => navigate(`/book/${book.id}`)}>
                View Details
              </button>
              <button className="wishlist-btn" onClick={() => addToWishlist(book)}>
                ❤️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookList;
