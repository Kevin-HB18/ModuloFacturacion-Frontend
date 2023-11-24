// RegistroPersonas.js
import React, { useState, useEffect } from "react";
import "./Registro.css";
import axios from "axios";


import { getGlobalValue,setGlobalValue } from '../App';
export function Registrar() {
  console.log(getGlobalValue());
  const [confirmationMessage, setConfirmationMessage] = useState(null);
  const [totaldirecc, setTotalDirecc] = useState(0);  

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
    {IDTIPOCONTACTO:'', DESCTIPOCONTACTO:'', IDTIPOPERSONA:persona.IDTIPOPERSONA, IDTIPODOC:persona.IDTIPODOC, NDOCUMENTO:persona.NDOCUMENTO, DESCCONTACTO:''},
    {IDTIPOCONTACTO:'', DESCTIPOCONTACTO:'', IDTIPOPERSONA:persona.IDTIPOPERSONA, IDTIPODOC:persona.IDTIPODOC, NDOCUMENTO:persona.NDOCUMENTO, DESCCONTACTO:''},
    {IDTIPOCONTACTO:'', DESCTIPOCONTACTO:'', IDTIPOPERSONA:persona.IDTIPOPERSONA, IDTIPODOC:persona.IDTIPODOC, NDOCUMENTO:persona.NDOCUMENTO, DESCCONTACTO:''},
    {IDTIPOCONTACTO:'', DESCTIPOCONTACTO:'', IDTIPOPERSONA:persona.IDTIPOPERSONA, IDTIPODOC:persona.IDTIPODOC, NDOCUMENTO:persona.NDOCUMENTO, DESCCONTACTO:''}
  ]);

  const [tipoVia, setTipoVia] = useState([]);
  const [tipocuadrante, setTipoCuadrante] = useState([]);
  const [tipobarrio, setTipoBarrio] = useState([]);
  const [tipourbanizacion, setTipoUrbanizacion] = useState([]);
  const [tipomanzana, setTipoManzana] = useState([]);
  const [tipoPredio, setTipoPredio] = useState([]);
  const [tipocomplemento, setTipoComplemento] = useState([]); 

  const [dir1, setDir1] = useState({ POSICION: 1, IDNOMEN: '', VALORDIRECC: null });
  const [dir2, setDir2] = useState({ POSICION: 2, IDNOMEN: null, VALORDIRECC: '' });
  const [dir3, setDir3] = useState({ POSICION: 3, IDNOMEN: null, VALORDIRECC: '' });
  const [dir4, setDir4] = useState({ POSICION: 4, IDNOMEN: null, VALORDIRECC: '' });
  const [dir5, setDir5] = useState({ POSICION: 5, IDNOMEN: null, VALORDIRECC: '' });
  const [dir6, setDir6] = useState({ POSICION: 6, IDNOMEN: '', VALORDIRECC: null });
  const [dir7, setDir7] = useState({ POSICION: 7, IDNOMEN: null, VALORDIRECC: '' });
  const [dir8, setDir8] = useState({ POSICION: 8, IDNOMEN: null, VALORDIRECC: '' });
  const [dir9, setDir9] = useState({ POSICION: 9, IDNOMEN: null, VALORDIRECC: '' });
  const [dir10, setDir10] = useState({ POSICION: 10, IDNOMEN: null, VALORDIRECC: '' });
  const [dir11, setDir11] = useState({ POSICION: 11, IDNOMEN: null, VALORDIRECC: '' });
  const [dir12, setDir12] = useState({ POSICION: 12, IDNOMEN: null, VALORDIRECC: '' });
  const [dir13, setDir13] = useState({ POSICION: 13, IDNOMEN: '', VALORDIRECC: null });
  const [dir14, setDir14] = useState({ POSICION: 14, IDNOMEN: null, VALORDIRECC: '' });
  const [dir15, setDir15] = useState({ POSICION: 15, IDNOMEN: '', VALORDIRECC: null });
  const [dir16, setDir16] = useState({ POSICION: 16, IDNOMEN: null, VALORDIRECC: '' });
  const [dir17, setDir17] = useState({ POSICION: 17, IDNOMEN: '', VALORDIRECC: null });
  const [dir18, setDir18] = useState({ POSICION: 18, IDNOMEN: null, VALORDIRECC: '' });
  const [dir19, setDir19] = useState({ POSICION: 19, IDNOMEN: '', VALORDIRECC: null });
  const [dir20, setDir20] = useState({ POSICION: 20, IDNOMEN: null, VALORDIRECC: '' });
  const [dir21, setDir21] = useState({ POSICION: 21, IDNOMEN: '', VALORDIRECC: null });
 

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

    const fetchDataPushPersona = async () => {
      try {
        const response = await axios.post('http://localhost:3001/api/verificarRegistro', 
        { IDTIPOPERSONA: persona.IDTIPOPERSONA, IDTIPODOC: persona.IDTIPODOC ,NDOCUMENTO: persona.NDOCUMENTO });       
        if (response.data.exists) {
            setConfirmationMessage('Ya existe un registro en la BD');
        } else {
            // Si no existe, realizar el registro
            setConfirmationMessage('Registro exitoso');
            await axios.post('http://localhost:3001/api/insertarPersona', persona);            
        }  
      } catch (error) {
      console.error("Error al mandar personas", error);
      }          
    };

    const fetchDataPushContacto = async (i) => {
      try {
        if(contacto[i].IDTIPOCONTACTO!=='' && contacto[i].DESCCONTACTO!=='')
          await axios.post('http://localhost:3001/api/insertarcontacto', {IDTIPOCONTACTO: contacto[i].IDTIPOCONTACTO, DESCTIPOCONTACTO: contacto[i].DESCTIPOCONTACTO, IDTIPOPERSONA:persona.IDTIPOPERSONA, IDTIPODOC:persona.IDTIPODOC, NDOCUMENTO: persona.NDOCUMENTO, DESCCONTACTO: contacto[i].DESCCONTACTO });
      } catch (error) {
      console.error("Error al mandar contactos", error);
      }          
    };

    const fetchDataPushDireccion = async (posicion,idnomen,valordirecc) =>{
      try {
        if((idnomen!=='' && valordirecc===null) || (idnomen===null && valordirecc!==''))
          await axios.post('http://localhost:3001/api/insertardireccion', {POSICION: posicion, IDDIRECCION: totaldirecc, IDTIPOPERSONA:persona.IDTIPOPERSONA, IDTIPODOC:persona.IDTIPODOC, NDOCUMENTO: persona.NDOCUMENTO, IDNOMEN: idnomen, VALORDIREC: valordirecc});
      } catch (error) {
      console.error("Error al mandar direcciones", error);
      }   
    };

    const fetchDataObtainDirecc = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/obtenerregistrosdireccion');       
        setTotalDirecc(response.data);
        console.log(response.data);        
      } catch (error) {
      console.error("Error al mandar contactos", error);
      }          
    };
  
    const handleSubmit  = async (e) => {
      e.preventDefault();
      setConfirmationMessage('');
      try {               
        fetchDataPushPersona();
        fetchDataObtainDirecc();   

        setTimeout(() => {          
          fetchDataPushContacto(0);          
        }, 4000);
        setTimeout(() => {         
          fetchDataPushContacto(1);          
        }, 4000); 
        setTimeout(() => {          
          fetchDataPushContacto(2);          
        }, 4000);
        setTimeout(() => {          
          fetchDataPushContacto(3);         
        }, 4000);               
               
       
        

        //---------insertar direccion-------------        
        setTimeout(() => {          
          fetchDataPushDireccion(dir1.POSICION,dir1.IDNOMEN,dir1.VALORDIRECC);      
        }, 2000);        

        setTimeout(() => {          
          fetchDataPushDireccion(dir2.POSICION,dir2.IDNOMEN,dir2.VALORDIRECC);     
        }, 2000);        

        setTimeout(() => {          
          fetchDataPushDireccion(dir3.POSICION,dir3.IDNOMEN,dir3.VALORDIRECC);     
        }, 2000);   
        

        setTimeout(() => {          
          fetchDataPushDireccion(dir4.POSICION,dir4.IDNOMEN,dir4.VALORDIRECC);     
        }, 2000);        
        

        setTimeout(() => {          
          fetchDataPushDireccion(dir5.POSICION,dir5.IDNOMEN,dir5.VALORDIRECC);     
        }, 2000);        
        

        setTimeout(() => {          
          fetchDataPushDireccion(dir6.POSICION,dir6.IDNOMEN,dir6.VALORDIRECC);     
        }, 2000);        
        

        setTimeout(() => {          
          fetchDataPushDireccion(dir7.POSICION,dir7.IDNOMEN,dir7.VALORDIRECC);     
        }, 2000);        
        

        setTimeout(() => {          
          fetchDataPushDireccion(dir8.POSICION,dir8.IDNOMEN,dir8.VALORDIRECC);     
        }, 2000);        
        

        setTimeout(() => {          
          fetchDataPushDireccion(dir9.POSICION,dir9.IDNOMEN,dir9.VALORDIRECC);     
        }, 2000);        
        

        setTimeout(() => {          
          fetchDataPushDireccion(dir10.POSICION,dir10.IDNOMEN,dir10.VALORDIRECC);     
        }, 2000);        
       

        setTimeout(() => {          
          fetchDataPushDireccion(dir11.POSICION,dir11.IDNOMEN,dir11.VALORDIRECC);     
        }, 2000);        
        

        setTimeout(() => {          
          fetchDataPushDireccion(dir12.POSICION,dir12.IDNOMEN,dir12.VALORDIRECC);     
        }, 2000);        
       

        setTimeout(() => {          
          fetchDataPushDireccion(dir13.POSICION,dir13.IDNOMEN,dir13.VALORDIRECC);     
        }, 2000);        
        

        setTimeout(() => {          
          fetchDataPushDireccion(dir14.POSICION,dir14.IDNOMEN,dir14.VALORDIRECC);     
        }, 2000);        
        

        setTimeout(() => {          
          fetchDataPushDireccion(dir15.POSICION,dir15.IDNOMEN,dir15.VALORDIRECC);     
        }, 2000);        
        

        setTimeout(() => {          
          fetchDataPushDireccion(dir16.POSICION,dir16.IDNOMEN,dir16.VALORDIRECC);     
        }, 2000);        
        

        setTimeout(() => {          
          fetchDataPushDireccion(dir17.POSICION,dir17.IDNOMEN,dir17.VALORDIRECC);     
        }, 2000);        
        

        setTimeout(() => {          
          fetchDataPushDireccion(dir18.POSICION,dir18.IDNOMEN,dir18.VALORDIRECC);     
        }, 2000);        
        

        setTimeout(() => {          
          fetchDataPushDireccion(dir19.POSICION,dir19.IDNOMEN,dir19.VALORDIRECC);     
        }, 2000);        
        

        setTimeout(() => {          
          fetchDataPushDireccion(dir20.POSICION,dir20.IDNOMEN,dir20.VALORDIRECC);     
        }, 2000);        
        

        setTimeout(() => {          
          fetchDataPushDireccion(dir21.POSICION,dir21.IDNOMEN,dir21.VALORDIRECC);     
        }, 2000);        
        
     


        } catch (error) {
        console.error('Error al verificar o enviar el registro:', error);
        }
    }

  return (
    <div className="registro-container">
      <form onSubmit={handleSubmit}>
        <div className="formulario-arriba">
          <div className="formulario-izquierda">
            <label>Número de Documento:</label>
            <input type="text" value={persona.NDOCUMENTO} onChange={(event) =>{setPersona({...persona, NDOCUMENTO: event.target.value,}); fetchDataObtainDirecc(); }} required/>

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
                <select
                  value={JSON.stringify({ IDTIPOCONTACTO: contactoItem.IDTIPOCONTACTO, DESCTIPOCONTACTO: contactoItem.DESCTIPOCONTACTO })}
                  onChange={(event) => {
                    if(event.target.value!==""){
                    const { IDTIPOCONTACTO, DESCTIPOCONTACTO } = JSON.parse(event.target.value);
                    const updatedContacto = [...contacto];
                    updatedContacto[index] = {
                      ...updatedContacto[index],
                      IDTIPOCONTACTO,
                      DESCTIPOCONTACTO
                    };
                    setContacto(updatedContacto);
                    }
                  }}
                >
                  <option value="">TipoContacto</option>
                  {tipocontacto.map((docuOption) => (
                    <option
                      key={docuOption.IDTIPOCONTACTO}
                      value={JSON.stringify({ IDTIPOCONTACTO: docuOption.IDTIPOCONTACTO, DESCTIPOCONTACTO: docuOption.DESCTIPOCONTACTO })}
                    >
                      {docuOption.DESCTIPOCONTACTO}
                    </option>
                  ))}
                </select>

                <input type="text" value={contactoItem.valor} 
                  onChange={(e) => {
                    const updatedContacto = [...contacto]; // Haciendo una copia del estado actual
                    updatedContacto[index] = {
                      ...updatedContacto[index],
                      DESCCONTACTO: e.target.value,
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
            <select value={dir1.IDNOMEN} onChange={(event) =>setDir1({...dir1, IDNOMEN: event.target.value,})} required>
              <option value="">Seleccionar</option>
              {tipoVia.map((docuOption) => (
                <option key={docuOption.IDNOMEN} value={docuOption.IDNOMEN}>
                  {docuOption.DESCNOMEN}
                </option>
              ))}
            </select>

            {/* ... (Numero o nombre via princ) */}

            <label># o nombre vía princial</label>
            <input type="text" value={dir2.VALORDIRECC} onChange={(event) =>setDir2({...dir2, VALORDIRECC: event.target.value,})} />
            {/* ... (Letras asociadas a vía principal) */}

            <label>Letra/s vía principal</label>
            <input type="text" value={dir3.VALORDIRECC} onChange={(event) =>setDir3({...dir3, VALORDIRECC: event.target.value,})}/>
            {/* ... (Prefijo(BIS)) */}

            <label>Prefijo(BIS)</label>
            <select value={dir4.VALORDIRECC} onChange={(event) =>setDir4({...dir4, VALORDIRECC: event.target.value,})}>
              <option value="BIS">Si</option>
              <option value="">No</option>
            </select>
            {/* ... (Letras prefijo) */}

            <label>Letras/s prefijo</label>
            <input type="text" value={dir5.VALORDIRECC} onChange={(event) =>setDir5({...dir5, VALORDIRECC: event.target.value,})} />

            {/* ... (Cuadrante) */}
            <label>Cuadrante:</label>
            <select value={dir6.IDNOMEN} onChange={(event) =>setDir6({...dir6, IDNOMEN: event.target.value,})}>
              <option value="">Seleccionar</option>
              {tipocuadrante.map((docuOption) => (
                <option key={docuOption.IDNOMEN} value={docuOption.IDNOMEN}>
                  {docuOption.DESCNOMEN}
                </option>
              ))}
            </select>

            {/* ... (Numero via gen) */}
            <label>Núm vía generadora</label>
            <input type="text" value={dir7.VALORDIRECC} onChange={(event) =>setDir7({...dir7, VALORDIRECC: event.target.value,})} required/>
          </div>

          <div className="formulario-abajo">
            {/* ... (Letras via generadora) */}
            <label>Letra/s vía generadora</label>
            <input type="text" value={dir8.VALORDIRECC} onChange={(event) =>setDir8({...dir8, VALORDIRECC: event.target.value,})}/>

            {/* ... (Sufjo(BIS)) */}
            <label>Sufijo(BIS)</label>
            <select value={dir9.VALORDIRECC} onChange={(event) =>setDir9({...dir9, VALORDIRECC: event.target.value,})}>
              <option value="BIS">Si</option>
              <option value="">No</option>
            </select>
            {/* ... (Letras sufijo) */}
            <label>Letras/s sufijo</label>
            <input type="text" value={dir10.VALORDIRECC} onChange={(event) =>setDir10({...dir10, VALORDIRECC: event.target.value,})}/>

            {/* ... (Num placa) */}
            <label>Núm placa</label>
            <input type="text" value={dir11.VALORDIRECC} onChange={(event) =>setDir11({...dir11, VALORDIRECC: event.target.value,})} required/>

            {/* ... (Cuadrante) */}
            <label>Cuadrante</label>
            <select value={dir12.VALORDIRECC} onChange={(event) =>setDir12({...dir12, VALORDIRECC: event.target.value,})} >
              <option value="">Seleccionar</option>
              <option value="norte">Norte</option>
              <option value="sur">Sur</option>
              <option value="este">Este</option>
              <option value="oeste">Oeste</option>
            </select>

            {/* ... (Barrio(BR)) */}
            <label>Tipo Barrio</label>
            <select value={dir13.IDNOMEN} onChange={(event) =>setDir13({...dir13, IDNOMEN: event.target.value,})}>
              <option value="">Seleccionar</option>
              {tipobarrio.map((docuOption) => (
                <option key={docuOption.IDNOMEN} value={docuOption.IDNOMEN}>
                  {docuOption.DESCNOMEN}
                </option>
              ))}
            </select>

            {/* ... (nom barrio) */}
            <label>Barrio</label>
            <input type="text" value={dir14.VALORDIRECC} onChange={(event) =>setDir14({...dir14, VALORDIRECC: event.target.value,})} required/>
          </div>

          <div className="formulario-abajo">
            {/* ... (manzana) */}
            <label>Manzana:</label>
            <select value={dir15.IDNOMEN} onChange={(event) =>setDir15({...dir15, IDNOMEN: event.target.value,})}>
              <option value="">Seleccionar</option>
              {tipomanzana.map((docuOption) => (
                <option key={docuOption.IDNOMEN} value={docuOption.IDNOMEN}>
                  {docuOption.DESCNOMEN}
                </option>
              ))}
            </select>

            {/* ... (id manzana) */}
            <label>Id manzana</label>
            <input type="text" value={dir16.VALORDIRECC} onChange={(event) =>setDir16({...dir16, VALORDIRECC: event.target.value,})}/>

            {/* ... (urbanización) */}
            <label>Tipo Urbanización</label>
            <select value={dir17.IDNOMEN} onChange={(event) =>setDir17({...dir17, IDNOMEN: event.target.value,})}>
              <option value="">Seleccionar</option>
              {tipourbanizacion.map((docuOption) => (
                <option key={docuOption.IDNOMEN} value={docuOption.IDNOMEN}>
                  {docuOption.DESCNOMEN}
                </option>
              ))}
            </select>

            {/* ... (nom urba) */}
            <label>Nom urbanización</label>
            <input type="text" value={dir18.VALORDIRECC} onChange={(event) =>setDir18({...dir18, VALORDIRECC: event.target.value,})}/>

            {/* ... (Tipo predio) */}
            <label>Tipo de Predio:</label>
            <select value={dir19.IDNOMEN} onChange={(event) =>setDir19({...dir19, IDNOMEN: event.target.value,})}>
              <option value="">Seleccionar</option>
              {tipoPredio.map((docuOption) => (
                <option key={docuOption.IDNOMEN} value={docuOption.IDNOMEN}>
                  {docuOption.DESCNOMEN}
                </option>
              ))}
            </select>

            {/* ... (id predio) */}
            <label>Id predio</label>
            <input type="text" value={dir20.VALORDIRECC} onChange={(event) =>setDir20({...dir20, VALORDIRECC: event.target.value,})} />

            {/* ... (Complemento) */}
            <label>Complemento:</label>
            <select value={dir21.IDNOMEN} onChange={(event) =>setDir21({...dir21, IDNOMEN: event.target.value,})} >
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
        {confirmationMessage && <div className="confirmation-message">{confirmationMessage}</div>}
      </form>  
    </div>
  );
}
