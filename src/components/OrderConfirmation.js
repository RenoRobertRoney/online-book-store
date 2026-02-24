import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function OrderConfirmation() {
  const location = useLocation();
  const [order, setOrder] = useState(location.state?.order || null);

  useEffect(() => {
    if (!order) {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");

      if (storedUser && storedUser.userId && token) {
        axios.get(`http://localhost:5000/api/orders/${storedUser.userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
          .then(res => {
            if (res.data && res.data.length > 0) {
              // Sort by createdAt descending to get the latest
              const sortedOrders = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
              setOrder(sortedOrders[0]);
            }
          })
          .catch(err => console.error("Error fetching order:", err));
      }
    }
  }, [order]);

  if (!order) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h2>Loading Order Details...</h2>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1>🎉 Order Confirmed!</h1>
      <p>Thank you for your purchase.</p>

      <div style={styles.box}>
        <p><b>Order ID:</b> {order.orderId}</p>
        <p><b>Date:</b> {new Date(order.createdAt).toLocaleString()}</p>
        <p><b>Total Amount:</b> ₹{order.total}</p>
        <p><b>Status:</b> {order.status}</p>
      </div>

      <div style={styles.box}>
        <h3>Shipping To:</h3>
        <p>{order.shippingAddress?.fullName}</p>
        <p>{order.shippingAddress?.house}, {order.shippingAddress?.area}</p>
        <p>{order.shippingAddress?.city} - {order.shippingAddress?.pincode}</p>
        <p>Phone: {order.shippingAddress?.mobile}</p>
      </div>

      <Link to="/track-order" style={styles.trackBtn}>
        🚚 Track Your Order
      </Link>

      <Link to="/" style={styles.link}>
        Continue Shopping
      </Link>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "50px auto",
    padding: "20px",
    textAlign: "center"
  },
  box: {
    margin: "20px 0",
    padding: "15px",
    background: "#f9fafb",
    borderRadius: "8px"
  },
  link: {
    display: "inline-block",
    marginTop: "15px",
    textDecoration: "none",
    color: "white",
    background: "#2563eb",
    padding: "10px 20px",
    borderRadius: "6px"
  },
  trackBtn: {
    display: "block",
    margin: "20px auto",
    textDecoration: "none",
    color: "white",
    background: "#16a34a",
    padding: "12px 24px",
    borderRadius: "6px",
    fontWeight: "bold"
  }
};

export default OrderConfirmation;
