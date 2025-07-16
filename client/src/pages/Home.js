import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ClothesList from "../components/ClothesList";
import "./Home.css";

function Home() {
  return (
    <div>
      <Header />
      <div className="home-content">
        <h2>Welcome to Swag</h2>
        <p>Find the latest trends in fashion and style.</p>
      </div>

      {/* Latest Clothes - up to 8 */}
      <ClothesList limit={8} filterType="clothes" />

      {/* Seamless Animated Brand Logo Strip */}
      <div className="brand-box">
        <h3>Our Trusted Brands</h3>
        <div className="brand-marquee">
          <div className="brand-track">
            {[...Array(2)].flatMap((_, i) => [
              <img key={`adidas-${i}`} src="/brands/adidas.jpg" alt="Adidas" />,
              <img key={`tommy-${i}`} src="/brands/tommy.png" alt="Tommy Hilfiger" />,
              <img key={`lyc-${i}`} src="/brands/lyc.png" alt="LYC London" />,
              <img key={`gymrapper-${i}`} src="/brands/Sharks.jpg" alt="Gymrapper" />,
              <img key={`adidas-${i}`} src="/brands/adidas.jpg" alt="Adidas" />,
              <img key={`tommy-${i}`} src="/brands/tommy.png" alt="Tommy Hilfiger" />,
              <img key={`lyc-${i}`} src="/brands/lyc.png" alt="LYC London" />,
              <img key={`gymrapper-${i}`} src="/brands/Sharks.jpg" alt="Gymrapper" />,
              <img key={`lyc-${i}`} src="/brands/lyc.png" alt="LYC London" />
            ])}
          </div>
        </div>
      </div>

      {/* Accessories */}
      <ClothesList filterType="accessories" />

      <Footer />
    </div>
  );
}

export default Home;
