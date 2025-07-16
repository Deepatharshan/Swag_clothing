import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function OrderPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { user } = useAuth();

  const [cloth, setCloth] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    if (!user) {
      alert("Please login to order items.");
      return navigate("/auth");
    }

    const fetchCloth = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/clothes/${id}`);
        setCloth(res.data);
        if (res.data.sizes && res.data.sizes.length > 0) {
          setSelectedSize(res.data.sizes[0]);
        }
      } catch (err) {
        console.error("Failed to fetch item", err);
      }
    };
    fetchCloth();
  }, [id, navigate, user]);

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    addItem(cloth, selectedSize, quantity);
    alert("Item added to cart!");
    navigate("/cart");
  };

  if (!cloth) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: 800, margin: "2rem auto", padding: "1rem" }}>
      <img
        src={cloth.image}
        alt={cloth.name}
        style={{ width: "100%", height: 400, objectFit: "cover", borderRadius: 8 }}
      />

      <h2 style={{ marginTop: "1rem" }}>{cloth.name}</h2>

      <table style={{ width: "100%", marginTop: 20, borderCollapse: "collapse" }}>
        <tbody>
          <tr><td style={tdLabel}>Price:</td><td>${cloth.price.toFixed(2)}</td></tr>
          <tr>
            <td style={tdLabel}>Size:</td>
            <td>
              <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
                {cloth.sizes.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <td style={tdLabel}>Quantity:</td>
            <td>
              <button onClick={decrement} style={qtyBtn}>−</button>
              <span style={{ margin: "0 10px", fontWeight: "bold" }}>{quantity}</span>
              <button onClick={increment} style={qtyBtn}>+</button>
            </td>
          </tr>
          <tr><td style={tdLabel}>Total:</td><td><strong>${(cloth.price * quantity).toFixed(2)}</strong></td></tr>
        </tbody>
      </table>

      <button style={addToCartBtn} onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
}

const tdLabel = {
  fontWeight: "bold",
  padding: "0.8rem",
  width: "30%",
  backgroundColor: "#f7f7f7",
  borderBottom: "1px solid #ddd",
  verticalAlign: "top",
};

const qtyBtn = {
  padding: "0.4rem 1rem",
  fontSize: "1.1rem",
  backgroundColor: "#f0a500",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const addToCartBtn = {
  backgroundColor: "#28a745",
  color: "#fff",
  padding: "0.75rem 1.5rem",
  border: "none",
  borderRadius: "8px",
  fontSize: "1.1rem",
  cursor: "pointer",
  marginTop: "1.5rem",
};

export default OrderPage;
