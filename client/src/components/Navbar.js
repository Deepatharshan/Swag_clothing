import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { FaShoppingCart, FaUserCircle, FaSearch } from "react-icons/fa";
import "./Navbar.css";

function Navbar() {
  const { items } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const totalCount = items.reduce((sum, it) => sum + it.quantity, 0);

  const handleLogout = () => {
    logout();
    navigate("/"); // redirect to home after logout
  };

  return (
    <nav className="navbar">
      <h1 className="logo">Swag</h1>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/collection">Collection</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/Myorders">Feed Back</Link></li>
      </ul>

      <div className="nav-icons">
        <Link to="/search" className="icon" title="Search">
          <FaSearch />
        </Link>

        {user ? (
          <div className="profile-section">
            <FaUserCircle className="profile-icon" />
            <span className="username">{user.name}</span>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <Link to="/auth" className="auth-btn">Sign In / Register</Link>
        )}

        <Link to="/cart" className="icon" title="Cart">
          <FaShoppingCart />
          {totalCount > 0 && <span className="cart-count">{totalCount}</span>}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
