import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Checkout() {
  const navigate = useNavigate();

  const [shipping, setShipping] = useState({
    name: "",
    address: "",
    city: "",
    pincode: "",
    phone: ""
  });

  const handleChange = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !shipping.name ||
      !shipping.address ||
      !shipping.city ||
      !shipping.pincode ||
      !shipping.phone
    ) {
      alert("Please fill all shipping details");
      return;
    }

    localStorage.setItem("shipping", JSON.stringify(shipping));
    navigate("/payment");
  };

  return (
    <div style={styles.container}>
      <h1>Checkout</h1>
      <p>Enter your shipping details</p>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input name="name" placeholder="Full Name" onChange={handleChange} />
        <input name="address" placeholder="Address" onChange={handleChange} />
        <input name="city" placeholder="City" onChange={handleChange} />
        <input name="pincode" placeholder="Pincode" onChange={handleChange} />
        <input name="phone" placeholder="Phone Number" onChange={handleChange} />

        <button type="submit">Proceed to Payment</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "500px",
    margin: "50px auto",
    padding: "20px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  }
};

export default Checkout;
