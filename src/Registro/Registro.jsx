// RegistroPersonas.js
import React, { useState } from 'react';
import './Registro.css';

export function Registrar() {
  const [documento, setDocumento] = useState('');
  const [tipoDocumento, setTipoDocumento] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [tipoPersona, setTipoPersona] = useState('');

  const [tipoContacto, setTipoContacto] = useState('');
  const [valorContacto, setValorContacto] = useState('');
  const [contactos, setContactos] = useState([]);

  const [tipoVia, setTipoVia] = useState('');
  const [cuadrante, setCuadrante] = useState('');
  const [barrio, setBarrio] = useState('');
  const [manzana, setManzana] = useState('');
  const [urbanizacion, setUrbanizacion] = useState('');
  const [tipoPredio, setTipoPredio] = useState('');
  const [complemento, setComplemento] = useState('');

  const handleAgregarContacto = () => {
    if (tipoContacto && valorContacto) {
      setContactos([...contactos, { tipo: tipoContacto, valor: valorContacto }]);
      setTipoContacto('');
      setValorContacto('');
    }
  };

  return (
    <div className="registro-container">
        <div className="formulario-arriba">
            <div className="formulario-izquierda">
                <label>Número de Documento:</label>
                <input type="text" value={documento} onChange={(e) => setDocumento(e.target.value)} />

                <label>Tipo de Documento:</label>
                <select value={tipoDocumento} onChange={(e) => setTipoDocumento(e.target.value)}>
                <option value="">Seleccionar</option>
                <option value="CC">CC</option>
                <option value="TI">TI</option>
                <option value="CE">CE</option>
                </select>

                <label>Nombre:</label>
                <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />

                <label>Apellido:</label>
                <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} />

                <label>Tipo de Persona:</label>
                <select value={tipoPersona} onChange={(e) => setTipoPersona(e.target.value)}>
                <option value="">Seleccionar</option>
                <option value="cliente">Cliente</option>
                <option value="proveedor">Proveedor</option>
                </select>
            </div>

            <div className="formulario-derecha">
                <div className="contacto-titulo">Contacto</div>

                <div className="scroll-container">
                <label></label>
                <select value={tipoContacto} onChange={(e) => setTipoContacto(e.target.value)}>
                    <option value="">TipoContacto</option>
                    <option value="correo">Correo</option>
                    <option value="celular">Celular</option>
                </select>                
                <input
                    type="text"
                    value={valorContacto}
                    onChange={(e) => setValorContacto(e.target.value)}
                />

                <div className="contacto-lista">
                    {contactos.map((contacto, index) => (
                    <div key={index}>
                        {contacto.tipo}: {contacto.valor}
                    </div>
                    ))}
                </div>
                </div>
                <button onClick={handleAgregarContacto}>Agregar Contacto</button>
            </div>
        </div>
      
      <div className="formulario-abajo">
        {/* ... (Otros campos de dirección) */}

        <label>Tipo de Vía:</label>
        <select value={tipoVia} onChange={(e) => setTipoVia(e.target.value)}>
          <option value="">Seleccionar</option>
          <option value="au">AU</option>
          <option value="ac">AC</option>
          <option value="cr">CR</option>
          <option value="cl">CL</option>
        </select>

        {/* ... (Otros campos de dirección) */}

        <label>Cuadrante:</label>
        <select value={cuadrante} onChange={(e) => setCuadrante(e.target.value)}>
          <option value="">Seleccionar</option>
          <option value="norte">Norte</option>
          <option value="sur">Sur</option>
          <option value="este">Este</option>
          <option value="oeste">Oeste</option>
        </select>

        {/* ... (Otros campos de dirección) */}

        <label>Barrio:</label>
        <select value={barrio} onChange={(e) => setBarrio(e.target.value)}>
          <option value="">Seleccionar</option>
          <option value="br">BR</option>
          <option value="sm">SM</option>
          <option value="m">M</option>
        </select>

        {/* ... (Otros campos de dirección) */}

        <label>Manzana:</label>
        <select value={manzana} onChange={(e) => setManzana(e.target.value)}>
          <option value="">Seleccionar</option>
          <option value="manzana">Manzana</option>
          <option value="interior">Interior</option>
          <option value="sector">Sector</option>
        </select>

        {/* ... (Otros campos de dirección) */}

        <label>Urbanización:</label>
        <select value={urbanizacion} onChange={(e) => setUrbanizacion(e.target.value)}>
          <option value="">Seleccionar</option>
          <option value="BQ">BQ</option>
          <option value="CU">CU</option>
          <option value="CO">CO</option>
        </select>

        {/* ... (Otros campos de dirección) */}

        <label>Tipo de Predio:</label>
        <select value={tipoPredio} onChange={(e) => setTipoPredio(e.target.value)}>
          <option value="">Seleccionar</option>
          <option value="AL">AL</option>
          <option value="AP">AP</option>
          <option value="BG">BG</option>
        </select>

        {/* ... (Otros campos de dirección) */}

        <label>Complemento:</label>
        <select value={complemento} onChange={(e) => setComplemento(e.target.value)}>
          <option value="">Seleccionar</option>
          <option value="CS">CS</option>
          <option value="CU">CU</option>
          <option value="CE">CE</option>
        </select>

        {/* ... (Otros campos de dirección) */}
      </div>
    </div>
  );
}
