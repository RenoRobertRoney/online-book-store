import { useEffect, useState } from "react";
import axios from "axios";
import { FaTruck, FaBox, FaCheckCircle, FaCalendarAlt, FaReceipt } from "react-icons/fa";
import "./TrackOrder.css";

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
          const sorted = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setOrders(sorted);
        })
        .catch(err => console.error("Error fetching orders:", err));
    }
  }, []);

  const steps = ["Order Packed", "Shipped", "Out for Delivery", "Delivered"];

  const getStatusIndex = (status) => steps.indexOf(status);

  const getProgressPercent = (status) => {
    const index = getStatusIndex(status);
    if (index === -1) return 0;
    return ((index) / (steps.length - 1)) * 100;
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Order Packed": return "status-packed";
      case "Shipped": return "status-shipped";
      case "Out for Delivery": return "status-out";
      case "Delivered": return "status-delivered";
      default: return "";
    }
  };

  return (
    <div className="track-order-page">
      <h1 className="track-order-title">🚚 Track Your Order</h1>

      {orders.length === 0 ? (
        <div className="empty-orders">
          <FaBox size={50} style={{ color: "#d1d5db", marginBottom: "20px" }} />
          <p>You haven't placed any orders yet.</p>
        </div>
      ) : (
        orders.map((order) => {
          const currentIndex = getStatusIndex(order.status);

          return (
            <div key={order.orderId} className="order-card">
              {/* HEADER */}
              <div className="order-card-header">
                <div className="order-id-section">
                  <h3>Order ID: #{order.orderId}</h3>
                  <p className="order-date">
                    <FaCalendarAlt style={{ marginRight: "6px" }} />
                    Placed on: {order.orderDate}
                  </p>
                </div>
                <span className={`status-badge ${getStatusClass(order.status)}`}>
                  {order.status}
                </span>
              </div>

              {/* DELIVERY */}
              <div className="delivery-estimate">
                <FaTruck style={{ color: "#10b981" }} />
                <span><b>Estimated Delivery:</b> {order.estimatedDelivery}</span>
              </div>

              {/* PROGRESS SECTION */}
              <div className="progress-section">
                <div className="progress-track-bg">
                  <div
                    className="progress-track-fill"
                    style={{ width: `${getProgressPercent(order.status)}%` }}
                  />
                </div>

                <div className="timeline">
                  {steps.map((step, index) => (
                    <div key={index} className="timeline-step">
                      <div className={`step-node ${currentIndex >= index ? "active" : ""}`}>
                        {currentIndex >= index ? <FaCheckCircle /> : index + 1}
                      </div>
                      <p className={`step-label ${currentIndex >= index ? "active" : ""}`}>
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* ORDER DETAILS GRID */}
              <div className="order-details-grid">
                {/* ITEMS */}
                <div className="books-ordered">
                  <h4><FaBox style={{ marginRight: "10px", color: "#6b7280" }} /> Books Ordered</h4>
                  <ul className="items-list">
                    {order.items.map((item, idx) => (
                      <li key={idx} className="item-row">
                        <span>{item.title} <b>× {item.quantity}</b></span>
                        <span>₹{item.price * item.quantity}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* SUMMARY */}
                <div className="order-summary">
                  <div>
                    <h4><FaReceipt style={{ marginRight: "10px", color: "#6b7280" }} /> Order Summary</h4>
                    <div className="summary-row">
                      <span>Subtotal</span>
                      <span>₹{order.total}</span>
                    </div>
                    <div className="summary-row">
                      <span>Shipping</span>
                      <span style={{ color: "#10b981", fontWeight: "600" }}>FREE</span>
                    </div>
                  </div>

                  <div className="total-amount">
                    <span>Total Amount</span>
                    <span>₹{order.total}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default TrackOrder;
