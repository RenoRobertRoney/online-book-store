import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(data);
  }, []);

  const removeFromWishlist = (id) => {
    const updated = wishlist.filter((book) => book.id !== id);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  if (wishlist.length === 0) {
    return <h2 style={{ padding: "40px" }}>❤️ Wishlist is empty</h2>;
  }

  return (
    <div style={styles.container}>
      <h1>❤️ My Wishlist</h1>

      <div style={styles.grid}>
        {wishlist.map((book) => (
          <div key={book.id} style={styles.card}>
            <img src={book.image} alt={book.title} style={styles.image} />

            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <p><b>₹{book.price}</b></p>

            <div style={styles.actions}>
              <button onClick={() => navigate(`/book/${book.id}`)}>
                View
              </button>
              <button
                style={styles.removeBtn}
                onClick={() => removeFromWishlist(book.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px,1fr))",
    gap: "20px",
  },
  card: {
    background: "#fff",
    padding: "15px",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
  },
  image: {
    width: "100%",
    height: "250px",
    objectFit: "cover",
    borderRadius: "8px",
  },
  actions: {
    display: "flex",
    gap: "8px",
    marginTop: "10px",
  },
  removeBtn: {
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "8px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default Wishlist;
