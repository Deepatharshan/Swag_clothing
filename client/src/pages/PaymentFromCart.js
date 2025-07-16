import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function PaymentFromCart() {
  const { items, clearCart } = useCart();
  const navigate = useNavigate();
  const total = items.reduce((sum, it) => sum + it.price * it.quantity, 0);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    countryCode: ""
  });

  const [showCardForm, setShowCardForm] = useState(false);
  const [card, setCard] = useState({
    number: "",
    holder: "",
    expiry: "",
    cvc: ""
  });

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCardChange = (e) => {
    setCard({ ...card, [e.target.name]: e.target.value });
  };

  const submitOrder = async (paymentMethod, paymentStatus) => {
    if (!form.name || !form.phone || !form.address || !form.countryCode) {
      alert("Please fill in all delivery details");
      return;
    }

    const orderData = {
      userInfo: form,
      items,
      total,
      paymentMethod,
      paymentStatus,
    };

    try {
      await axios.post("http://localhost:5000/api/orders", orderData);
      clearCart();
      const confirmed = window.confirm(
        `Order placed successfully with payment: ${paymentStatus}.\n\nClick OK to go to homepage.`
      );
      if (confirmed) {
        navigate("/");
      }
    } catch (err) {
      console.error("Submit Error:", err);
      alert("Failed to place order");
    }
  };

  const handlePayOnline = async () => {
    if (!card.number || !card.holder || !card.expiry || !card.cvc) {
      alert("Please fill in all card details");
      return;
    }
    await submitOrder("Online", "Success");
  };

  const handlePayOnShop = async () => {
    await submitOrder("OnShop", "Pending");
  };

  return (
    <div style={container}>
      <h2 style={heading}>Delivery Details</h2>

      <input name="name" placeholder="Name" value={form.name} onChange={handleFormChange} style={inputStyle} />
      <input name="phone" placeholder="Phone Number" value={form.phone} onChange={handleFormChange} style={inputStyle} />
      <input name="address" placeholder="Address" value={form.address} onChange={handleFormChange} style={inputStyle} />
      <input name="countryCode" placeholder="Country Code" value={form.countryCode} onChange={handleFormChange} style={inputStyle} />

      {/* ATM Style Card Summary */}
      <div style={atmCard}>
        <div style={atmCardHeader}>
          <span style={{ fontWeight: "bold" }}>Swag</span>
          <span>{new Date().toLocaleDateString()}</span>
        </div>
        <div style={atmCardContent}>
          <div>
            <h3 style={{ margin: 0 }}>Total: ${total.toFixed(2)}</h3>
            <ul style={{ margin: "0.5rem 0", paddingLeft: 20 }}>
              {items.map((item, i) => (
                <li key={i}>
                  {item.name} × {item.quantity}
                </li>
              ))}
            </ul>
          </div>
          <div style={{ fontSize: "0.9rem", color: "#333" }}>Secure Payment Guaranteed</div>
        </div>
      </div>

      <div style={{ marginTop: "1.5rem" }}>
        <button onClick={() => setShowCardForm(true)} style={buttonStyle}>Pay Online</button>
        <button onClick={handlePayOnShop} style={{ ...buttonStyle, marginLeft: 10 }}>Pay on Shop</button>
      </div>

      {showCardForm && (
        <div style={cardFormStyle}>
          <h3>Card Payment</h3>
          <input name="number" placeholder="Card Number" value={card.number} onChange={handleCardChange} style={inputStyle} />
          <input name="holder" placeholder="Cardholder Name" value={card.holder} onChange={handleCardChange} style={inputStyle} />
          <input name="expiry" placeholder="Expiry Date (MM/YY)" value={card.expiry} onChange={handleCardChange} style={inputStyle} />
          <input name="cvc" placeholder="CVC" value={card.cvc} onChange={handleCardChange} style={inputStyle} />
          <button onClick={handlePayOnline} style={payBtn}>Pay Now</button>
        </div>
      )}
    </div>
  );
}

// === Styles ===
const container = {
  maxWidth: 700,
  margin: "3rem auto",
  padding: "1.5rem",
  fontFamily: "'Segoe UI', sans-serif",
  backgroundColor: "#fff"
};

const heading = {
  textAlign: "center",
  marginBottom: "1.5rem"
};

const inputStyle = {
  width: "100%",
  marginBottom: "0.8rem",
  padding: "0.6rem",
  fontSize: "1rem",
  borderRadius: "6px",
  border: "1px solid #ccc"
};

const buttonStyle = {
  padding: "0.6rem 1.2rem",
  fontSize: "1rem",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

const cardFormStyle = {
  marginTop: "2rem",
  padding: "1rem",
  border: "1px solid #ddd",
  borderRadius: "8px",
  backgroundColor: "#f9f9f9"
};

const payBtn = {
  ...buttonStyle,
  backgroundColor: "#28a745",
  marginTop: "1rem"
};

const atmCard = {
  background: "linear-gradient(145deg, #FFD700, #f1c40f)",
  padding: "1.5rem",
  borderRadius: "15px",
  color: "#000",
  boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
  marginTop: "2rem"
};

const atmCardHeader = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "1rem",
  fontSize: "1rem"
};

const atmCardContent = {
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem"
};
