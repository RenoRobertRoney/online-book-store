import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Payment() {
  const navigate = useNavigate();

  /* =========================
     🔐 LOGIN CHECK
  ========================= */
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      alert("Please login to continue payment");
      navigate("/login");
    }
  }, [navigate]);

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity),
    0
  );

  /* =========================
     PAYMENT STATE
  ========================= */
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [upiId, setUpiId] = useState("");
  const [bankRef, setBankRef] = useState("");

  /* =========================
     PAYMENT HANDLER
  ========================= */
  const handlePayment = () => {
    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }

    if (paymentMethod === "card" && cardNumber.length < 12) {
      alert("Enter a valid card number");
      return;
    }

    if (paymentMethod === "upi" && !upiId.includes("@")) {
      alert("Enter a valid UPI ID");
      return;
    }

    if (paymentMethod === "bank" && bankRef.length < 5) {
      alert("Enter bank reference number");
      return;
    }

    /* =========================
       ORDER CREATION
    ========================= */
    const orderDate = new Date();
    const deliveryDate = new Date();
    deliveryDate.setDate(orderDate.getDate() + 5);

    const newOrder = {
      orderId: "ORD" + Date.now(),
      orderDate: orderDate.toLocaleString(),
      estimatedDelivery: deliveryDate.toDateString(),
      items: cart,
      total,
      paymentMethod,
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
      <p>Select a payment method</p>

      <div style={styles.summary}>
        <h3>Order Summary</h3>
        <p>Total Items: {cart.length}</p>
        <p><strong>Total Amount: ₹{total}</strong></p>
      </div>

      <div style={styles.paymentBox}>
        <label>
          <input
            type="radio"
            name="payment"
            value="cod"
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Cash on Delivery
        </label>

        <label>
          <input
            type="radio"
            name="payment"
            value="card"
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Debit / Credit Card
        </label>

        {paymentMethod === "card" && (
          <input
            type="text"
            placeholder="Card Number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            style={styles.input}
          />
        )}

        <label>
          <input
            type="radio"
            name="payment"
            value="upi"
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          UPI
        </label>

        {paymentMethod === "upi" && (
          <input
            type="text"
            placeholder="example@upi"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            style={styles.input}
          />
        )}

        <label>
          <input
            type="radio"
            name="payment"
            value="bank"
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Bank Transfer
        </label>

        {paymentMethod === "bank" && (
          <input
            type="text"
            placeholder="Reference Number"
            value={bankRef}
            onChange={(e) => setBankRef(e.target.value)}
            style={styles.input}
          />
        )}
      </div>

      <button onClick={handlePayment} style={styles.payBtn}>
        Confirm & Place Order
      </button>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "520px",
    margin: "50px auto",
    padding: "25px",
    background: "#fff",
    borderRadius: "12px"
  },
  summary: {
    background: "#f3f4f6",
    padding: "15px",
    borderRadius: "8px",
    marginBottom: "20px"
  },
  paymentBox: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginBottom: "25px"
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc"
  },
  payBtn: {
    width: "100%",
    padding: "14px",
    background: "#16a34a",
    color: "white",
    border: "none",
    borderRadius: "8px"
  }
};

export default Payment;
