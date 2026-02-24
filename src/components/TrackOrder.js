import { useEffect, useState } from "react";
import axios from "axios";

function TrackOrder() {
  const [orders, setOrders] = useState([]);

  /* =========================
     FETCH ORDERS FROM API
  ========================= */
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (storedUser && storedUser.userId && token) {
      axios.get(`http://localhost:5000/api/orders/${storedUser.userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => {
          // Sort by createdAt descending
          const sorted = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setOrders(sorted);
        })
        .catch(err => console.error("Error fetching orders:", err));
    }
  }, []);

  const getProgressPercent = (status) => {
    const steps = ["Order Packed", "Shipped", "Out for Delivery", "Delivered"];
    const index = steps.indexOf(status);
    return ((index + 1) / steps.length) * 100;
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>🚚 Track Your Order</h1>

      {orders.length === 0 ? (
        <p style={styles.empty}>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order.orderId} style={styles.card}>
            {/* HEADER */}
            <div style={styles.cardHeader}>
              <div>
                <h3>Order ID: {order.orderId}</h3>
                <p>Order Date: {order.orderDate}</p>
              </div>
              <span style={styles.status}>{order.status}</span>
            </div>

            {/* DELIVERY */}
            <p><b>Estimated Delivery:</b> {order.estimatedDelivery}</p>

            {/* PROGRESS */}
            <div style={styles.progressContainer}>
              <div
                style={{
                  ...styles.progressBar,
                  width: `${getProgressPercent(order.status)}%`
                }}
              />
            </div>

            {/* TIMELINE */}
            <div style={styles.timeline}>
              {["Order Packed", "Shipped", "Out for Delivery", "Delivered"].map((step, index) => (
                <div key={index} style={styles.step}>
                  <div
                    style={{
                      ...styles.circle,
                      background: ["Order Packed", "Shipped", "Out for Delivery", "Delivered"].indexOf(order.status) >= index ? "#4caf50" : "#ccc"
                    }}
                  >
                    {["Order Packed", "Shipped", "Out for Delivery", "Delivered"].indexOf(order.status) >= index ? "✓" : ""}
                  </div>
                  <p>{step}</p>
                </div>
              ))}
            </div>

            {/* ITEMS */}
            <h4>📚 Books Ordered</h4>
            <ul>
              {order.items.map((item, idx) => (
                <li key={idx}>
                  {item.title} × {item.quantity}
                </li>
              ))}
            </ul>

            {/* TOTAL */}
            <div style={styles.total}>
              <span>Total Amount</span>
              <span>₹{order.total}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

/* =======================
   STYLES
======================= */
const styles = {
  page: {
    padding: "40px",
    background: "#f4f6f9",
    minHeight: "100vh"
  },
  heading: {
    textAlign: "center",
    marginBottom: "30px"
  },
  empty: {
    textAlign: "center",
    color: "#777"
  },
  card: {
    background: "#fff",
    borderRadius: "12px",
    padding: "25px",
    marginBottom: "30px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)"
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "1px solid #eee",
    paddingBottom: "15px"
  },
  status: {
    background: "#e3f2fd",
    color: "#1565c0",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "14px"
  },
  progressContainer: {
    height: "8px",
    background: "#ddd",
    borderRadius: "5px",
    margin: "15px 0"
  },
  progressBar: {
    height: "100%",
    background: "linear-gradient(90deg,#4caf50,#81c784)"
  },
  timeline: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px"
  },
  step: {
    textAlign: "center",
    flex: 1
  },
  circle: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 8px"
  },
  total: {
    display: "flex",
    justifyContent: "space-between",
    fontWeight: "600",
    marginTop: "20px",
    fontSize: "18px"
  }
};

export default TrackOrder;
