import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  AreaChart, Area, Legend
} from "recharts";
import "./Dashboard.css";

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [monthlyOrders, setMonthlyOrders] = useState([]);
  const [monthlyFinancials, setMonthlyFinancials] = useState([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const api = "http://localhost:5000/api";

      const [ordersRes, usersRes, moRes, mfRes] = await Promise.all([
        axios.get(`${api}/orders`),
        axios.get(`${api}/users`),
        axios.get(`${api}/stats/orders-per-month`),
        axios.get(`${api}/stats/finance-per-month`)
      ]);

      setOrders(ordersRes.data || []);
      setUsers(usersRes.data || []);
      setMonthlyOrders(moRes.data || []);
      setMonthlyFinancials(mfRes.data || []);
    } catch (err) {
      console.error("Dashboard load error", err);
      alert("Failed to load dashboard");
    }
  };

  const totalOrders = orders.length;
  const totalIncome = monthlyFinancials.reduce((s, m) => s + (m.income || 0), 0);
  const totalOutcome = monthlyFinancials.reduce((s, m) => s + (m.outcome || 0), 0);
  const balance = totalIncome - totalOutcome;

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">📊 Admin Dashboard</h2>

      <div className="stats-cards">
        <div className="card orders">
          <strong>Orders</strong>
          <p>{totalOrders}</p>
        </div>
        <div className="card income">
          <strong>Income</strong>
          <p>${totalIncome.toFixed(2)}</p>
        </div>
        <div className="card outcome">
          <strong>Outcome</strong>
          <p>${totalOutcome.toFixed(2)}</p>
        </div>
        <div className="card balance">
          <strong>Balance</strong>
          <p>${balance.toFixed(2)}</p>
        </div>
      </div>

      <div className="charts-wrapper">
        <div className="chart-box">
          <h3>📈 Orders per Month</h3>
          <LineChart width={700} height={320} data={monthlyOrders}>
            <XAxis dataKey="month" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="orders" 
              stroke="#007bff"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </div>

        <div className="chart-box">
          <h3>💰 Income vs Outcome</h3>
          <AreaChart width={700} height={320} data={monthlyFinancials}>
            <XAxis dataKey="month" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="income"
              stroke="#28a745"
              strokeWidth={2}
              fill="#28a74555"
            />
            <Area
              type="monotone"
              dataKey="outcome"
              stroke="#dc3545"
              strokeWidth={2}
              fill="#dc354555"
            />
          </AreaChart>
        </div>
      </div>

      <div className="users-table-wrapper">
        <h3>👥 Registered Users</h3>
        <table className="users-table">
          <thead>
            <tr><th>Name</th><th>Email</th></tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
