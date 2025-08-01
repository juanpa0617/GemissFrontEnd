import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo1 from "../../assets/gemiss.png";
import {
  Heart,
  User,
  ShoppingBag,
  Search,
  ChevronDown,
  LogOut,
  Settings,
  UserCircle,
} from "lucide-react";
import DropdownMenu from "../../hooks/DropdownMenu";
import { useAuth } from "../../context/AuthContext";
import "./NavbarLanding.css";

export default function NavbarLanding() {
  const [activeMenu, setActiveMenu] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const { user, isAuthenticated, logout, isAdmin, isCustomer } = useAuth();
  const navigate = useNavigate();

  const handleMouseEnter = (menuName) => {
    setActiveMenu(menuName);
  };

  const handleMouseLeave = () => {
    setActiveMenu(null);
  };

  const handleUserIconClick = () => {
    if (isAuthenticated) {
      setShowUserDropdown(!showUserDropdown);
    } else {
      navigate("/login");
    }
  };

  const handleLogout = () => {
    logout();
    setShowUserDropdown(false);
    navigate("/");
  };

  const handleProfileClick = () => {
    setShowUserDropdown(false);
    if (isAdmin()) {
      navigate("/admin/profile");
    } else {
      navigate("/profile");
    }
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

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".user-dropdown-container")) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="navbar-container" onMouseLeave={handleMouseLeave}>
      <nav className="landing-nav">
        <div className="left-section">
    {!isAdmin() && (
      <Link to="/">
        <img src={logo1} alt="logo" />
      </Link>
    )}
  </div>

        {/* SOLO MOSTRAR MENÚ SI NO ES ADMIN */}
        {!isAdmin() && (
          <ul className="nav-links-landing">
            <li onMouseEnter={() => handleMouseEnter("home")}>
              <Link to="/">INICIO</Link>
            </li>
            <li onMouseEnter={() => handleMouseEnter("men")}>HOMBRES</li>
            <li onMouseEnter={() => handleMouseEnter("women")}>MUJERES</li>
            <li onMouseEnter={() => handleMouseEnter("kids")}>NIÑO/A</li>
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
        )}

        <div className="right-section">
          {/* SOLO MOSTRAR BUSCADOR SI NO ES ADMIN */}
          {!isAdmin() && (
            <form className="search-landing">
              <Search className="search-icon" />
              <input type="text" placeholder="Search" />
            </form>
          )}

          <div className="nav-icons">
            {/* ICONO DE USUARIO CON DROPDOWN */}
            <div className="user-dropdown-container">
              <div className="user-icon-wrapper" onClick={handleUserIconClick}>
                {isAuthenticated ? (
                  <div className="user-authenticated">
                    <UserCircle className="nav-icon" size={35} />
                    <ChevronDown className="dropdown-arrow" size={16} />
                  </div>
                ) : (
                  <User className="nav-icon" size={35} />
                )}
              </div>

              {/* DROPDOWN MENU PARA USUARIO AUTENTICADO */}
              {isAuthenticated && showUserDropdown && (
                <div className="user-dropdown-menu">
                  <div className="user-info">
                    <p className="user-name">
                      {user?.name} {user?.lastname}
                    </p>
                    <p className="user-role">{user?.role}</p>
                  </div>

                  <div className="dropdown-divider"></div>

                  <button
                    onClick={handleProfileClick}
                    className="dropdown-item"
                  >
                    <Settings size={16} />
                    Mi Perfil
                  </button>

                  {isAdmin() && (
                    <Link
                      to="/admin"
                      className="dropdown-item"
                      onClick={() => setShowUserDropdown(false)}
                    >
                      <Settings size={16} />
                      Panel Admin
                    </Link>
                  )}

                  <div className="dropdown-divider"></div>

                  <button
                    onClick={handleLogout}
                    className="dropdown-item logout"
                  >
                    <LogOut size={16} />
                    Cerrar Sesión
                  </button>
                </div>
              )}
            </div>

            {/* SOLO MOSTRAR ESTOS ICONOS PARA CLIENTES */}
            {(isAuthenticated && isCustomer()) || !isAuthenticated ? (
              <>
                <Heart className="nav-icon" size={35} />
                <ShoppingBag className="nav-icon" size={35} />
              </>
            ) : null}
          </div>
        </div>

        {/* SOLO MOSTRAR DROPDOWN DE MENÚS SI NO ES ADMIN */}
        {activeMenu && !isAdmin() && <DropdownMenu category={activeMenu} />}
      </nav>
    </div>
  );
}
