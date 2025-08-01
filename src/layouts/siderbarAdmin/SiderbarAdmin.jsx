import React, { useState } from "react";
import "./SiderbarAdmin.css";
import logo from "../../assets/gemiss.png";

import {
  RiMenuFold4Fill,
  RiMenuUnfold4Fill,
  RiDashboardFill,
  RiSettings4Fill,
} from "react-icons/ri";
import { FaUsers, FaProductHunt } from "react-icons/fa6";
import { TbCategoryFilled } from "react-icons/tb";
import { IoMdPricetags } from "react-icons/io";
import { Link } from "react-router-dom";

export default function SiderbarAdmin() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Dashboard");

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: RiDashboardFill, href: "/dashboard" },
    { id: "configuration", label: "Configuración", icon: RiSettings4Fill, href: "/configuration" },
    { id: "users", label: "Usuarios", icon: FaUsers, href: "/users" },
    { id: "categories", label: "Categorías", icon: TbCategoryFilled, href: "/categories" },
    { id: "products", label: "Productos", icon: FaProductHunt, href: "/products" },
    { id: "brands", label: "Marcas", icon: IoMdPricetags, href: "/brands" },
  ];

  return (
    <aside className={`sidebar-admin ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <header className="sidebar-header">
        <img
          src={logo}
          alt="Gemiss Logo" 
          className="sidebar-logo" 
        />

        {isOpen && <h2 className="sidebar-title">Gemiss</h2>}
        
        <button className="toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <RiMenuFold4Fill className="toggle-icon" />
          ) : (
            <RiMenuUnfold4Fill className="toggle-icon" />
          )}
        </button>
      </header>

      <nav className="sidebar-nav">
        <ul>
          {navigationItems.map((item) => (
            <li
              key={item.id}
              className={`nav-item ${
                activeItem === item.label ? "active" : ""
              }`}
              onClick={() => setActiveItem(item.label)}
              data-tooltip={item.label} // Agregado para el tooltip
            >
              <Link to={item.href} className="nav-link">
                <item.icon className="nav-icon" />
                {isOpen && <span className="nav-label">{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}