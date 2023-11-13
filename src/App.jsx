import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Facturar } from './Facturacion/Facturacion';
import { Header } from './Header/Header';
import { Login } from './Login/Login';
import { Registrar } from './Registro/Registro';

function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <div className='contenido'>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} /> {/* Ruta raíz */}
            <Route path='/login' element={<Login />} />
            <Route path='/registro' element={<Registrar />} />
            <Route path='/facturacion' element={<Facturar />} />
            <Route path="*" element={<div className='cont-not-found'><h2>Error:404</h2><h2>página no encontrada</h2></div>} />
          </Routes>
        </div>
      </Router>     
    </div>
  );
}

export default App;
