import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      fetchWishlist(storedUser.userId);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const fetchWishlist = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`http://localhost:5000/api/wishlist/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setWishlist(res.data.items || []);
    } catch (err) {
      console.error("Error fetching wishlist", err);
    }
  };

  const removeFromWishlist = async (id) => {
    if (!id) {
      console.error("Cannot remove: Missing ID");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:5000/api/wishlist/remove", {
        userId: user.userId,
        bookId: id
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setWishlist(res.data.items || []);
    } catch (err) {
      console.error("Error removing from wishlist", err);
    }
  };

  if (wishlist.length === 0) {
    return <h2 style={{ padding: "40px" }}>❤️ Wishlist is empty</h2>;
  }

  return (
    <div style={styles.container}>
      <h1>❤️ My Wishlist</h1>

      <div style={styles.grid}>
        {wishlist.map((book) => (
          <div key={book._id} style={styles.card}>
            <img src={book.image} alt={book.title} style={styles.image} />

            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <p><b>₹{book.price}</b></p>

            <div style={styles.actions}>
              <button onClick={() => navigate(`/book/${book._id}`)}>
                View
              </button>
              <button
                style={styles.removeBtn}
                onClick={() => removeFromWishlist(book._id)}
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
