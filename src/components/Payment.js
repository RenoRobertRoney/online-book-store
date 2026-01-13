import { useNavigate } from "react-router-dom";

function Payment() {
  const navigate = useNavigate();

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity),
    0
  );

  const handlePayment = () => {
    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    const orderDate = new Date();
    const deliveryDate = new Date();
    deliveryDate.setDate(orderDate.getDate() + 5); // 5-day delivery

    const newOrder = {
      orderId: "ORD" + Date.now(),
      orderDate: orderDate.toLocaleString(),
      estimatedDelivery: deliveryDate.toDateString(),
      items: cart,
      total,

      // 🚚 TRACKING SYSTEM
      status: "Order Packed",
      trackingSteps: [
        { step: "Order Packed", completed: true },
        { step: "Shipped", completed: false },
        { step: "Out for Delivery", completed: false },
        { step: "Delivered", completed: false }
      ]
    };

    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(newOrder);

    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.removeItem("cart");

    navigate("/order-confirmation");
  };

  return (
    <div style={styles.container}>
      <h1>Payment</h1>
      <p>Please confirm your order</p>

      <div style={styles.summary}>
        <h3>Order Summary</h3>
        <p>Total Items: {cart.length}</p>
        <p><strong>Total Amount: ₹{total}</strong></p>
      </div>

      <button onClick={handlePayment} style={styles.payBtn}>
        Confirm & Place Order
      </button>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "500px",
    margin: "50px auto",
    padding: "20px"
  },
  summary: {
    background: "#f3f4f6",
    padding: "15px",
    borderRadius: "8px",
    marginBottom: "20px"
  },
  payBtn: {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    background: "#16a34a",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  }
};

export default Payment;
