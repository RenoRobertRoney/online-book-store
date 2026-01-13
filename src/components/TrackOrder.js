import { useEffect, useState } from "react";

function TrackOrder() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders.reverse()); // latest order first
  }, []);

  const getProgressPercent = (steps) => {
    const completed = steps.filter((s) => s.completed).length;
    return (completed / steps.length) * 100;
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

            {/* DELIVERY INFO */}
            <div style={styles.deliveryInfo}>
              <p>
                <b>Estimated Delivery:</b>{" "}
                <span style={{ color: "#2e7d32" }}>
                  {order.estimatedDelivery}
                </span>
              </p>
            </div>

            {/* PROGRESS BAR */}
            <div style={styles.progressContainer}>
              <div
                style={{
                  ...styles.progressBar,
                  width: `${getProgressPercent(order.trackingSteps)}%`,
                }}
              />
            </div>

            {/* TIMELINE */}
            <div style={styles.timeline}>
              {order.trackingSteps.map((step, index) => (
                <div key={index} style={styles.step}>
                  <div
                    style={{
                      ...styles.circle,
                      background: step.completed ? "#4caf50" : "#ccc",
                    }}
                  >
                    {step.completed ? "✓" : ""}
                  </div>
                  <p
                    style={{
                      fontWeight: step.completed ? "600" : "400",
                      color: step.completed ? "#000" : "#777",
                    }}
                  >
                    {step.step}
                  </p>
                </div>
              ))}
            </div>

            {/* ITEMS */}
            <div style={styles.items}>
              <h4>📚 Books Ordered</h4>
              <ul>
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    {item.title} × {item.qty}
                  </li>
                ))}
              </ul>
            </div>

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
    minHeight: "100vh",
  },
  heading: {
    textAlign: "center",
    marginBottom: "30px",
  },
  empty: {
    textAlign: "center",
    color: "#777",
  },
  card: {
    background: "#fff",
    borderRadius: "12px",
    padding: "25px",
    marginBottom: "30px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #eee",
    paddingBottom: "15px",
  },
  status: {
    background: "#e3f2fd",
    color: "#1565c0",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "14px",
  },
  deliveryInfo: {
    marginTop: "15px",
  },
  progressContainer: {
    height: "8px",
    background: "#ddd",
    borderRadius: "5px",
    overflow: "hidden",
    marginTop: "15px",
  },
  progressBar: {
    height: "100%",
    background: "linear-gradient(90deg,#4caf50,#81c784)",
    transition: "width 0.5s",
  },
  timeline: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "25px",
  },
  step: {
    textAlign: "center",
    flex: 1,
  },
  circle: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 8px",
  },
  items: {
    marginTop: "25px",
  },
  total: {
    display: "flex",
    justifyContent: "space-between",
    fontWeight: "600",
    marginTop: "20px",
    fontSize: "18px",
  },
};

export default TrackOrder;
