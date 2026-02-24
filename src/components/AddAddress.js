import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddAddress() {
    const navigate = useNavigate();
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

    const [loading, setLoading] = useState(false);

    const handleAddAddress = async (e) => {
        e.preventDefault();
        if (!newAddress.fullName || !newAddress.mobile || !newAddress.pincode) {
            alert("Please fill required fields");
            return;
        }

        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            alert("Please login");
            navigate("/login");
            return;
        }

        setLoading(true);
        try {
            const addressToAdd = {
                id: Date.now().toString(),
                ...newAddress
            };
            const token = localStorage.getItem("token");
            await axios.post("http://localhost:5000/api/users/address/add", {
                address: addressToAdd
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            alert("Address added successfully!");
            navigate("/checkout");
        } catch (err) {
            console.error("Error adding address", err);
            alert("Failed to add address");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.page}>
            <div style={styles.card}>
                <h2>📍 Add Delivery Address</h2>
                <p>Please enter your shipping details</p>

                <form onSubmit={handleAddAddress}>
                    <select
                        style={styles.input}
                        value={newAddress.country}
                        onChange={(e) =>
                            setNewAddress({ ...newAddress, country: e.target.value })
                        }
                    >
                        <option>India</option>
                    </select>

                    <input
                        style={styles.input}
                        placeholder="Full Name *"
                        value={newAddress.fullName}
                        onChange={(e) =>
                            setNewAddress({ ...newAddress, fullName: e.target.value })
                        }
                        required
                    />

                    <input
                        style={styles.input}
                        placeholder="Mobile Number *"
                        value={newAddress.mobile}
                        onChange={(e) =>
                            setNewAddress({ ...newAddress, mobile: e.target.value })
                        }
                        required
                    />

                    <input
                        style={styles.input}
                        placeholder="Pincode *"
                        value={newAddress.pincode}
                        onChange={(e) =>
                            setNewAddress({ ...newAddress, pincode: e.target.value })
                        }
                        required
                    />

                    <input
                        style={styles.input}
                        placeholder="Flat / House / Building"
                        value={newAddress.house}
                        onChange={(e) =>
                            setNewAddress({ ...newAddress, house: e.target.value })
                        }
                    />

                    <input
                        style={styles.input}
                        placeholder="Area / Street"
                        value={newAddress.area}
                        onChange={(e) =>
                            setNewAddress({ ...newAddress, area: e.target.value })
                        }
                    />

                    <input
                        style={styles.input}
                        placeholder="Landmark"
                        value={newAddress.landmark}
                        onChange={(e) =>
                            setNewAddress({ ...newAddress, landmark: e.target.value })
                        }
                    />

                    <input
                        style={styles.input}
                        placeholder="City"
                        value={newAddress.city}
                        onChange={(e) =>
                            setNewAddress({ ...newAddress, city: e.target.value })
                        }
                    />

                    <input
                        style={styles.input}
                        placeholder="State"
                        value={newAddress.state}
                        onChange={(e) =>
                            setNewAddress({ ...newAddress, state: e.target.value })
                        }
                    />

                    <div style={styles.btnGroup}>
                        <button
                            type="button"
                            style={styles.cancelBtn}
                            onClick={() => navigate("/checkout")}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            style={styles.saveBtn}
                        >
                            {loading ? "Saving..." : "Save and Continue"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

const styles = {
    page: { background: "#f4f6f9", minHeight: "80vh", padding: "40px", display: "flex", justifyContent: "center", alignItems: "center" },
    card: {
        width: "100%",
        maxWidth: "500px",
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
        border: "1px solid #d1d5db",
        boxSizing: "border-box"
    },
    btnGroup: {
        display: "flex",
        gap: "10px",
        marginTop: "10px"
    },
    saveBtn: {
        flex: 2,
        padding: "12px",
        background: "#1f4037",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "bold"
    },
    cancelBtn: {
        flex: 1,
        padding: "12px",
        background: "#e5e7eb",
        color: "#374151",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer"
    }
};

export default AddAddress;
