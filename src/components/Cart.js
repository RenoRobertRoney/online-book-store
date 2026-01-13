import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  // Load cart safely
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const safeCart = storedCart.map((item) => ({
      ...item,
      price: Number(item.price),
      quantity: Number(item.quantity) || 1
    }));
    setCart(safeCart);
  }, []);

  const saveCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const updateQuantity = (id, qty) => {
    if (qty < 1) return;
    const updated = cart.map((item) =>
      item.id === id ? { ...item, quantity: qty } : item
    );
    saveCart(updated);
  };

  const removeItem = (id) => {
    saveCart(cart.filter((item) => item.id !== id));
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
        <div key={item.id} style={styles.card}>
          <img src={item.image} alt={item.title} style={styles.image} />

          <div style={{ flex: 1 }}>
            <h3>{item.title}</h3>
            <p>{item.author}</p>
            <p>₹{item.price}</p>

            <div style={styles.qty}>
              <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
            </div>
          </div>

          <div style={{ textAlign: "right" }}>
            <p><b>₹{item.price * item.quantity}</b></p>
            <button style={styles.remove} onClick={() => removeItem(item.id)}>
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
