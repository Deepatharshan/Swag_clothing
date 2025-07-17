// src/components/ClothesList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ClothesList.css"; // new CSS file

function ClothesList({ limit = 12, filterType = "clothes" }) {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClothes = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/clothes");
        const sorted = res.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        const filtered =
          filterType === "accessories"
            ? sorted.filter((item) =>
                item.name.toLowerCase().includes("accessories")
              )
            : sorted.filter(
                (item) => !item.name.toLowerCase().includes("accessories")
              );

        setItems(limit ? filtered.slice(0, limit) : filtered);
      } catch (err) {
        console.error("Failed to fetch clothes", err);
      }
    };
    fetchClothes();
  }, [limit, filterType]);

  return (
    <div className="clothes-list-container">
      {filterType === "clothes" && (
        <h2 className="clothes-title">Latest Collection</h2>
      )}
      {filterType === "accessories" && (
        <h2 className="clothes-title">Explore Accessories</h2>
      )}

      <div className="clothes-grid">
        {items.map((cloth) => (
          <div key={cloth._id} className="product">
            <div
              className="product__price"
            >${cloth.price.toFixed(0)}</div>
            <img
              src={cloth.image}
              alt={cloth.name}
              className="product__image"
              onClick={() => navigate(`/order/${cloth._id}`)}
            />
            <span className="product__category">{cloth.sizes.join(", ")}</span>
            <h3 className="product__title">{cloth.name}</h3>
            <p>{cloth.description}</p>
            <a
              href={`/order/${cloth._id}`}
              className="btn product__btn"
            >
              Buy Now
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ClothesList;
