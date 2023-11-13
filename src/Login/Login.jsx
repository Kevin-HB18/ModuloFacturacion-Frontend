// Login.js
import React, { useState } from 'react';
import './Login.css';



export function Login() {

    const rolesList = [
        "Director Comercial",
        "Gerente de ventas",
        "Representante de ventas",
        "Vendedor",
        "Gerente de compras",
        "Auxiliar de compras"
        ];

  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar la lógica de inicio de sesión
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label className="label">Contraseña:</label>
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label className="label">Cargo:</label>
          <select
            className="select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">Seleccionar Cargo</option>
            {rolesList.map((roleOption) => (
              <option key={roleOption} value={roleOption}>
                {roleOption}
              </option>
            ))}
          </select>
        </div>
        <button className="submit-button" type="submit">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};


