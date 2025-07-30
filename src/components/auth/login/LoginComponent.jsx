import React, { useState } from "react";
import "./LoginComponent.css";
import adele from "../../../assets/Modelos/adelelogin.jpg";
import logo from "../../../assets/Gemiss.png";
import { Link } from "react-router-dom";

export default function LoginComponent() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: false, password: false });
  const [touched, setTouched] = useState({ email: false, password: false });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validación básica como Zara
    const newErrors = {
      email: !formData.email || !formData.email.includes('@'),
      password: !formData.password
    };
    
    setErrors(newErrors);
    setTouched({ email: true, password: true });
    
    if (!newErrors.email && !newErrors.password) {
      // Procesar login
      console.log("Login attempt:", formData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    
    // Limpiar error cuando el usuario empiece a escribir
    if (touched[name] && errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: false
      }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    // Validar al perder el foco
    if (name === 'email') {
      setErrors(prev => ({
        ...prev,
        email: !formData.email || !formData.email.includes('@')
      }));
    } else if (name === 'password') {
      setErrors(prev => ({
        ...prev,
        password: !formData.password
      }));
    }
  };

  return (
    <main className="login-main-container">
      <section className="login-content">
        <form className="login-form-panel" onSubmit={handleSubmit}>
          <Link to="/"><img src={logo} alt="Gemiss Logo" className="logo-login" /></Link>
          <h2>Inicia Sesión</h2>

          <div className={`form-group-login ${errors.email && touched.email ? 'error' : ''}`}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Email"
            />
            {errors.email && touched.email && (
              <div className="error-message">
                <svg className="error-icon" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
                El campo email es obligatorio
              </div>
            )}
          </div>

          <div className={`form-group-login ${errors.password && touched.password ? 'error' : ''}`}>
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Contraseña"
            />
            {errors.password && touched.password && (
              <div className="error-message">
                <svg className="error-icon" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
                El campo contraseña es obligatorio
              </div>
            )}
          </div>

          <p className="forgot-password-link">¿Has olvidado tu contraseña?</p>

          <button 
            type="submit" 
            className="login-button"
            disabled={!formData.email || !formData.password}
          >
            Iniciar Sesión
          </button>

          <div className="register-link-wrapper">
            <Link to="/signup" className="register-link">
              Regístrate
            </Link>
          </div>

        </form>

        <figure className="login-figure-panel">
          <img src={adele} alt="Fashion Model" className="login-figure-image" />
        </figure>
      </section>
    </main>
  );
}