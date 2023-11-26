import React from 'react';
import { Link, useLocation } from 'react-router-dom'; //para usar links y poder navegar a otras interfaces
import './Header.css'; 

import { setGlobalValue } from '../App'; //variable global de permisos del empleado

export function Header() {//Cabecera de las dos interfaces
    const location = useLocation();

    const handleLogout = () => {
      setGlobalValue(0); //modifica el permiso a 0 porque va a salir
      console.log('Cerrando sesión...');
    };
   

    if (location.pathname === '/login') {//para que no se muestre en el /login
        return null;
      }
    else    
      return (//pone header en las dos interfaces
        <div className="header">
          {/* Link para ir a registro */}
          <Link to="/registro" className="nav-link">
            Registrar Personas
          </Link>
          {/* Link para ir a facturacion */}
          <Link to="/facturacion" className="nav-link">
            Facturación
          </Link>
          {/* Link para salir e ir a login*/}
          <Link to="/login" className="nav-link" onClick={handleLogout}>
            Salir
          </Link>
        </div>
      );
};
