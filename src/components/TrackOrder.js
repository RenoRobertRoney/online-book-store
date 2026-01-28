import { useEffect, useState } from "react";

function TrackOrder() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders.reverse());
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

            {/* DELIVERY */}
            <p><b>Estimated Delivery:</b> {order.estimatedDelivery}</p>

            {/* PROGRESS */}
            <div style={styles.progressContainer}>
              <div
                style={{
                  ...styles.progressBar,
                  width: `${getProgressPercent(order.trackingSteps)}%`
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
                      background: step.completed ? "#4caf50" : "#ccc"
                    }}
                  >
                    {step.completed ? "✓" : ""}
                  </div>
                  <p>{step.step}</p>
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
