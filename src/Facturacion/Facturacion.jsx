import React, { useState, useEffect } from "react";
import "./Facturacion.css";
import axios from "axios";

import { getGlobalValue,setGlobalValue } from '../App';
import { getEmpleado, setEmpleado } from '../App';

export function Facturar() {
  // Estados para almacenar datos y resultados

  const [tipoDocumento, setTipoDocumento] = useState([]);
  const [confirmationPersona, setConfirmationPersona] = useState('');
  const [persona, setPersona] = useState({
    IDTIPOPERSONA:'',
    IDTIPODOC:'',
    NDOCUMENTO:'',
    NOMBRE:'',
    APELLIDO:''
  });

  const [codigoProducto, setCodigoProducto] = useState("");
  const [precioProducto, setPrecioProducto] = useState("");
  const [productosEncontrados, setProductosEncontrados] = useState([]);
  const [cantidad, setCantidad] = useState("");
  const [estado, setEstado] = useState("");
  const [total, setTotal] = useState(0);
  

  const buscarPersona = async () => { 
    if(getGlobalValue()===1 || getGlobalValue()===4){
      const response = await axios.post('http://localhost:3001/api/buscarpersona', 
      { IDTIPOPERSONA: 2, IDTIPODOC: persona.IDTIPODOC ,NDOCUMENTO: persona.NDOCUMENTO });             
      if(Array.isArray(response.data) && response.data.length > 0){ 
        setConfirmationPersona('');          
        setPersona(prevPersona => ({
          ...prevPersona, 
          IDTIPOPERSONA: 2,        
          NOMBRE: response.data[0].NOMBRE, 
          APELLIDO: response.data[0].APELLIDO
        }));
      }else{
        setConfirmationPersona('No encontrado');
        setPersona(prevPersona => ({
          ...prevPersona,                   
          NOMBRE: '', 
          APELLIDO: ''
        }));
      }
    }else if(getGlobalValue()===2 || getGlobalValue()===3){
      const response = await axios.post('http://localhost:3001/api/buscarpersona', 
      { IDTIPOPERSONA: 1, IDTIPODOC: persona.IDTIPODOC ,NDOCUMENTO: persona.NDOCUMENTO });        
      if(Array.isArray(response.data) && response.data.length > 0){
        setConfirmationPersona('');
        console.log(response.data)      
        setPersona(prevPersona => ({
          ...prevPersona, 
          IDTIPOPERSONA: 1,        
          NOMBRE: response.data[0].NOMBRE, 
          APELLIDO: response.data[0].APELLIDO
        }));
      }else{
        setConfirmationPersona('No encontrado');
        setPersona(prevPersona => ({
          ...prevPersona,                   
          NOMBRE: '', 
          APELLIDO: ''
        }));
      }
    }      
  };

  // Función para manejar la búsqueda de productos
  const buscarProductos = () => {
    // Lógica para buscar productos según el códigoProducto
    // Actualizar el estado de productosEncontrados con el resultado
    const productosSimulados = [
      { nombre: "Producto 1", precio: "$10" },
      { nombre: "Producto 2", precio: "$20" },
      { nombre: "Producto 3", precio: "$15" },
      { nombre: "Producto 1", precio: "$10" },
      { nombre: "Producto 2", precio: "$20" },
      { nombre: "Producto 3", precio: "$15" },
      { nombre: "Producto 1", precio: "$10" },
      { nombre: "Producto 2", precio: "$20" },
      { nombre: "Producto 3", precio: "$15" },
      { nombre: "Producto 1", precio: "$10" },
      { nombre: "Producto 2", precio: "$20" },
      { nombre: "Producto 3", precio: "$15" },
      { nombre: "Producto 1", precio: "$10" },
      { nombre: "Producto 2", precio: "$20" },
      { nombre: "Producto 3", precio: "$15" },
      // Agrega más datos de prueba según sea necesario
    ];

    // Actualizar el estado de productosEncontrados con los datos simulados
    setProductosEncontrados(productosSimulados);
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
    fetchDataDoc(); 

    
  }, []);
 

  // Función para manejar la acción de totalizar
  const totalizar = () => {
    // Lógica para calcular el total (puedes reemplazar esto con tu lógica real)
    const totalCalculado = productosEncontrados.reduce(
      (acc, producto) => acc + parseFloat(producto.precio.replace("$", "")),
      0
    );
    setTotal(totalCalculado);
  };

  // Función para manejar la acción de guardar
  const guardar = () => {
    // Lógica para guardar (puedes implementar esto según tus necesidades)
  };

  // Función para manejar el preregistro
  const preregistrar = () => {
    // Lógica para preregistrar con cantidad y estado
  };

  return (
    <div className="container">
      {/* Sección de búsqueda de persona */}
      <div className="persona-section">
        <label className="label">Tipo de Documento:</label>
        <select className="select" value={persona.IDTIPODOC} onChange={(event) =>setPersona({...persona, IDTIPODOC: event.target.value,})} required>
          <option value="">Seleccionar Tipo Documento</option>
            {tipoDocumento.map((docuOption) => (
              <option key={docuOption.IDTIPODOC} value={docuOption.IDTIPODOC}>
                {docuOption.DESCTIPODOC}
              </option>
            ))}
        </select>

        <label className="label">Número de Documento:</label>
        <input className="input" type="text" value={persona.NDOCUMENTO} onChange={(event) =>setPersona({...persona, NDOCUMENTO: event.target.value,})} required/>

        <button className="button" onClick={buscarPersona}>
          Buscar Persona
        </button>

        {/* Mostrar el nombre y apellido de la persona */}
        {persona.NDOCUMENTO && persona.APELLIDO ?(
          <div>
            <div>{`Nombre: ${persona.NOMBRE}`}</div>
            <div>{`Apellido: ${persona.APELLIDO}`}</div>
          </div>
        ) : (
          <div>
            <div>{`Mensaje: ${confirmationPersona}`}</div>
          </div>
        )}
      </div>

      {/* Sección de búsqueda de productos y resultados */}
      <div className="productos-section">
        <div className="productos-izquierda">
          <label className="label">Código de Producto:</label>
          <input
            className="input"
            type="text"
            value={codigoProducto}
            onChange={(e) => setCodigoProducto(e.target.value)}
          />
          <label className="label">Precio del Producto:</label>
          <input
            className="input"
            type="text"
            value={precioProducto}
            onChange={(e) => setPrecioProducto(e.target.value)}
          />
          <button className="button" onClick={buscarProductos}>
            Buscar Productos
          </button>
          <label className="label">Cantidad:</label>
          <input
            className="input"
            type="text"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
          />
          <label className="label">Estado:</label>
          <input
            className="input"
            type="text"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
          />

          {/* Mostrar "Aceptado" o "No hay" según el estado */}
          {cantidad && estado && (
            <div>{estado === "aceptado" ? "Aceptado" : "No hay"}</div>
          )}
          <button className="preregistro-button" onClick={preregistrar}>
            Preregistrar
          </button>
        </div>

        <div className="productos-derecha">
          <div className="scroll-container">
            {/* Mostrar la lista de productos encontrados */}
            {productosEncontrados.map((producto, index) => (
              <div key={index} className="product-item">
                {producto.nombre} - {producto.precio}
              </div>
            ))}
          </div>
          <div className="botones-section">
            <button className="button" onClick={totalizar}>
              Totalizar
            </button>
            <label className="total-label">{`Total: $${total.toFixed(
              2
            )}`}</label>
            <br />
            <button className="button-guardar" onClick={guardar}>
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
