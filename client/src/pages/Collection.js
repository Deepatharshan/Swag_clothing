// src/pages/Collection.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Collection.css";

function Collection() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const navigate = useNavigate();

  const categories = ["All", "Men", "Girls", "Sportswear", "Accessories"];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/clothes");
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  const getCategory = (name) => {
    const lower = name.toLowerCase();
    if (lower.includes("men")) return "Men";
    if (lower.includes("girl")) return "Girls";
    if (lower.includes("sport")) return "Sportswear";
    if (lower.includes("accessory") || lower.includes("accessories")) return "Accessories";
    return "Others";
  };

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((item) => getCategory(item.name) === selectedCategory);

  return (
    <div className="collection-page">
      <h2>Our Collection</h2>

      <div className="filter-buttons">
        {categories.map((cat) => (
          <button
            key={cat}
            className={selectedCategory === cat ? "active" : ""}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div className="product-card" key={product._id}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p><strong>Price:</strong> ${product.price}</p>
            <p><strong>Sizes:</strong> {product.sizes.join(", ")}</p>
            <button onClick={() => navigate(`/order/${product._id}`)}>
              Order Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Collection;
