import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();

  const addresses = JSON.parse(localStorage.getItem("addresses")) || [];

  const defaultAddress =
    addresses.find((addr) => addr.default) || addresses[0];

  const [selectedAddressId, setSelectedAddressId] = useState(
    defaultAddress ? defaultAddress.id : null
  );

  /* ✅ FIXED useEffect dependency */
  useEffect(() => {
    if (defaultAddress) {
      localStorage.setItem(
        "selectedAddress",
        JSON.stringify(defaultAddress)
      );
    }
  }, [defaultAddress]);

  const handleContinue = () => {
    if (!selectedAddressId) {
      alert("Please select a delivery address");
      return;
    }

    const selected = addresses.find(
      (addr) => addr.id === selectedAddressId
    );

    localStorage.setItem("selectedAddress", JSON.stringify(selected));
    navigate("/payment");
  };

  return (
    <div style={styles.page}>
      <h1>Checkout</h1>

      <h2 style={styles.subHeading}>Select Delivery Address</h2>

      {addresses.length === 0 ? (
        <p>No address found. Please add one in Settings.</p>
      ) : (
        addresses.map((addr) => (
          <label key={addr.id} style={styles.addressCard}>
            <input
              type="radio"
              name="address"
              checked={selectedAddressId === addr.id}
              onChange={() => setSelectedAddressId(addr.id)}
            />

            <div style={styles.addressText}>
              <strong>{addr.fullName}</strong> ({addr.mobile}) <br />
              {addr.house}, {addr.area} <br />
              {addr.city}, {addr.state} – {addr.pincode} <br />
              {addr.country}
              {addr.default && (
                <span style={styles.defaultBadge}>Default</span>
              )}
            </div>
          </label>
        ))
      )}

      <button style={styles.payBtn} onClick={handleContinue}>
        Continue to Payment
      </button>
    </div>
  );
}

/* ================= STYLES ================= */
const styles = {
  page: {
    maxWidth: "900px",
    margin: "40px auto",
    padding: "20px"
  },
  subHeading: {
    marginTop: "30px",
    marginBottom: "15px"
  },
  addressCard: {
    display: "flex",
    gap: "12px",
    alignItems: "flex-start",
    background: "#f9fafb",
    padding: "15px",
    borderRadius: "8px",
    marginBottom: "12px",
    border: "1px solid #e5e7eb",
    cursor: "pointer"
  },
  addressText: {
    lineHeight: "1.6"
  },
  defaultBadge: {
    marginLeft: "10px",
    background: "#dcfce7",
    color: "#166534",
    padding: "2px 8px",
    borderRadius: "6px",
    fontSize: "12px"
  },
  payBtn: {
    width: "100%",
    marginTop: "30px",
    padding: "14px",
    fontSize: "16px",
    background: "#1f4037",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  }
};

export default Checkout;
