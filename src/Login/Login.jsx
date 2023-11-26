// Login.js
import React, { useState, useEffect } from 'react'; //elementos de react para manejo de estados
import './Login.css';
import axios from "axios"; //para poder enviar datos a backend
import { useNavigate } from 'react-router-dom'; //para navegar a otras interfaces

import { setGlobalValue } from '../App'; //para cambiar el valor de permisos de empleado
import {  setEmpleado } from '../App'; //para modificar codigo del empleado

export function Login() {
  const navigate=useNavigate();
  const [role, setRole] = useState([]);
  const [confirmationMessage, setConfirmationMessage] = useState(null);
  const [formData, setFormData] = useState({
    CODEMPLEADO: '',
    CODCARGO: ''
  });

    useEffect(() => {
      const fetchData = async () => {

          //obtiene los cargos de los empleados
          try {
          const response = await axios.get("http://localhost:3001/api/obtenercargos");
          setRole(response.data);
          } catch (error) {
          console.error("Error al obtener los tipos de cargo", error);
          }
      };
  
      fetchData(); // Llama a la función asincrónica para obtener los datos
  
      }, []);

  const handleSubmit  = async (e) => {
    e.preventDefault();
    //verifica que el empleado exista, y que sea coherente con su cargo
    try {
      const response = await axios.post('http://localhost:3001/api/verificarlogin', 
      { CODEMPLEADO: formData.CODEMPLEADO,CODCARGO: formData.CODCARGO });
      
      //si existe tal empleado
      if (response.data.exists) {
          setConfirmationMessage('');
          navigate('/registro') //redirige a registro si existe

          if(formData.CODCARGO==='1' || formData.CODCARGO==='5'){
            setGlobalValue(1); //permisos para empleado con cargos 1 y 5
          }else if(formData.CODCARGO==='2' || formData.CODCARGO==='3'){
            setGlobalValue(2); //permisos para empleado con cargos 2 y 3
          }else if(formData.CODCARGO==='4'){
            setGlobalValue(3); //permisos para empleado con cargo 4
          }else if(formData.CODCARGO==='6'){
            setGlobalValue(4); //permisos para empleado con cargo 6
          }
          setEmpleado(formData.CODCARGO);//modifica cargo del empleado
      } else {
          // Si no existe, realizar el registro
          setConfirmationMessage('No existe usuario o hay un error en los datos');
      }
      } catch (error) {
      console.error('Error al verificar o enviar el registro:', error);
      }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-field">
          {/* Para que introduzca contraseña*/}
          <label className="label">Contraseña:</label>
          <input className="input" type="password" value={formData.CODEMPLEADO} onChange={(event) =>setFormData({...formData, CODEMPLEADO: event.target.value,})} required/>
        </div>
        <div className="form-field"> 
          {/* Para que escoja el cargo */}
          <label className="label">Cargo:</label>
          <select className="select" value={formData.CODCARGO} onChange={(event) => setFormData({ ...formData,CODCARGO: event.target.value,})} required>
            <option value="">Seleccionar Cargo</option>
            {role.map((roleOption) => (
              <option key={roleOption.CODCARGO} value={roleOption.CODCARGO}>
                {roleOption.NOMCARGO}
              </option>
            ))}
          </select>          
        </div>
        {/* Botono de inicio de sesión*/}
        <button className="submit-button" type="submit">
          Iniciar Sesión
        </button>
        {/*Mensaje de confirmacion por si se ha equivocado*/}
        {confirmationMessage && <div className="confirmation-message">{confirmationMessage}</div>}
      </form>
    </div>
  );
};


