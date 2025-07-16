import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    <div style={{ maxWidth: 1200, margin: "2rem auto", padding: "0 1rem" }}>
      {filterType === "clothes" && (
        <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          Latest Collection
        </h2>
      )}
      {filterType === "accessories" && (
        <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          Explore Accessories
        </h2>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {items.map((cloth) => (
          <div
            key={cloth._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: 10,
              overflow: "hidden",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              backgroundColor: "#fff",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.03)";
              e.currentTarget.style.boxShadow =
                "0 8px 20px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow =
                "0 2px 8px rgba(0,0,0,0.1)";
            }}
          >
            <img
              src={cloth.image}
              alt={cloth.name}
              onClick={() => navigate(`/order/${cloth._id}`)}
              style={{
                width: "100%",
                height: "250px",
                objectFit: "cover",
              }}
            />
            <div style={{ padding: "0.8rem" }}>
              <h3 style={{ margin: "0.5rem 0" }}>{cloth.name}</h3>
              <p style={{ margin: "0.3rem 0" }}>
                <strong>Price:</strong> ${cloth.price.toFixed(2)}
              </p>
              <p style={{ margin: "0.3rem 0" }}>
                <strong>Sizes:</strong> {cloth.sizes.join(", ")}
              </p>
              <p style={{ fontSize: "0.9rem", color: "#555" }}>
                {cloth.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ClothesList;
