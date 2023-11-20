// RegistroPersonas.js
import React, { useState, useEffect } from "react";
import "./Registro.css";
import axios from "axios";


export function Registrar() {

  const [tipoDocumento, setTipoDocumento] = useState([]);
  const [tipoPersona, setTipoPersona] = useState([]);

  const [contactos, setContactos] = useState([
    { tipo: "", valor: "" },
    { tipo: "", valor: "" },
    { tipo: "", valor: "" },
    { tipo: "", valor: "" },
  ]);

  const [persona, setPersona] = useState({
    IDTIPOPERSONA:'',
    IDTIPODOC:'',
    NDOCUMENTO:'',
    NOMBRE:'',
    APELLIDO:''
  });

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



  const handleContactoChange = (index, key, value) => {
    const updatedContactos = [...contactos];
    updatedContactos[index][key] = value;
    setContactos(updatedContactos);
  };

  useEffect(() => {
    const fetchDataDoc = async () => {
        try {
        const response = await axios.get("http://localhost:3001/api/obtenertipodoc");
        setTipoDocumento(response.data);
        } catch (error) {
        console.error("Error al obtener los tipos de cargo", error);
        }
    };
    const fetchDataPersona = async () => {
      try {
      const response = await axios.get("http://localhost:3001/api/obtenertipopersona");
      setTipoPersona(response.data);
      } catch (error) {
      console.error("Error al obtener los tipos de cargo", error);
      }
    };

    const fetchDataContacto = async () => {
      try {
      const response = await axios.get("http://localhost:3001/api/obtenertipocontact");
      setContactos(response.data);
      } catch (error) {
      console.error("Error al obtener los tipos de cargo", error);
      }
    };

    fetchDataDoc(); // Llama a la función asincrónica para obtener los datos
    fetchDataPersona(); 
    fetchDataContacto();

    }, []);

  return (
    <div className="registro-container">
      <div className="formulario-arriba">
        <div className="formulario-izquierda">
          <label>Número de Documento:</label>
          <input type="text" value={persona.NDOCUMENTO} onChange={(event) =>setPersona({...persona, NDOCUMENTO: event.target.value,})} required/>

          <label>Tipo de Documento:</label>
          <select  value={persona.IDTIPODOC} onChange={(event) =>setPersona({...persona, IDTIPODOC: event.target.value,})} required>
          <option value="">Seleccionar Tipo Documento</option>
            {tipoDocumento.map((docuOption) => (
              <option key={docuOption.IDTIPODOC} value={docuOption.IDTIPODOC}>
                {docuOption.DESCTIPODOC}
              </option>
            ))}
          </select>

          <label>Nombre:</label>
          <input type="text"  value={persona.NOMBRE} onChange={(event) =>setPersona({...persona, NOMBRE: event.target.value,})} required/>

          <label>Apellido:</label>
          <input type="text" value={persona.APELLIDO} onChange={(event) =>setPersona({...persona, APELLIDO: event.target.value,})} required/>

          <label>Tipo de Persona:</label>
          <select  value={persona.IDTIPOPERSONA} onChange={(event) =>setPersona({...persona, IDTIPOPERSONA: event.target.value,})} required>
            <option value="">Seleccionar</option>
            {tipoPersona.map((docuOption) => (
              <option key={docuOption.IDTIPOPERSONA} value={docuOption.IDTIPOPERSONA}>
                {docuOption.DESCTIPOPERSONA}
              </option>
            ))}
          </select>
        </div>

        <div className="formulario-derecha">
          <div className="contacto-titulo">Contacto</div>

          <div className="contacto-container">
            {contactos.map((contacto, index) => (
              <div key={index} className="contacto-item">
                <select>
                  <option value="">TipoContacto</option>
                  {contactos.map((docuOption) => (
                    <option key={docuOption.IDTIPOCONTACTO} value={docuOption.IDTIPOCONTACTO}>
                      {docuOption.DESCTIPOCONTACTO}
                    </option>
                  ))}
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
