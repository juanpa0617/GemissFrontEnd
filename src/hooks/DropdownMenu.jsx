import React from 'react';
import './DropdownMenu.css';

const DropdownMenu = ({ category }) => {
  const menuData = {
    home: {
      destacados: ['Novedades', 'Superventas', 'Teens', 'Básicos para la vuelta al cole'],
      categories: ['Hombre', 'Mujer', 'Niño/a', 'Accesorios'],
      trending: ['Colección Verano', 'Ropa Deportiva', 'Estilo Casual'],
      support: ['Guía de Tallas', 'Atención al Cliente', 'Devoluciones']
    },
    men: {
      destacados: ['Novedades', 'Superventas', 'Teens', 'Básicos para la vuelta al cole'],
      zapatillas: ['Todas las zapatillas', 'Lifestyle', 'Jordan', 'Fútbol', 'Running', 'Baloncesto'],
      ropa: ['Toda la ropa', 'Partes de arriba', 'Sudaderas', 'Chándales', 'Ropa deportiva', 'Pantalones cortos', 'Pantalones y leggings', 'Chaquetas', 'Equipaciones y camisetas'],
      ninoEdad: ['Niño/a (7-15 años)', 'Niño/a pequeño/a (3-7 años)', 'Bebé e infantil (0-3 años)'],
      accesorios: ['Accesorios y equipamiento', 'Bolsas y mochilas', 'Gorros y gorras', 'Calcetines']
    },
    women: {
      destacados: ['Novedades', 'Superventas', 'Teens', 'Básicos para la vuelta al cole'],
      zapatillas: ['Todas las zapatillas', 'Lifestyle', 'Jordan', 'Fútbol', 'Running', 'Baloncesto'],
      ropa: ['Toda la ropa', 'Partes de arriba', 'Sudaderas', 'Chándales', 'Ropa deportiva', 'Pantalones cortos', 'Pantalones y leggings', 'Chaquetas', 'Equipaciones y camisetas'],
      ninoEdad: ['Niño/a (7-15 años)', 'Niño/a pequeño/a (3-7 años)', 'Bebé e infantil (0-3 años)'],
      accesorios: ['Accesorios y equipamiento', 'Bolsas y mochilas', 'Gorros y gorras', 'Calcetines']
    },
    kids: {
      destacados: ['Novedades', 'Superventas', 'Teens', 'Básicos para la vuelta al cole'],
      zapatillas: ['Todas las zapatillas', 'Lifestyle', 'Jordan', 'Fútbol', 'Running', 'Baloncesto'],
      ropa: ['Toda la ropa', 'Partes de arriba', 'Sudaderas', 'Chándales', 'Ropa deportiva', 'Pantalones cortos', 'Pantalones y leggings', 'Chaquetas', 'Equipaciones y camisetas'],
      ninoEdad: ['Niño/a (7-15 años)', 'Niño/a pequeño/a (3-7 años)', 'Bebé e infantil (0-3 años)'],
      accesorios: ['Accesorios y equipamiento', 'Bolsas y mochilas', 'Gorros y gorras', 'Calcetines']
    },
    accessories: {
      destacados: ['Novedades', 'Superventas', 'Teens', 'Básicos para la vuelta al cole'],
      zapatillas: ['Todas las zapatillas', 'Lifestyle', 'Jordan', 'Fútbol', 'Running', 'Baloncesto'],
      ropa: ['Toda la ropa', 'Partes de arriba', 'Sudaderas', 'Chándales', 'Ropa deportiva', 'Pantalones cortos', 'Pantalones y leggings', 'Chaquetas', 'Equipaciones y camisetas'],
      ninoEdad: ['Niño/a (7-15 años)', 'Niño/a pequeño/a (3-7 años)', 'Bebé e infantil (0-3 años)'],
      accesorios: ['Accesorios y equipamiento', 'Bolsas y mochilas', 'Gorros y gorras', 'Calcetines']
    }
  };

  const currentMenu = menuData[category];
  
  if (!currentMenu) {
    return null; 
  }

  const getColumnTitle = (key) => {
    const titles = {
      destacados: 'Destacados',
      zapatillas: 'Zapatillas',
      ropa: 'Ropa',
      ninoEdad: 'Niño/a por edad',
      accesorios: 'Accesorios y equipamiento'
    };
    return titles[key] || key;
  };

  return (
    <div className="dropdown-menu">
      <div className="dropdown-grid">
        {Object.entries(currentMenu).map(([key, items]) => (
          <div key={key} className="dropdown-column">
            <h3>{getColumnTitle(key)}</h3>
            <ul>
              {items.map((item, index) => (
                <li key={index}>
                  <a href={`/${category}/${key}/${item.toLowerCase().replace(/ /g, '-')}`}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropdownMenu;