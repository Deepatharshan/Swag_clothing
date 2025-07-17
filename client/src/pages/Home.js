import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ClothesList from "../components/ClothesList";
import "./Home.css";

function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          } else {
            entry.target.classList.remove('in-view');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.fade-up, .slide-in-left, .slide-in-right');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="home-page">
      <Header />

      

      <section id="sec" className="fade-up">
        <h2>Our Highlights</h2>
        <ul>
          <li>
            <span><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z"/></svg></span>
            <h3>Orders</h3>
            <p>300+</p>
          </li>
          <li>
            <span><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M320-480v80q0 66 47 113t113 47q66 0 113-47t47-113v-80H320Zm160 180q-42 0-71-29t-29-71v-20h200v20q0 42-29 71t-71 29ZM340-680q-38 0-67.5 27.5T231-577l58 14q6-26 20-41.5t31-15.5q17 0 31 15.5t20 41.5l58-14q-12-48-41.5-75.5T340-680Zm280 0q-38 0-67.5 27.5T511-577l58 14q6-26 20-41.5t31-15.5q17 0 31 15.5t20 41.5l58-14q-12-48-41.5-75.5T620-680ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Z"/></svg></span>
            <h3>Trusted Customers</h3>
            <p>100+</p>
          </li>
          <li>
            <span><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="m363-310 117-71 117 71-31-133 104-90-137-11-53-126-53 126-137 11 104 90-31 133ZM480-28 346-160H160v-186L28-480l132-134v-186h186l134-132 134 132h186v186l132 134-132 134v186H614L480-28Zm0-112 100-100h140v-140l100-100-100-100v-140H580L480-820 380-720H240v140L140-480l100 100v140h140l100 100Zm0-340Z"/></svg></span>
            <h3>Most Trusted Store</h3>
            <p>2+ years</p>
          </li>
        </ul>
      </section>

      <div className="fade-up">
        <ClothesList limit={8} filterType="clothes" />
      </div>

      {/* New Blog Cards Section */}
      <div className="blog-section fade-up">
        <h2>From Our Blog</h2>
        <div className="blog-grid">
          <div className="parent">
            <div className="card">
              <div className="date-box">
                <span className="month">Aug</span>
                <span className="date">12</span>
              </div>
              <div className="content-box">
                <span className="card-title">Fashion Tips</span>
                <p className="card-content">
                  Discover the latest styling advice to elevate your wardrobe.
                </p>
                <span className="see-more">Read More</span>
              </div>
            </div>
          </div>
          <div className="parent">
            <div className="card">
              <div className="date-box">
                <span className="month">Sep</span>
                <span className="date">05</span>
              </div>
              <div className="content-box">
                <span className="card-title">Summer Trends</span>
                <p className="card-content">
                  Stay cool and stylish with this year's hottest summer looks.
                </p>
                <span className="see-more">Read More</span>
              </div>
            </div>
          </div>
          <div className="parent">
            <div className="card">
              <div className="date-box">
                <span className="month">Oct</span>
                <span className="date">18</span>
              </div>
              <div className="content-box">
                <span className="card-title">Accessories Guide</span>
                <p className="card-content">
                  A complete guide to pairing the right accessories with your fit.
                </p>
                <span className="see-more">Read More</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero offers section */}
      <div className="hero-offers">
        <div className="offer-card slide-in-left">
          <img src="/offers/running shoe.png" alt="Special Offer" />
          <div className="offer-label">30% OFF</div>
          <div className="offer-desc fade-up">
            <p>Experience unmatched comfort and style with our running shoes.</p>
            <button className="get-collections-btn fade-up">Get it in Collections</button>
          </div>
        </div>
        <div className="offer-card slide-in-right">
          <img src="/offers/running shoe2.webp" alt="Exclusive Offer" />
          <div className="offer-label">50% OFF</div>
          <div className="offer-desc fade-up">
            <p>Elevate your performance with the latest exclusive running shoe model.</p>
            <button className="get-collections-btn fade-up">Get it in Collections</button>
          </div>
        </div>
      </div>

      {/* New hero section after offers */}
      <div className="store-hero fade-up">
        <div className="store-hero-content">
          <h2>Discover Your Unique Style</h2>
          <p>At Swag, we blend fashion, quality, and affordability to help you express your true self.</p>
          <button className="about-btn">About Us</button>
        </div>
      </div>

      <div className="fade-up">
        <ClothesList filterType="accessories" />
      </div>

      <Footer />
    </div>
  );
}

export default Home;
