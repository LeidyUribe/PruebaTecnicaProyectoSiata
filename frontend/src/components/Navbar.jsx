import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ onLogout }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          🚚 Sistema de Logística
        </Link>
        <div className="navbar-menu">
          <Link
            to="/"
            className={`navbar-link ${isActive('/') ? 'active' : ''}`}
          >
            Dashboard
          </Link>
          <Link
            to="/clientes"
            className={`navbar-link ${isActive('/clientes') ? 'active' : ''}`}
          >
            Clientes
          </Link>
          <Link
            to="/productos"
            className={`navbar-link ${isActive('/productos') ? 'active' : ''}`}
          >
            Productos
          </Link>
          <Link
            to="/bodegas"
            className={`navbar-link ${isActive('/bodegas') ? 'active' : ''}`}
          >
            Bodegas
          </Link>
          <Link
            to="/puertos"
            className={`navbar-link ${isActive('/puertos') ? 'active' : ''}`}
          >
            Puertos
          </Link>
          <Link
            to="/envios-terrestres"
            className={`navbar-link ${isActive('/envios-terrestres') ? 'active' : ''}`}
          >
            Envíos Terrestres
          </Link>
          <Link
            to="/envios-maritimos"
            className={`navbar-link ${isActive('/envios-maritimos') ? 'active' : ''}`}
          >
            Envíos Marítimos
          </Link>
          <button onClick={onLogout} className="navbar-logout">
            Cerrar Sesión
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
