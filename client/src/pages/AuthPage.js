import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./AuthPage.css";

export default function AuthPage() {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({ name: "", email: "", password: "" });

  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await login(loginForm.email, loginForm.password);
      navigate("/");
    } catch (err) {
      alert(err?.response?.data?.msg || "Login failed");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await register(registerForm.name, registerForm.email, registerForm.password);
      navigate("/");
    } catch (err) {
      alert(err?.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className={`container ${isRightPanelActive ? "right-panel-active" : ""}`}>
        
        <div className="form-container sign-up-container">
          <form onSubmit={handleSignUp}>
            <h1>Create Account</h1>
            <input
              type="text"
              placeholder="Name"
              value={registerForm.name}
              onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={registerForm.email}
              onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={registerForm.password}
              onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
              required
            />
            <button type="submit">Register</button>
          </form>
        </div>

        <div className="form-container sign-in-container">
          <form onSubmit={handleSignIn}>
            <h1>Sign In</h1>
            <input
              type="email"
              placeholder="Email"
              value={loginForm.email}
              onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={loginForm.password}
              onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
              required
            />
            <button type="submit">Login</button>
          </form>
        </div>

        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>Already have an account? Sign in here.</p>
              <button className="ghost" type="button" onClick={() => setIsRightPanelActive(false)}>
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Swaggers!</h1>
              <p>Enter your details and start your journey with us</p>
              <button className="ghost" type="button" onClick={() => setIsRightPanelActive(true)}>
                Register
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
