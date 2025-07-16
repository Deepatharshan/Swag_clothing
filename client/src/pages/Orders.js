import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "./Admin.css"; // Reuse Admin styles for sidebar
import "./Orders.css"; // Specific styles for orders table

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/orders");
      setOrders(res.data);
    } catch (err) {
      alert("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>SWAG</h2>
        <ul>
          <li
            onClick={() => navigate("/admin/dashboard")}
            className={location.pathname === "/admin/dashboard" ? "active" : ""}
          >
            Dashboard
          </li>
          <li
            onClick={() => navigate("/admin")}
            className={location.pathname === "/admin" ? "active" : ""}
          >
            Add Product
          </li>
          <li
            onClick={() => navigate("/admin/orders")}
            className={location.pathname === "/admin/orders" ? "active" : ""}
          >
            Orders
          </li>
          <li
            onClick={() => navigate("/finance")}
            className={location.pathname === "/finance" ? "active" : ""}
          >
            Finance
          </li>
          <li
            onClick={() => navigate("/admin/petty-cash")}
            className={location.pathname === "/admin/petty-cash" ? "active" : ""}
          >
            Petty Cash
          </li>
          <li className="logout" onClick={() => navigate("/")}>Logout</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <h2>All Orders</h2>

        {loading ? (
          <p>Loading orders...</p>
        ) : orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <table className="orders-table">
            <thead>
              <tr>
                <th>#</th>
                <th>User Info</th>
                <th>Items</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, idx) => (
                <tr key={order._id}>
                  <td>{idx + 1}</td>
                  <td>
                    {order.userInfo?.name}<br />
                    {order.userInfo?.phone}<br />
                    {order.userInfo?.address}<br />
                    {order.userInfo?.countryCode}
                  </td>
                  <td>
                    <ul style={{ paddingLeft: 20, margin: 0 }}>
                      {order.items.map((item, i) => (
                        <li key={i}>
                          {item.name} (x{item.quantity}) - {item.size}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>${order.total.toFixed(2)}</td>
                  <td>{order.paymentMethod}</td>
                  <td>{order.paymentStatus}</td>
                  <td>{new Date(order.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
}

export default Orders;
