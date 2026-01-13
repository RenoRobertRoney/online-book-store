import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Payment() {
  const navigate = useNavigate();

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
      alert("Please enter a valid card number");
      return;
    }

    if (paymentMethod === "upi" && !upiId.includes("@")) {
      alert("Please enter a valid UPI ID");
      return;
    }

    if (paymentMethod === "bank" && bankRef.length < 5) {
      alert("Please enter bank transfer reference");
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

      {/* =========================
         ORDER SUMMARY
      ========================= */}
      <div style={styles.summary}>
        <h3>Order Summary</h3>
        <p>Total Items: {cart.length}</p>
        <p><strong>Total Amount: ₹{total}</strong></p>
      </div>

      {/* =========================
         PAYMENT METHODS
      ========================= */}
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
            placeholder="Enter Card Number"
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
          UPI (GPay / PhonePe / Paytm)
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
            placeholder="Bank Reference Number"
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

/* =========================
   STYLES
========================= */
const styles = {
  container: {
    maxWidth: "520px",
    margin: "50px auto",
    padding: "25px",
    background: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
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
    border: "1px solid #d1d5db"
  },
  payBtn: {
    width: "100%",
    padding: "14px",
    fontSize: "16px",
    background: "#16a34a",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  }
};

export default Payment;
