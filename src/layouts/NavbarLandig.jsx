import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
    <div className="navbar-container" onMouseLeave={handleMouseLeave}>
      <nav className="landing-nav">
        <img src={logo1} alt="logo" />

        <ul className="nav-links-landing">
          <li onMouseEnter={() => handleMouseEnter("home")}>INICIO</li>
          <li onMouseEnter={() => handleMouseEnter("men")}>HOMBRES</li>
          <li onMouseEnter={() => handleMouseEnter("women")}>MUJERES</li>
          <li onMouseEnter={() => handleMouseEnter("kids")}>NIÑO/A</li>
          <li onMouseEnter={() => handleMouseEnter("accessories")}>
            ACCESSORIES
          </li>
          <li onMouseEnter={() => handleMouseEnter("accessories")}>CONTACTO</li>
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
            <Link to="/login" aria-label="Iniciar Sesin">
             
              <User className="nav-icon" size={35} />
            </Link>

            <Heart className="nav-icon" size={35} />
            <ShoppingBag className="nav-icon" size={35} />
          </div>
        </div>

        {activeMenu && <DropdownMenu category={activeMenu} />}
      </nav>
    </div>
  );
}
