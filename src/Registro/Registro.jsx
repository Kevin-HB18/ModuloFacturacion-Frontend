// RegistroPersonas.js
import React, { useState, useEffect } from "react";
import "./Registro.css";
import axios from "axios";


export function Registrar() {

  const [tipoDocumento, setTipoDocumento] = useState([]);
  const [tipoPersona, setTipoPersona] = useState([]);

  const [tipocontacto, setTipoContacto] = useState([
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

  const [contacto, setContacto] = useState([
    {IDTIPOCONTACTO:'', DESCTIPOCONTACTO:'', IDTIPOPERSONA:'', IDTIPODOC:'', NDOCUMENTO:'', DESCCONTACTO:''},
    {IDTIPOCONTACTO:'', DESCTIPOCONTACTO:'', IDTIPOPERSONA:'', IDTIPODOC:'', NDOCUMENTO:'', DESCCONTACTO:''},
    {IDTIPOCONTACTO:'', DESCTIPOCONTACTO:'', IDTIPOPERSONA:'', IDTIPODOC:'', NDOCUMENTO:'', DESCCONTACTO:''},
    {IDTIPOCONTACTO:'', DESCTIPOCONTACTO:'', IDTIPOPERSONA:'', IDTIPODOC:'', NDOCUMENTO:'', DESCCONTACTO:''}
  ]);

  const [tipoVia, setTipoVia] = useState([]);
  const [tipocuadrante, setTipoCuadrante] = useState([]);
  const [tipobarrio, setTipoBarrio] = useState([]);
  const [tipourbanizacion, setTipoUrbanizacion] = useState([]);
  const [tipomanzana, setTipoManzana] = useState([]);
  const [tipoPredio, setTipoPredio] = useState([]);
  const [tipocomplemento, setTipoComplemento] = useState([]); 


  const [numnomviaprinc, setnumnomviaprinc] = useState("");
  const [letrasviaprinc, setletrasviaprinc] = useState("");
  const [prefijobis, setprefijobis] = useState("");
  const [letrasprefijo, setletrasprefijo] = useState("");  
  const [numviagen, setnumviagen] = useState("");
  const [letrasviagen, setletrasviagen] = useState("");
  const [sufijobis, setsufijobis] = useState("");
  const [letrassufijo, setletrassufijo] = useState("");  
 

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
      setTipoContacto(response.data);
      } catch (error) {
      console.error("Error al obtener los tipos de cargo", error);
      }
    };

    //-------------------------------Nomenclaturas----------------------
    const fetchDataTipoVia = async () => {
      try {
      const response = await axios.get("http://localhost:3001/api/obtenertipovia");
      setTipoVia(response.data);
      } catch (error) {
      console.error("Error al obtener los tipos de cargo", error);
      }
    };

    const fetchDataTipoCuadrante = async () => {
      try {
      const response = await axios.get("http://localhost:3001/api/obtenertipocuadrante");
      setTipoCuadrante(response.data);
      } catch (error) {
      console.error("Error al obtener los tipos de cargo", error);
      }
    };

    const fetchDataTipoBarrio = async () => {
      try {
      const response = await axios.get("http://localhost:3001/api/obtenertipobarrio");
      setTipoBarrio(response.data);
      } catch (error) {
      console.error("Error al obtener los tipos de cargo", error);
      }
    };

    const fetchDataTipoUrbanizacion = async () => {
      try {
      const response = await axios.get("http://localhost:3001/api/obtenertipourbanizacion");
      setTipoUrbanizacion(response.data);
      } catch (error) {
      console.error("Error al obtener los tipos de cargo", error);
      }
    };

    const fetchDataTipoManzana = async () => {
      try {
      const response = await axios.get("http://localhost:3001/api/obtenertipomanzana");
      setTipoManzana(response.data);
      } catch (error) {
      console.error("Error al obtener los tipos de cargo", error);
      }
    };

    const fetchDataTipoPredio = async () => {
      try {
      const response = await axios.get("http://localhost:3001/api/obtenertipopredio");
      setTipoPredio(response.data);
      } catch (error) {
      console.error("Error al obtener los tipos de cargo", error);
      }
    };

    const fetchDataTipoComplemento = async () => {
      try {
      const response = await axios.get("http://localhost:3001/api/obtenertipocomplemento");
      setTipoComplemento(response.data);
      } catch (error) {
      console.error("Error al obtener los tipos de cargo", error);
      }
    };
    // Llama a la función asincrónica para obtener los datos
    fetchDataDoc(); 
    fetchDataPersona(); 
    fetchDataContacto();

    fetchDataTipoVia();
    fetchDataTipoCuadrante();
    fetchDataTipoBarrio();
    fetchDataTipoUrbanizacion();
    fetchDataTipoManzana();
    fetchDataTipoPredio();
    fetchDataTipoComplemento();

    }, []);

    const handleSubmit  = async (e) => {
      e.preventDefault();
    }

  return (
    <div className="registro-container">
      <form onSubmit={handleSubmit}>
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
            {/*----------------------------Contactos----------------------------*/}  
            {contacto.map((contactoItem, index) => (              
              <div key={index} className="contacto-item">
                <select value={contactoItem.IDTIPOCONTACTO} 
                  onChange={(event) => {
                    const updatedContacto = [...contacto]; // Haciendo una copia del estado actual
                    updatedContacto[index] = {
                      ...updatedContacto[index],
                      IDTIPOCONTACTO: event.target.value,
                    };
                    setContacto(updatedContacto); // Actualizando el estado con el nuevo valor
                  }}
                >
                  <option value="">TipoContacto</option>
                  {tipocontacto.map((docuOption) => (
                    <option key={docuOption.IDTIPOCONTACTO} value={docuOption.IDTIPOCONTACTO}>
                      {docuOption.DESCTIPOCONTACTO}
                    </option>
                  ))}
                </select>
                <input type="text" value={contactoItem.valor} 
                  onChange={(e) => {
                    const updatedContacto = [...contacto]; // Haciendo una copia del estado actual
                    updatedContacto[index] = {
                      ...updatedContacto[index],
                      valor: e.target.value,
                    };
                    setContacto(updatedContacto); // Actualizando el estado con el nuevo valor
                  }}
                />
              </div>
            ))}

            {/*----------------------------------contactos-----------------------*/}
            </div>
          </div>

        </div>
        {/*-------------------------------------DIRECCIONES------------------------- */}
        <div className="direccion-titulo">Direccion</div>
        <div className="formulario-abajo2">
          <div className="formulario-abajo">
            {/* ... (Tipo via) */}

            <label>Tipo de Vía</label>
            <select required>
              <option value="">Seleccionar</option>
              {tipoVia.map((docuOption) => (
                <option key={docuOption.IDNOMEN} value={docuOption.IDNOMEN}>
                  {docuOption.DESCNOMEN}
                </option>
              ))}
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
            <select>
              <option value="">Seleccionar</option>
              {tipocuadrante.map((docuOption) => (
                <option key={docuOption.IDNOMEN} value={docuOption.IDNOMEN}>
                  {docuOption.DESCNOMEN}
                </option>
              ))}
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
            <select >
              <option value="">Seleccionar</option>
              <option value="norte">Norte</option>
              <option value="sur">Sur</option>
              <option value="este">Este</option>
              <option value="oeste">Oeste</option>
            </select>

            {/* ... (Barrio(BR)) */}
            <label>Tipo Barrio</label>
            <select >
              <option value="">Seleccionar</option>
              {tipobarrio.map((docuOption) => (
                <option key={docuOption.IDNOMEN} value={docuOption.IDNOMEN}>
                  {docuOption.DESCNOMEN}
                </option>
              ))}
            </select>

            {/* ... (nom barrio) */}
            <label>Barrio</label>
            <input type="text" />
          </div>

          <div className="formulario-abajo">
            {/* ... (manzana) */}
            <label>Manzana:</label>
            <select >
              <option value="">Seleccionar</option>
              {tipomanzana.map((docuOption) => (
                <option key={docuOption.IDNOMEN} value={docuOption.IDNOMEN}>
                  {docuOption.DESCNOMEN}
                </option>
              ))}
            </select>

            {/* ... (id manzana) */}
            <label>Id manzana</label>
            <input type="text" />

            {/* ... (urbanización) */}
            <label>Tipo Urbanización</label>
            <select >
              <option value="">Seleccionar</option>
              {tipourbanizacion.map((docuOption) => (
                <option key={docuOption.IDNOMEN} value={docuOption.IDNOMEN}>
                  {docuOption.DESCNOMEN}
                </option>
              ))}
            </select>

            {/* ... (nom urba) */}
            <label>Nom urbanización</label>
            <input type="text" />

            {/* ... (Tipo predio) */}
            <label>Tipo de Predio:</label>
            <select >
              <option value="">Seleccionar</option>
              {tipoPredio.map((docuOption) => (
                <option key={docuOption.IDNOMEN} value={docuOption.IDNOMEN}>
                  {docuOption.DESCNOMEN}
                </option>
              ))}
            </select>

            {/* ... (id predio) */}
            <label>Id predio</label>
            <input type="text" />

            {/* ... (Complemento) */}
            <label>Complemento:</label>
            <select      >
              <option value="">Seleccionar</option>
              {tipocomplemento.map((docuOption) => (
                <option key={docuOption.IDNOMEN} value={docuOption.IDNOMEN}>
                  {docuOption.DESCNOMEN}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button className="registrar-btn">Registrar</button>
      </form>  
    </div>
  );
}
