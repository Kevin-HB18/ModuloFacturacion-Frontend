// Login.js
import React, { useState, useEffect } from 'react';
import './Login.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import { getGlobalValue,setGlobalValue } from '../App';

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
    try {
      const response = await axios.post('http://localhost:3001/api/verificarlogin', 
      { CODEMPLEADO: formData.CODEMPLEADO,CODCARGO: formData.CODCARGO });
      console.log(response.data)
      if (response.data.exists) {
          setConfirmationMessage('');
          navigate('/registro')

          if(formData.CODCARGO==='1' || formData.CODCARGO==='5'){
            setGlobalValue(1);
          }else if(formData.CODCARGO==='2' || formData.CODCARGO==='3'){
            setGlobalValue(2);
          }else if(formData.CODCARGO==='4'){
            setGlobalValue(3);
          }else if(formData.CODCARGO==='6'){
            setGlobalValue(4);
          }
          
          
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
          <label className="label">Contraseña:</label>
          <input className="input" type="password" value={formData.CODEMPLEADO} onChange={(event) =>setFormData({...formData, CODEMPLEADO: event.target.value,})} required/>
        </div>
        <div className="form-field"> 
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
        <button className="submit-button" type="submit">
          Iniciar Sesión
        </button>
        {confirmationMessage && <div className="confirmation-message">{confirmationMessage}</div>}
      </form>
    </div>
  );
};


