import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

import { getGlobalValue,setGlobalValue } from '../App';

export function Header() {
    const location = useLocation();

    const handleLogout = () => {
      setGlobalValue(0);
      console.log('Cerrando sesión...');
    };

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
          <Link to="/login" className="nav-link" onClick={handleLogout}>
            Salir
          </Link>
        </div>
      );
};
