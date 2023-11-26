//Archivo .jsx que arma los componentes
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; //para navegar y poner componentes segun sea la ruta
import { Facturar } from './Facturacion/Facturacion'; //lama a facturar
import { Header } from './Header/Header'; //llama el header
import { Login } from './Login/Login'; //llama login
import { Registrar } from './Registro/Registro'; //llama registrar

let quien_es = 0; //permisos para empleados
export const getGlobalValue = () => quien_es;
export const setGlobalValue = (newValue) => {
  quien_es = newValue;
};

let emp = ''; //codigo del empleado
export const getEmpleado = () => emp;
export const setEmpleado = (newValue) => {
  emp = newValue;
};

function App() {
  
  return (
    <div className="App">
      <Router>
        <Header/>
        <div className='contenido'>
          {/* Reenderiza según sea la ruta */}
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
