import React, { useState } from 'react'
import gemisslogo from '../assets/Gemiss.png'
import './NavbarLanding.css'
export default function NavbarLandig() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState(null)

  const categories = [
    { name: 'Novedades' }, 
    { name: 'Bolsos' },
    { name: 'Mujer', sub: [ 
      'Novedades para Mujer',
      'Bolsos',
      'Ropa',
      'Zapatos',
      'Carteras & Marroquinería',
      'Viaje',
      'Accesorios',
      'Joyería & Relojes',
      'Regalos'
    ] },
    { name: 'Hombre' },
    { name: 'Niños' },
    { name: 'Viaje' },
    { name: 'Joyería & Relojes' },
    { name: 'Fragancias y Maquillaje' },
    { name: 'Décor & Lifestyle' },
    { name: 'Regalos' }
  ]

  return (
    <nav className="nav-landing">
      <img src={gemisslogo} alt="Logo-landing" />
      <button className="menu-btn" onClick={() => setSidebarOpen(true)}>☰</button>
      {sidebarOpen && (
        <div className="sidebar">
          <button className="close-btn" onClick={() => setSidebarOpen(false)}>✕</button>
        
          <ul className="sidebar-list">
            {categories.map((cat, idx) => (
              <li key={idx}>
                <span onClick={() => setActiveCategory(cat.sub ? cat.name : null)}>
                  {cat.name}
                </span>
                {activeCategory === cat.name && cat.sub && (
                  <ul className="submenu">
                    {cat.sub.map((sub, i) => (
                      <li key={i}>{sub}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}