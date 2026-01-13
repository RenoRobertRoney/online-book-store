import { useParams, useNavigate } from "react-router-dom";
import books from "../data/books";

function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const book = books.find((b) => b.id === Number(id));

  if (!book) {
    return <h2 style={{ padding: "40px" }}>Book not found</h2>;
  }

  /* =========================
     ADD TO CART
  ========================= */
  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find((item) => item.id === book.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...book, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Book added to cart");
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
    <div style={styles.container}>
      <div style={styles.card}>
        {/* BOOK IMAGE */}
        <img
          src={book.image}
          alt={book.title}
          style={styles.image}
          onError={(e) => (e.target.src = "/no-cover.png")}
        />

        {/* BOOK DETAILS */}
        <div style={styles.details}>
          <h1 style={styles.title}>{book.title}</h1>
          <h3 style={styles.author}>by {book.author}</h3>

          {/* RATING */}
          <div style={styles.rating}>
            <span style={styles.stars}>{renderStars(book.rating)}</span>
            <span style={styles.ratingValue}>({book.rating})</span>
          </div>

          <p style={styles.category}>
            <b>Category:</b> {book.category}
          </p>

          <p style={styles.price}>₹{book.price}</p>

          <p style={styles.summary}>{book.summary}</p>

          {/* ACTION BUTTONS */}
          <div style={styles.buttons}>
            <button style={styles.cartBtn} onClick={addToCart}>
              Add to Cart
            </button>

            <button style={styles.backBtn} onClick={() => navigate(-1)}>
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================
   INLINE STYLES
========================= */
const styles = {
  container: {
    maxWidth: "1100px",
    margin: "50px auto",
    padding: "20px"
  },
  card: {
    display: "flex",
    gap: "40px",
    background: "#ffffff",
    padding: "35px",
    borderRadius: "14px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.12)"
  },
  image: {
    width: "280px",
    height: "420px",
    objectFit: "cover",
    borderRadius: "12px"
  },
  details: {
    flex: 1
  },
  title: {
    fontSize: "32px",
    marginBottom: "8px"
  },
  author: {
    color: "#555",
    marginBottom: "10px"
  },
  rating: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "12px"
  },
  stars: {
    color: "#facc15",
    fontSize: "20px"
  },
  ratingValue: {
    fontSize: "14px",
    color: "#555"
  },
  category: {
    color: "#374151",
    marginBottom: "10px"
  },
  price: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#111827",
    margin: "18px 0"
  },
  summary: {
    fontSize: "16px",
    lineHeight: "1.7",
    color: "#333",
    marginBottom: "25px"
  },
  buttons: {
    display: "flex",
    gap: "15px"
  },
  cartBtn: {
    background: "#111827",
    color: "white",
    border: "none",
    padding: "14px 24px",
    fontSize: "16px",
    borderRadius: "8px",
    cursor: "pointer"
  },
  backBtn: {
    background: "#e5e7eb",
    border: "none",
    padding: "14px 24px",
    fontSize: "16px",
    borderRadius: "8px",
    cursor: "pointer"
  }
};

export default BookDetails;
