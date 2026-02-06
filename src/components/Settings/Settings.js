import { useState, useEffect } from "react";

function Settings() {
  const [activeTab, setActiveTab] = useState("profile");

  /* ================= PROFILE ================= */
  const [profile, setProfile] = useState(
    JSON.parse(localStorage.getItem("profile")) || {
      username: "",
      email: "",
      phone: ""
    }
  );

  /* ================= ADDRESSES ================= */
  const [addresses, setAddresses] = useState(
    JSON.parse(localStorage.getItem("addresses")) || []
  );

  const [newAddress, setNewAddress] = useState({
    country: "India",
    fullName: "",
    mobile: "",
    pincode: "",
    house: "",
    area: "",
    landmark: "",
    city: "",
    state: ""
  });

  /* ================= PASSWORD ================= */
  const [password, setPassword] = useState({
    username: "",
    newPass: "",
    confirm: ""
  });

  /* ================= SAVE ADDRESSES ================= */
  useEffect(() => {
    localStorage.setItem("addresses", JSON.stringify(addresses));
  }, [addresses]);

  /* ================= HANDLERS ================= */
  const saveProfile = () => {
    localStorage.setItem("profile", JSON.stringify(profile));
    alert("Profile updated successfully");
  };

  const addAddress = () => {
    if (!newAddress.fullName || !newAddress.mobile || !newAddress.pincode) {
      alert("Please fill required fields");
      return;
    }

    setAddresses([
      ...addresses,
      {
        id: Date.now(),
        ...newAddress,
        default: addresses.length === 0
      }
    ]);

    setNewAddress({
      country: "India",
      fullName: "",
      mobile: "",
      pincode: "",
      house: "",
      area: "",
      landmark: "",
      city: "",
      state: ""
    });
  };

  const setDefaultAddress = (id) => {
    setAddresses(
      addresses.map((addr) => ({
        ...addr,
        default: addr.id === id
      }))
    );
  };

  const deleteAddress = (id) => {
    setAddresses(addresses.filter((addr) => addr.id !== id));
  };

  const changePassword = () => {
    if (!password.username || !password.newPass) {
      alert("Fill all fields");
      return;
    }

    if (password.newPass !== password.confirm) {
      alert("Password mismatch");
      return;
    }

    setProfile({ ...profile, username: password.username });
    localStorage.setItem(
      "profile",
      JSON.stringify({ ...profile, username: password.username })
    );

    alert("Username & Password updated successfully");
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>⚙️ Account Settings</h1>

      <div style={styles.layout}>
        {/* ================= SIDEBAR ================= */}
        <div style={styles.sidebar}>
          <button
            style={activeTab === "profile" ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab("profile")}
          >
            👤 Profile
          </button>

          <button
            style={activeTab === "address" ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab("address")}
          >
            🏠 Address
          </button>

          <button
            style={activeTab === "password" ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab("password")}
          >
            🔐 Security
          </button>

          <button
            style={activeTab === "contact" ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab("contact")}
          >
            📞 Contact
          </button>
        </div>

        {/* ================= CONTENT ================= */}
        <div style={styles.card}>
          {/* PROFILE */}
          {activeTab === "profile" && (
            <>
              <h2>Edit Profile</h2>
              <input
                style={styles.input}
                placeholder="Username"
                value={profile.username}
                onChange={(e) =>
                  setProfile({ ...profile, username: e.target.value })
                }
              />
              <input
                style={styles.input}
                placeholder="Email"
                value={profile.email}
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
              />
              <input
                style={styles.input}
                placeholder="Phone"
                value={profile.phone}
                onChange={(e) =>
                  setProfile({ ...profile, phone: e.target.value })
                }
              />
              <button style={styles.primaryBtn} onClick={saveProfile}>
                Save Profile
              </button>
            </>
          )}

          {/* ADDRESS */}
          {activeTab === "address" && (
            <>
              <h2>Delivery Addresses</h2>

              {addresses.map((addr) => (
                <div key={addr.id} style={styles.addressCard}>
                  <p>
                    <b>{addr.fullName}</b> ({addr.mobile}) <br />
                    {addr.house}, {addr.area}, {addr.city}, {addr.state} –{" "}
                    {addr.pincode}
                  </p>

                  <div style={styles.addrActions}>
                    {!addr.default && (
                      <button
                        style={styles.linkBtn}
                        onClick={() => setDefaultAddress(addr.id)}
                      >
                        Set Default
                      </button>
                    )}
                    <button
                      style={styles.deleteBtn}
                      onClick={() => deleteAddress(addr.id)}
                    >
                      Delete
                    </button>
                  </div>

                  {addr.default && (
                    <span style={styles.defaultBadge}>Default</span>
                  )}
                </div>
              ))}

              <h3>Add New Address</h3>

              <select
                style={styles.input}
                value={newAddress.country}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, country: e.target.value })
                }
              >
                <option>India</option>
              </select>

              <input style={styles.input} placeholder="Full Name"
                value={newAddress.fullName}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, fullName: e.target.value })
                }
              />

              <input style={styles.input} placeholder="Mobile Number"
                value={newAddress.mobile}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, mobile: e.target.value })
                }
              />

              <input style={styles.input} placeholder="Pincode"
                value={newAddress.pincode}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, pincode: e.target.value })
                }
              />

              <input style={styles.input} placeholder="Flat / House / Building"
                value={newAddress.house}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, house: e.target.value })
                }
              />

              <input style={styles.input} placeholder="Area / Street"
                value={newAddress.area}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, area: e.target.value })
                }
              />

              <input style={styles.input} placeholder="Landmark"
                value={newAddress.landmark}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, landmark: e.target.value })
                }
              />

              <input style={styles.input} placeholder="City"
                value={newAddress.city}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, city: e.target.value })
                }
              />

              <input style={styles.input} placeholder="State"
                value={newAddress.state}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, state: e.target.value })
                }
              />

              <button style={styles.primaryBtn} onClick={addAddress}>
                Save Address
              </button>
            </>
          )}

          {/* PASSWORD */}
          {activeTab === "password" && (
            <>
              <h2>Security Settings</h2>
              <input style={styles.input} placeholder="New Username"
                onChange={(e) =>
                  setPassword({ ...password, username: e.target.value })
                }
              />
              <input style={styles.input} type="password" placeholder="New Password"
                onChange={(e) =>
                  setPassword({ ...password, newPass: e.target.value })
                }
              />
              <input style={styles.input} type="password" placeholder="Confirm Password"
                onChange={(e) =>
                  setPassword({ ...password, confirm: e.target.value })
                }
              />
              <button style={styles.primaryBtn} onClick={changePassword}>
                Update Security
              </button>
            </>
          )}

          {/* CONTACT */}
          {activeTab === "contact" && (
            <>
              <h2>Contact Support</h2>
              <p>📧 support@bookstore.com</p>
              <p>📞 +91 9997770001</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */
const styles = {
  page: { background: "#f4f6f9", minHeight: "100vh", padding: "40px" },
  title: { textAlign: "center", marginBottom: "30px" },
  layout: { display: "flex", gap: "25px", maxWidth: "1200px", margin: "auto" },
  sidebar: {
    width: "230px",
    background: "#ffffff",
    borderRadius: "12px",
    padding: "15px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)"
  },
  tab: {
    padding: "12px",
    border: "none",
    background: "#f3f4f6",
    borderRadius: "8px",
    marginBottom: "10px",
    cursor: "pointer",
    textAlign: "left"
  },
  activeTab: {
    padding: "12px",
    border: "none",
    background: "#1f4037",
    color: "#fff",
    borderRadius: "8px",
    marginBottom: "10px",
    cursor: "pointer",
    textAlign: "left"
  },
  card: {
    flex: 1,
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.1)"
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "6px",
    border: "1px solid #d1d5db"
  },
  primaryBtn: {
    padding: "12px 20px",
    background: "#1f4037",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "10px"
  },
  addressCard: {
    border: "1px solid #e5e7eb",
    padding: "15px",
    borderRadius: "8px",
    marginBottom: "12px",
    position: "relative"
  },
  addrActions: { display: "flex", gap: "10px", marginTop: "8px" },
  linkBtn: {
    background: "transparent",
    border: "none",
    color: "#2563eb",
    cursor: "pointer"
  },
  deleteBtn: {
    background: "transparent",
    border: "none",
    color: "#dc2626",
    cursor: "pointer"
  },
  defaultBadge: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "#dcfce7",
    color: "#166534",
    padding: "4px 8px",
    borderRadius: "6px",
    fontSize: "12px"
  }
};

export default Settings;
