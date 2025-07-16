import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Admin.css";
import { useNavigate, useLocation } from "react-router-dom";

const defaultForm = {
  name: "",
  price: "",
  sizes: "",
  description: "",
  image: "",
};

function Admin() {
  const [formData, setFormData] = useState(defaultForm);
  const [clothes, setClothes] = useState([]);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchClothes();
  }, []);

  const fetchClothes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/clothes");
      setClothes(res.data);
    } catch (err) {
      alert("Failed to fetch clothes");
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      if (file) reader.readAsDataURL(file);
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.image) {
      alert("Please fill name, price and select image");
      return;
    }

    const payload = {
      ...formData,
      price: parseFloat(formData.price),
      sizes: formData.sizes.split(",").map((s) => s.trim()),
    };

    setLoading(true);
    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/clothes/${editId}`, payload);
        alert("Updated successfully");
      } else {
        await axios.post("http://localhost:5000/api/clothes", payload);
        alert("Added successfully");
      }
      setFormData(defaultForm);
      setEditId(null);
      fetchClothes();
    } catch (err) {
      alert("Error saving data");
    }
    setLoading(false);
  };

  const handleEdit = (cloth) => {
    setEditId(cloth._id);
    setFormData({
      name: cloth.name,
      price: cloth.price,
      sizes: cloth.sizes.join(", "),
      description: cloth.description,
      image: cloth.image,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this cloth?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/clothes/${id}`);
      fetchClothes();
    } catch (err) {
      alert("Failed to delete");
    }
  };

  return (
    <div className="admin-container">
      <aside className="sidebar">
        <h2>SWAG</h2>
        <ul>
          <li>Dashboard</li>
          <li className={location.pathname === "/admin" ? "active" : ""}>Add Product</li>
          <li onClick={() => navigate("/orders")} className={location.pathname === "/orders" ? "active" : ""}>
            Orders
          </li>
          <li onClick={() => navigate("/finance")} className={location.pathname === "/finance" ? "active" : ""}>
            Finance
          </li>
          <li>Petty Cash</li>
          <li className="logout">Logout</li>
        </ul>
      </aside>

      <main className="admin-main">
        <h2>{editId ? "Edit Product" : "Add New Product"}</h2>

        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-row">
            <input name="name" placeholder="Name *" value={formData.name} onChange={handleChange} />
            <input name="price" type="number" placeholder="Price *" value={formData.price} onChange={handleChange} />
          </div>
          <input name="sizes" placeholder="Sizes (comma separated)" value={formData.sizes} onChange={handleChange} />
          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
          <input name="image" type="file" accept="image/*" onChange={handleChange} />
          {formData.image && (
            <img src={formData.image} alt="preview" className="preview-img" />
          )}
          <div>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Saving..." : editId ? "Update Product" : "Add Product"}
            </button>
            {editId && (
              <button
                type="button"
                className="btn-secondary"
                onClick={() => {
                  setFormData(defaultForm);
                  setEditId(null);
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <h3>Product List</h3>
        <table className="product-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Sizes</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {clothes.map((cloth) => (
              <tr key={cloth._id}>
                <td><img src={cloth.image} alt={cloth.name} className="table-img" /></td>
                <td>{cloth.name}</td>
                <td>${cloth.price.toFixed(2)}</td>
                <td>{cloth.sizes.join(", ")}</td>
                <td>{cloth.description}</td>
                <td>
                  <button onClick={() => handleEdit(cloth)} className="btn-small">Edit</button>
                  <button onClick={() => handleDelete(cloth._id)} className="btn-small btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default Admin;
