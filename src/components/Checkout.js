import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Checkout() {
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    if (user && token) {
      axios.get(`http://localhost:5000/api/users/address`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => setAddresses(res.data))
        .catch(err => console.error(err));
    }
  }, []);

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
        <div style={styles.emptyCard}>
          <p>No addresses found. Please add a delivery address to continue.</p>
          <button style={styles.addBtn} onClick={() => navigate("/add-address")}>
            ➕ Add New Address
          </button>
        </div>
      ) : (
        <>
          {addresses.map((addr) => (
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
          ))}
          <button style={styles.addBtnSmall} onClick={() => navigate("/add-address")}>
            + Add Another Address
          </button>
        </>
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
  },
  addBtn: {
    padding: "12px 20px",
    background: "#1f4037",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "10px",
    fontSize: "16px"
  },
  addBtnSmall: {
    background: "none",
    border: "none",
    color: "#1f4037",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    textDecoration: "underline",
    marginBottom: "20px"
  },
  emptyCard: {
    textAlign: "center",
    padding: "30px",
    background: "#f9fafb",
    border: "1px dashed #ccc",
    borderRadius: "8px",
    marginBottom: "20px"
  }
};

export default Checkout;
