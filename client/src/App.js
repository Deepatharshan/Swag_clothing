import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Chatbot from "./components/Chatbot"; // ✅ Import Chatbot

import Home from "./pages/Home";
import OrderPage from "./pages/OrderPage";
import CartPage from "./pages/CartPage";
import PaymentFromCart from "./pages/PaymentFromCart";
import Admin from "./pages/Admin";
import Orders from "./pages/Orders";
import FinancePage from "./pages/FinancePage";
import Collection from "./pages/Collection";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

function AppContent() {
  const location = useLocation();

  // Hide Navbar and Chatbot on admin-like pages
  const hideForAdminPages =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/orders") ||
    location.pathname.startsWith("/finance") ||
    location.pathname.startsWith("/auth")||
    location.pathname.startsWith("/dashboard");

  return (
    <>
      {!hideForAdminPages && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/order/:id" element={<OrderPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/payment-from-cart" element={<PaymentFromCart />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/finance" element={<FinancePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>

      {/* ✅ Show chatbot on customer pages only */}
      {!hideForAdminPages && <Chatbot />}
    </>
  );
}

export default App;
