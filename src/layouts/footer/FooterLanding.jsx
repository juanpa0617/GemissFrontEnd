import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  
} from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";

import "./FooterLanding.css";

function FooterLanding() {
  return (
    <footer className="main-footer">
      <div className="footer-content">
        <section className="section-footer-about">
          <h3>Sobre Nosotros</h3>
          <p>Somos una empresa dedicada a la venta de ropa y accesorios con envíos a todo el país.</p> 
        </section>

        <nav className="footer-section-navigation">
          <h3>Navegación</h3>
          <ul>
            <li>
              <a href="#">Inicio</a>
            </li>
            <li>
              <a href="#">Productos</a>
            </li>
            <li>
              <a href="#">Nosotros</a>
            </li>
            <li>
              <a href="#">Contacto</a>
            </li>
          </ul>
        </nav>

        <address className="footer-section-contact">
          <h3>Contacto</h3>
          <p>
            <MapPin size={18} /> Av. Siempre Viva 123, Ciudad, Estado 
          </p>
          <p>
            <Phone size={18} /> Teléfono: <a href="tel:+1234567890">+1234567890</a> 
          </p>
          <p>
            <Mail size={18} /> Correo Electrónico: <a href="mailto:info@tiendaderopa.com">info@tiendaderopa.com</a> 
          </p>

          <div className="socials-container"> 
            <h3>Síguenos</h3> 
            <div className="socials">
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook size={20} /> 
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Twitter (X)">
                <FaXTwitter size={20} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </address>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Tienda de Ropa. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default FooterLanding;