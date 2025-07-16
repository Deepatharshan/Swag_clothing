import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const { items, updateItem, removeItem, clearCart } = useCart();
  const navigate = useNavigate();

  const total = items.reduce((sum, it) => sum + it.price * it.quantity, 0);

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>🛒 Your Cart</h2>

      {items.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "2rem" }}>Your cart is empty.</p>
      ) : (
        <>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th>Item</th>
                <th>Size</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it, i) => (
                <tr key={i}>
                  <td style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <img src={it.image} alt={it.name} style={imageStyle} />
                    <span>{it.name}</span>
                  </td>
                  <td>
                    <select
                      value={it.size}
                      onChange={(e) => updateItem(i, { size: e.target.value })}
                      style={selectStyle}
                    >
                      <option>{it.size}</option>
                    </select>
                  </td>
                  <td>
                    <div style={qtyStyle}>
                      <button
                        onClick={() => updateItem(i, { quantity: it.quantity - 1 > 0 ? it.quantity - 1 : 1 })}
                        style={qtyBtn}
                      >−</button>
                      <span style={{ margin: "0 8px" }}>{it.quantity}</span>
                      <button
                        onClick={() => updateItem(i, { quantity: it.quantity + 1 })}
                        style={qtyBtn}
                      >+</button>
                    </div>
                  </td>
                  <td>${it.price.toFixed(2)}</td>
                  <td>${(it.price * it.quantity).toFixed(2)}</td>
                  <td>
                    <button onClick={() => removeItem(i)} style={removeBtn}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 style={{ textAlign: "right", marginTop: "1.5rem" }}>Total: ${total.toFixed(2)}</h3>

          <div style={{ textAlign: "right", marginTop: "1rem" }}>
            <button onClick={() => navigate("/payment-from-cart")} style={payNowBtn}>Pay Now</button>
            <button onClick={() => clearCart()} style={clearBtn}>Clear Cart</button>
          </div>
        </>
      )}
    </div>
  );
}

// === Styles ===
const containerStyle = {
  maxWidth: 900,
  margin: "2rem auto",
  padding: "1rem",
  fontFamily: "Segoe UI, sans-serif",
  backgroundColor: "#fff",
  boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  borderRadius: "10px"
};

const headingStyle = {
  textAlign: "center",
  marginBottom: "1.5rem"
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  textAlign: "center"
};

const imageStyle = {
  width: 60,
  height: 60,
  objectFit: "cover",
  borderRadius: "6px"
};

const selectStyle = {
  padding: "4px 8px",
  borderRadius: "5px",
  border: "1px solid #ccc"
};

const qtyStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

const qtyBtn = {
  padding: "4px 10px",
  fontSize: "1rem",
  cursor: "pointer",
  borderRadius: "5px",
  border: "1px solid #007bff",
  backgroundColor: "#f0f8ff"
};

const removeBtn = {
  backgroundColor: "#dc3545",
  color: "#fff",
  border: "none",
  padding: "6px 12px",
  borderRadius: "6px",
  cursor: "pointer"
};

const payNowBtn = {
  backgroundColor: "#28a745",
  color: "#fff",
  border: "none",
  padding: "10px 18px",
  borderRadius: "6px",
  marginRight: "10px",
  cursor: "pointer"
};

const clearBtn = {
  backgroundColor: "#6c757d",
  color: "#fff",
  border: "none",
  padding: "10px 18px",
  borderRadius: "6px",
  cursor: "pointer"
};
