import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Admin.css"; // Sidebar styles
import "./Finance.css"; // Page-specific styles
import { useNavigate, useLocation } from "react-router-dom";

const defaultForm = { type: "Expense", amount: "", description: "" };

function FinancePage() {
  const [form, setForm] = useState(defaultForm);
  const [entries, setEntries] = useState([]);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/finance");
      setEntries(res.data);
    } catch {
      alert("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, amount: parseFloat(form.amount) };

    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/finance/${editId}`, payload);
        alert("Updated");
      } else {
        await axios.post("http://localhost:5000/api/finance", payload);
        alert("Added");
      }
      setForm(defaultForm);
      setEditId(null);
      fetchEntries();
    } catch {
      alert("Submit failed");
    }
  };

  const handleEdit = (entry) => {
    setForm({
      type: entry.type,
      amount: entry.amount,
      description: entry.description,
    });
    setEditId(entry._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this record?")) return;
    await axios.delete(`http://localhost:5000/api/finance/${id}`);
    fetchEntries();
  };

  const totalIncome = entries
    .filter((e) => e.type === "Income")
    .reduce((sum, e) => sum + e.amount, 0);
  const totalExpense = entries
    .filter((e) => e.type === "Expense")
    .reduce((sum, e) => sum + e.amount, 0);
  const balance = totalIncome - totalExpense;

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>SWAG</h2>
        <ul>
          <li onClick={() => navigate("/admin/dashboard")} className={location.pathname === "/admin/dashboard" ? "active" : ""}>Dashboard</li>
          <li onClick={() => navigate("/admin")} className={location.pathname === "/admin" ? "active" : ""}>Add Product</li>
          <li onClick={() => navigate("/orders")} className={location.pathname === "/orders" ? "active" : ""}>Orders</li>
          <li onClick={() => navigate("/admin/finance")} className={location.pathname === "/admin/finance" ? "active" : ""}>Finance</li>
          <li onClick={() => navigate("/admin/petty-cash")} className={location.pathname === "/admin/petty-cash" ? "active" : ""}>Petty Cash</li>
          <li className="logout" onClick={() => navigate("/")}>Logout</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <h2>Finance Management</h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="finance-form">
          <select name="type" value={form.type} onChange={handleChange}>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
          <input
            name="amount"
            type="number"
            placeholder="Amount"
            value={form.amount}
            onChange={handleChange}
            required
          />
          <input
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
          />
          <button type="submit">{editId ? "Update" : "Add"}</button>
        </form>

        {/* Summary Cards */}
        <div className="summary-cards">
          <div className="card income">
            <h4>Total Income</h4>
            <p>${totalIncome.toFixed(2)}</p>
          </div>
          <div className="card expense">
            <h4>Total Expense</h4>
            <p>${totalExpense.toFixed(2)}</p>
          </div>
          <div className="card balance">
            <h4>Balance</h4>
            <p>${balance.toFixed(2)}</p>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="finance-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Amount</th>
                <th>Description</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry._id}>
                  <td>{entry.type}</td>
                  <td>${entry.amount.toFixed(2)}</td>
                  <td>{entry.description}</td>
                  <td>{new Date(entry.date).toLocaleDateString()}</td>
                  <td>
                    <button onClick={() => handleEdit(entry)}>Edit</button>
                    <button onClick={() => handleDelete(entry._id)} style={{ marginLeft: 8 }}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
}

export default FinancePage;
