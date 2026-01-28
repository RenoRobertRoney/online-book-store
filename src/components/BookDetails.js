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
    alert("Book added to cart 🛒");
  };

  /* =========================
     ADD TO WISHLIST
  ========================= */
  const addToWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    if (!wishlist.find((b) => b.id === book.id)) {
      wishlist.push(book);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      alert("Added to wishlist ❤️");
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
    <div style={styles.page}>
      <div style={styles.card}>
        {/* ===== IMAGE ===== */}
        <img
          src={book.image}
          alt={book.title}
          style={styles.image}
          onError={(e) => (e.target.src = "/no-cover.png")}
        />

        {/* ===== DETAILS ===== */}
        <div style={styles.details}>
          <h1 style={styles.title}>{book.title}</h1>
          <p style={styles.author}>by {book.author}</p>

          <div style={styles.rating}>
            <span style={styles.stars}>{renderStars(book.rating)}</span>
            <span style={styles.ratingValue}>{book.rating}/5</span>
          </div>

          <p style={styles.category}>
            <b>Category:</b> {book.category}
          </p>

          <p style={styles.price}>₹{book.price}</p>

          <p style={styles.summary}>{book.summary}</p>

          <div style={styles.buttons}>
            <button style={styles.cartBtn} onClick={addToCart}>
              🛒 Add to Cart
            </button>

            <button style={styles.backBtn} onClick={() => navigate(-1)}>
              ← Back
            </button>
          </div>
        </div>

        {/* ===== RIGHT ACTION COLUMN ===== */}
        <div style={styles.sideBox}>
          <button style={styles.wishlistBtn} onClick={addToWishlist}>
            ❤️ Add to Wishlist
          </button>

          <div style={styles.infoBox}>
            <p><b>Delivery:</b> 3–5 Days</p>
            <p><b>Availability:</b> In Stock</p>
            <p><b>Returns:</b> 7 Days</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================
   STYLES
========================= */
const styles = {
  page: {
    background: "#f4f6f9",
    minHeight: "100vh",
    padding: "40px 20px"
  },

  card: {
    maxWidth: "1150px",
    margin: "auto",
    background: "#ffffff",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.12)",
    display: "flex",
    gap: "35px",
    alignItems: "flex-start"
  },

  image: {
    width: "260px",
    height: "400px",
    objectFit: "cover",
    borderRadius: "14px"
  },

  details: {
    flex: 1
  },

  title: {
    fontSize: "30px",
    marginBottom: "6px",
    color: "#111827"
  },

  author: {
    fontSize: "16px",
    color: "#6b7280",
    marginBottom: "12px"
  },

  rating: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "12px"
  },

  stars: {
    color: "#facc15",
    fontSize: "22px"
  },

  ratingValue: {
    fontSize: "14px",
    color: "#4b5563"
  },

  category: {
    fontSize: "15px",
    marginBottom: "12px",
    color: "#374151"
  },

  price: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#111827",
    margin: "18px 0"
  },

  summary: {
    fontSize: "16px",
    lineHeight: "1.7",
    color: "#374151",
    marginBottom: "25px"
  },

  buttons: {
    display: "flex",
    gap: "15px"
  },

  cartBtn: {
    background: "#111827",
    color: "#fff",
    border: "none",
    padding: "14px 26px",
    fontSize: "16px",
    borderRadius: "10px",
    cursor: "pointer"
  },

  backBtn: {
    background: "#e5e7eb",
    border: "none",
    padding: "14px 26px",
    fontSize: "16px",
    borderRadius: "10px",
    cursor: "pointer"
  },

  /* ===== RIGHT COLUMN ===== */
  sideBox: {
    width: "220px",
    display: "flex",
    flexDirection: "column",
    gap: "20px"
  },

  wishlistBtn: {
    background: "#ffe4e6",
    color: "#e11d48",
    border: "none",
    padding: "14px",
    borderRadius: "12px",
    fontSize: "16px",
    cursor: "pointer",
    fontWeight: "600"
  },

  infoBox: {
    background: "#f9fafb",
    padding: "15px",
    borderRadius: "12px",
    fontSize: "14px",
    color: "#374151",
    lineHeight: "1.6"
  }
};

export default BookDetails;
