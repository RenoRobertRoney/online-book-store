import { Link } from "react-router-dom";

function OrderConfirmation() {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const lastOrder = orders[orders.length - 1];
  const shipping = JSON.parse(localStorage.getItem("shipping"));

  if (!lastOrder) {
    return <h2 style={{ padding: "40px" }}>No order found</h2>;
  }

  return (
    <div style={styles.container}>
      <h1>🎉 Order Confirmed</h1>
      <p>Your books are on the way!</p>

      <div style={styles.box}>
        <p><b>Order ID:</b> {lastOrder.orderId}</p>
        <p><b>Order Date:</b> {lastOrder.orderDate}</p>
        <p><b>Estimated Delivery:</b> {lastOrder.estimatedDelivery}</p>
        <p><b>Total Paid:</b> ₹{lastOrder.total}</p>
      </div>

      <div style={styles.box}>
        <h3>Shipping Details</h3>
        <p>{shipping?.name}</p>
        <p>{shipping?.address}</p>
        <p>{shipping?.city} - {shipping?.pincode}</p>
        <p>{shipping?.phone}</p>
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
