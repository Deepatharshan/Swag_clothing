import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-row">

        {/* About Section */}
        <div className="footer-col">
          <h4>About Swag</h4>
          <p>
            Swag Clothing Store delivers the hottest fashion trends with premium quality
            and modern designs. Whether casual or formal, we’ve got the perfect style for every mood.
          </p>
          <div className="icons">
            <a href="https://facebook.com/swagfashion" target="_blank" rel="noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://instagram.com/swagfashion" target="_blank" rel="noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="mailto:support@swagstore.com">
              <i className="fas fa-envelope"></i>
            </a>
          </div>
        </div>

        {/* Awards Section */}
        <div className="footer-col">
          <h4>Awards</h4>
          <ul className="links">
            <li><span>🏆 Best Website of 2024</span></li>
            <li><span>👕 Best Clothing Store</span></li>
            <li><span>🎖️ People's Choice Award</span></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="footer-col">
          <h4>Contact Us</h4>
          <ul className="links">
            <li><a href="mailto:support@swagstore.com">support@swagstore.com</a></li>
            <li><a href="https://instagram.com/swagfashion" target="_blank" rel="noreferrer">@swagfashion</a></li>
            <li><a href="https://facebook.com/swagfashion" target="_blank" rel="noreferrer">fb.com/swagfashion</a></li>
          </ul>
          <form>
            <input type="email" placeholder="Your email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>

      </div>

      <div className="copy-right">
        <p>&copy; 2025 Swag. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
