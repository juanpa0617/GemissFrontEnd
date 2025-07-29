import React, { useState, useEffect } from "react";
import NavbarLandig from "../../layouts/navbarLandig.jsx";
import adidas from "../../assets/brands/adidas.png";
import nike from "../../assets/brands/nike.jpg";
import fila from "../../assets/brands/fila.png";
import hermesparis from "../../assets/brands/hermesparis.png";
import gucci from "../../assets/brands/gucci.png";
import under from "../../assets/brands/under.png";
import zara from "../../assets/brands/zara.jpg";
import dolcegabbana from "../../assets/brands/dolce&gabana.png";
import adidasSlide from "../../assets/Modelos/ADIDAS.jpg";
import nikeSlide from "../../assets/Modelos/sportmen.jpg";
import gucciSlide from "../../assets/Modelos/gucci.jpg";
import blackpinkSlide from "../../assets/Modelos/BLACKPINK.jpg";

import "./LandingPage.css";

const slidesData = [
  {
    id: "adidas",
    title: "Adidas Collection",
    subtitle: "Encuentra el estilo perfecto para ti",
    brand: "Adidas",
    image: adidasSlide,
  },
  {
    id: "nike",
    title: "Nike Sportwear",
    subtitle: "Just Do It - Supera tus límites",
    brand: "Nike",
    image: nikeSlide,
  },
  {
    id: "gucci",
    title: "Gucci Luxury",
    subtitle: "Elegancia y sofisticación",
    brand: "Gucci",
    image: gucciSlide,
  },
  {
    id: "blackpink",
    title: "K-Fashion Style",
    subtitle: "Tendencias que marcan la diferencia",
    brand: "Fashion",
    image: blackpinkSlide,
  },
];

export default function LandingPage() {
  // ESTADO DEL SLIDER
  const [currentSlide, setCurrentSlide] = useState(0);

  // AUTO-PLAY: Cambia automáticamente cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === slidesData.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // SLIDE ACTUAL
  const currentSlideData = slidesData[currentSlide];

  return (
    <>
      <NavbarLandig />
      <div className="container-landing">
        <section className="hero-section">
          <div
            className="hero-slider-section"
            style={{ backgroundImage: `url(${currentSlideData.image})` }}
          >
            <div className="slider-content">
              <h1>{currentSlideData.title}</h1>
              <p>{currentSlideData.subtitle}</p>
              <button className="cta-button">
                Ver {currentSlideData.brand}
              </button>
            </div>
          </div>
        </section>

        <section className="featured-brands">
          <h2 className="brands-title">Nuestras Marcas Aliadas</h2>
          <div className="brand-logos">
            <img src={adidas} alt="Adidas" className="image-brands" />
            <img src={nike} alt="Nike" className="image-brands" />
            <img src={fila} alt="Fila" className="image-brands" />
            <img
              src={hermesparis}
              alt="Hermes Paris"
              className="image-brands"
            />
            <img src={gucci} alt="Gucci" className="image-brands" />
            <img src={under} alt="Under Armour" className="image-brands" />
            <img src={zara} alt="Zara" className="image-brands" />
            <img
              src={dolcegabbana}
              alt="Dolce & Gabbana"
              className="image-brands"
            />
          </div>
        </section>
      </div>
    </>
  );
}
