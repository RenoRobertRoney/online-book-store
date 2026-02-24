import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      fetchCart(storedUser.userId);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const fetchCart = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`http://localhost:5000/api/cart/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Backend returns { userId, items: [...] } or just the cart object
      setCart(res.data.items || []);
    } catch (err) {
      console.error("Error fetching cart", err);
    }
  };

  const updateQuantity = async (id, qty) => {
    if (qty < 1) return;
    if (!id) {
      console.error("Cannot update: Missing ID");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put("http://localhost:5000/api/cart/update", {
        userId: user.userId,
        bookId: id,
        quantity: qty
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCart(res.data.items || []);
    } catch (err) {
      console.error("Error updating cart", err);
    }
  };

  const removeItem = async (id) => {
    if (!id) {
      console.error("Cannot remove: Missing ID");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:5000/api/cart/remove", {
        userId: user.userId,
        bookId: id
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCart(res.data.items || []);
    } catch (err) {
      console.error("Error removing item", err);
    }
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "80px" }}>
        <h2>🛒 Your Cart is Empty</h2>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1>Shopping Cart</h1>

      {cart.map((item) => (
        <div key={item.bookId || item._id} style={styles.card}>
          {/* Note: item.bookId is used as key because backend schema uses bookId */}
          {/* Since backend saves simplified item, we might not have 'image' unless added to schema. 
              Checking Schema: Cart.js schema only has bookId, title, price, quantity. 
              WAIT. The schema in Cart.js DOES NOT HAVE IMAGE. 
              Frontend Home.js adds item: { ...book, quantity: 1 }. 
              Mongoose schema 'strict: false' or strict mode?
              The Schema I saw earlier:
                bookId: { type: String, required: true },
                title: { type: String, required: true },
                price: { type: Number, required: true },
                quantity: ...
              It DOES NOT have image.
              I should probably update the schema to include image if I want to display it.
              For now, I'll use a placeholder or check if the backend saved extra fields.
              Actually, Mongoose defaults to strict: true, so 'image' would be stripped.
              I will add 'image' to the Cart Schema in a separate step or just handle missing image.
           */}
          <img
            src={item.image || "https://placehold.co/100x150?text=No+Image"}
            alt={item.title}
            style={styles.image}
          />

          <div style={{ flex: 1 }}>
            <h3>{item.title}</h3>
            {/* Author is also missing from schema. Added check. */}
            <p>{item.author || "Unknown Author"}</p>
            <p>₹{item.price}</p>

            <div style={styles.qty}>
              <button onClick={() => updateQuantity(item.bookId || item._id, item.quantity - 1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.bookId || item._id, item.quantity + 1)}>+</button>
            </div>
          </div>

          <div style={{ textAlign: "right" }}>
            <p><b>₹{item.price * item.quantity}</b></p>
            <button style={styles.remove} onClick={() => removeItem(item.bookId || item._id)}>
              Remove
            </button>
          </div>
        </div>
      ))}

      {/* TOTAL & BUY BUTTON */}
      <div style={styles.footer}>
        <h2>Total: ₹{total}</h2>
        <button
          style={styles.buy}
          onClick={() => navigate("/checkout")}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}

/* =====================
   STYLES
===================== */
const styles = {
  container: {
    maxWidth: "900px",
    margin: "30px auto",
    padding: "20px"
  },
  card: {
    display: "flex",
    gap: "20px",
    background: "#fff",
    padding: "15px",
    marginBottom: "15px",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
  },
  image: {
    width: "120px",
    height: "160px",
    objectFit: "cover",
    borderRadius: "8px"
  },
  qty: {
    display: "flex",
    gap: "10px",
    marginTop: "10px"
  },
  remove: {
    background: "crimson",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer"
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "30px"
  },
  buy: {
    background: "#16a34a",
    color: "white",
    padding: "12px 25px",
    fontSize: "18px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  }
};

export default Cart;
