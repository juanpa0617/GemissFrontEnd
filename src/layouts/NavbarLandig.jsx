import React, { useState, useEffect } from "react";
import logo1 from "../assets/gemiss.png";
import { Heart, User, ShoppingBag, Search } from "lucide-react";
import DropdownMenu from "../hooks/DropdownMenu";
import "./NavbarLanding.css";

export default function NavbarLanding() {
  const [activeMenu, setActiveMenu] = useState(false);

  const handleMouseEnter = (menuName) => {
    setActiveMenu(menuName);
  };

  const handleMouseLeave = () => {
    setActiveMenu(null);
  };

  useEffect(() => {
    if (activeMenu) {
      document.body.classList.add("dropdown-active");
    } else {
      document.body.classList.remove("dropdown-active");
    }

    return () => {
      document.body.classList.remove("dropdown-active");
    };
  }, [activeMenu]);

  return (
    <div 
      className="navbar-container"
      onMouseLeave={handleMouseLeave}
    >
      <nav className="landing-nav">
        <img src={logo1} alt="logo" />

        <ul className="nav-links-landing">
          <li
            onMouseEnter={() => handleMouseEnter("home")}
          >
            HOME
          </li>
          <li onMouseEnter={() => handleMouseEnter("men")}>
            MEN
          </li>
          <li onMouseEnter={() => handleMouseEnter("women")}>
            WOMEN
          </li>
          <li onMouseEnter={() => handleMouseEnter("kids")}>
            KIDS
          </li>
          <li onMouseEnter={() => handleMouseEnter("accessories")}>
            ACCESSORIES
          </li>
           <li onMouseEnter={() => handleMouseEnter("accessories")}>
            CONTACTO
          </li>
           <li onMouseEnter={() => handleMouseEnter("accessories")}>
            MUNDO GEMîSS
          </li>
        </ul>

        <div className="right-section">
          <form className="search-landing">
            <Search className="search-icon" />
            <input type="text" placeholder="Search" />
          </form>

          <div className="nav-icons">
            <User className="nav-icon" />
            <Heart className="nav-icon" />
            <ShoppingBag className="nav-icon" />
          </div>
        </div> 

        {activeMenu && <DropdownMenu category={activeMenu} />}
      </nav>
    </div>
  );
}