import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';


export function Header() {
    const location = useLocation();

  

    if (location.pathname === '/login') {
        return null;
      }
    else    
      return (
        <div className="header">
          <Link to="/registro" className="nav-link">
            Registrar Personas
          </Link>
          <Link to="/facturacion" className="nav-link">
            Facturación
          </Link>
          <Link to="/login" className="nav-link">
            Salir
          </Link>
        </div>
      );
};
