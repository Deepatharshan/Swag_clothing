import React from "react";
import duaLipa1 from "./Dua Lipa.png";
import "./Header.css"; // Make sure this includes the styles for the updated layout

function Header() {
  return (
    <div className="desktop">
      <div className="overlap-group-wrapper">
        <div className="overlap-group">
          <div className="rectangle" />

          <p className="SWAG">
            <span className="text-wrapper">SW</span>
            <span className="span">AG</span>
          </p>

          <p className="swag-clothing-store">
            Swag Clothing Store
            <br />
            Discover your style with our unique and trendy collections.
          </p>

          <img className="dua-lipa" alt="Fashion model" src={duaLipa1} />
        </div>
      </div>
    </div>
  );
}

export default Header;
