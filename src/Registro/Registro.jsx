// RegistroPersonas.js
import React, { useState } from "react";
import "./Registro.css";

export function Registrar() {
  const [documento, setDocumento] = useState("");
  const [tipoDocumento, setTipoDocumento] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [tipoPersona, setTipoPersona] = useState("");

  const [tipoVia, setTipoVia] = useState("");
  const [numnomviaprinc, setnumnomviaprinc] = useState("");
  const [letrasviaprinc, setletrasviaprinc] = useState("");
  const [prefijobis, setprefijobis] = useState("");
  const [letrasprefijo, setletrasprefijo] = useState("");
  const [cuadrante, setCuadrante] = useState("");
  const [numviagen, setnumviagen] = useState("");
  const [letrasviagen, setletrasviagen] = useState("");
  const [sufijobis, setsufijobis] = useState("");
  const [letrassufijo, setletrassufijo] = useState("");
  const [complemento, setComplemento] = useState("");  
  const [barrio, setBarrio] = useState("");
  const [manzana, setManzana] = useState("");
  const [urbanizacion, setUrbanizacion] = useState("");
  const [tipoPredio, setTipoPredio] = useState("");


  const [contactos, setContactos] = useState([
    { tipo: "", valor: "" },
    { tipo: "", valor: "" },
    { tipo: "", valor: "" },
    { tipo: "", valor: "" },
  ]);

  const handleContactoChange = (index, key, value) => {
    const updatedContactos = [...contactos];
    updatedContactos[index][key] = value;
    setContactos(updatedContactos);
  };

  return (
    <div className="registro-container">
      <div className="formulario-arriba">
        <div className="formulario-izquierda">
          <label>Número de Documento:</label>
          <input
            type="text"
            value={documento}
            onChange={(e) => setDocumento(e.target.value)}
          />

          <label>Tipo de Documento:</label>
          <select
            value={tipoDocumento}
            onChange={(e) => setTipoDocumento(e.target.value)}
          >
            <option value="">Seleccionar</option>
            <option value="CC">CC</option>
            <option value="TI">TI</option>
            <option value="CE">CE</option>
          </select>

          <label>Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />

          <label>Apellido:</label>
          <input
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
          />

          <label>Tipo de Persona:</label>
          <select
            value={tipoPersona}
            onChange={(e) => setTipoPersona(e.target.value)}
          >
            <option value="">Seleccionar</option>
            <option value="cliente">Cliente</option>
            <option value="proveedor">Proveedor</option>
          </select>
        </div>

        <div className="formulario-derecha">
          <div className="contacto-titulo">Contacto</div>

          <div className="contacto-container">
            {contactos.map((contacto, index) => (
              <div key={index} className="contacto-item">
                <select
                  value={contacto.tipo}
                  onChange={(e) =>
                    handleContactoChange(index, "tipo", e.target.value)
                  }
                >
                  <option value="">TipoContacto</option>
                  <option value="correo">Correo</option>
                  <option value="celular">Celular</option>
                </select>
                <input
                  type="text"
                  value={contacto.valor}
                  onChange={(e) =>
                    handleContactoChange(index, "valor", e.target.value)
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="direccion-titulo">Direccion</div>
      <div className="formulario-abajo2">
        <div className="formulario-abajo">
          {/* ... (Tipo via) */}

          <label>Tipo de Vía</label>
          <select value={tipoVia} onChange={(e) => setTipoVia(e.target.value)}>
            <option value="">Seleccionar</option>
            <option value="au">AU</option>
            <option value="ac">AC</option>
            <option value="cr">CR</option>
            <option value="cl">CL</option>
          </select>

          {/* ... (Numero o nombre via princ) */}

          <label># o nombre vía princial</label>
          <input type="text" />
          {/* ... (Letras asociadas a vía principal) */}

          <label>Letra/s vía principal</label>
          <input type="text" />
          {/* ... (Prefijo(BIS)) */}

          <label>Prefijo(BIS)</label>
          <select value={tipoVia} onChange={(e) => setTipoVia(e.target.value)}>
            <option value="BIS">Si</option>
            <option value="">No</option>
          </select>
          {/* ... (Letras prefijo) */}

          <label>Letras/s prefijo</label>
          <input type="text" />

          {/* ... (Cuadrante) */}
          <label>Cuadrante:</label>
          <select
            value={cuadrante}
            onChange={(e) => setCuadrante(e.target.value)}
          >
            <option value="">Seleccionar</option>
            <option value="norte">Norte</option>
            <option value="sur">Sur</option>
            <option value="este">Este</option>
            <option value="oeste">Oeste</option>
          </select>

          {/* ... (Numero via gen) */}
          <label>Núm vía generadora</label>
          <input type="text" />
        </div>

        <div className="formulario-abajo">
          {/* ... (Letras via generadora) */}
          <label>Letra/s vía generadora</label>
          <input type="text" />

          {/* ... (Sufjo(BIS)) */}
          <label>Sufijo(BIS)</label>
          <select value={tipoVia} onChange={(e) => setTipoVia(e.target.value)}>
            <option value="BIS">Si</option>
            <option value="">No</option>
          </select>
          {/* ... (Letras sufijo) */}
          <label>Letras/s sufijo</label>
          <input type="text" />

          {/* ... (Num placa) */}
          <label>Núm placa</label>
          <input type="text" />

          {/* ... (Cuadrante) */}
          <label>Cuadrante</label>
          <select
            value={cuadrante}
            onChange={(e) => setCuadrante(e.target.value)}
          >
            <option value="">Seleccionar</option>
            <option value="norte">Norte</option>
            <option value="sur">Sur</option>
            <option value="este">Este</option>
            <option value="oeste">Oeste</option>
          </select>

          {/* ... (Barrio(BR)) */}
          <label>Tipo Barrio</label>
          <select value={barrio} onChange={(e) => setBarrio(e.target.value)}>
            <option value="">Seleccionar</option>
            <option value="br">BR</option>
            <option value="sm">SM</option>
            <option value="m">M</option>
          </select>

          {/* ... (nom barrio) */}
          <label>Barrio</label>
          <input type="text" />
        </div>

        <div className="formulario-abajo">
          {/* ... (manzana) */}
          <label>Manzana:</label>
          <select value={manzana} onChange={(e) => setManzana(e.target.value)}>
            <option value="">Seleccionar</option>
            <option value="manzana">Manzana</option>
            <option value="interior">Interior</option>
            <option value="sector">Sector</option>
          </select>

          {/* ... (id manzana) */}
          <label>Id manzana</label>
          <input type="text" />

          {/* ... (urbanización) */}
          <label>Tipo Urbanización</label>
          <select
            value={urbanizacion}
            onChange={(e) => setUrbanizacion(e.target.value)}
          >
            <option value="">Seleccionar</option>
            <option value="BQ">BQ</option>
            <option value="CU">CU</option>
            <option value="CO">CO</option>
          </select>

          {/* ... (nom urba) */}
          <label>Nom urbanización</label>
          <input type="text" />

          {/* ... (Tipo predio) */}
          <label>Tipo de Predio:</label>
          <select
            value={tipoPredio}
            onChange={(e) => setTipoPredio(e.target.value)}
          >
            <option value="">Seleccionar</option>
            <option value="AL">AL</option>
            <option value="AP">AP</option>
            <option value="BG">BG</option>
          </select>

          {/* ... (id predio) */}
          <label>Id predio</label>
          <input type="text" />

          {/* ... (Complemento) */}
          <label>Complemento:</label>
          <select
            value={complemento}
            onChange={(e) => setComplemento(e.target.value)}
          >
            <option value="">Seleccionar</option>
            <option value="CS">CS</option>
            <option value="CU">CU</option>
            <option value="CE">CE</option>
          </select>
        </div>
      </div>
      <button className="registrar-btn">Registrar</button>
    </div>
  );
}
