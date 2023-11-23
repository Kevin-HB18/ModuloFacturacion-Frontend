import React, { useState, useEffect } from "react";
import "./Facturacion.css";
import axios from "axios";

import { getGlobalValue,setGlobalValue } from '../App';
import { getEmpleado, setEmpleado } from '../App';

export function Facturar() {
  // Estados para almacenar datos y resultados

  const [tipoDocumento, setTipoDocumento] = useState([]);
  const [tipoCatProducto, setTipoCatProducto] = useState([]);  
  const [confirmationPersona, setConfirmationPersona] = useState('');
  const [confirmationProducto, setConfirmationProducto] = useState('');
  const [confirmationEstado, setConfirmationEstado] = useState('');
  const [validarBusquedaProducto, setValidarBusquedaProducto] =useState(false);

  const [persona, setPersona] = useState({
    IDTIPOPERSONA:'',
    IDTIPODOC:'',
    NDOCUMENTO:'',
    NOMBRE:'',
    APELLIDO:''
  });

  const [producto, setProducto] = useState({
    REFPRODUCTO:'',
    IDCATPRODUCTO:'',
    NOMPRODUCTO:'',
    PRECIO:'',
    CANTIDAD:0
  })

  
  const [productosEncontrados, setProductosEncontrados] = useState([]);  
  const [total, setTotal] = useState(0);

  const agregarProducto = (nuevoProducto) => {
    setProductosEncontrados((prevProductos) => prevProductos.concat(nuevoProducto));
  };
  

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
  const buscarProductos = async () => {
    const response = await axios.post('http://localhost:3001/api/buscarproducto', 
      { REFPRODUCTO: producto.REFPRODUCTO, IDCATPRODUCTO: producto.IDCATPRODUCTO});        
      if(Array.isArray(response.data) && response.data.length > 0){
        setConfirmationProducto('');
        console.log(response.data)      
        setProducto(prevProducto => ({
          ...prevProducto, 
          NOMPRODUCTO: response.data[0].NOMPRODUCTO,        
          PRECIO: response.data[0].VALOR          
        }));
        setValidarBusquedaProducto(true);
      }else{
        setConfirmationProducto('Producto no encontrado');
        setProducto(prevProducto => ({
          ...prevProducto,                   
          NOMPRODUCTO: '',        
          PRECIO: ''    
        }));
      }
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
    const fetchDataCatProducto = async () => {
      try {
      const response = await axios.get("http://localhost:3001/api/obtenercatproducto");
      setTipoCatProducto(response.data);
      } catch (error) {
      console.error("Error al obtener los tipos de cargo", error);
      }
    };
    fetchDataDoc();
    fetchDataCatProducto(); 

    
  }, []);
 

  // Función para manejar la acción de totalizar
  const totalizar = () => {
    // Lógica para calcular el total (puedes reemplazar esto con tu lógica real)
    const totalCalculado = productosEncontrados.reduce(
      (acc, producto) => acc + parseFloat(producto.PRECIO)*parseFloat(producto.CANTIDAD),
      0
    );
    setTotal(totalCalculado);
  };

  const preregistrar = async () => {
    setConfirmationEstado('');   
    if(producto.REFPRODUCTO!=='' && producto.IDCATPRODUCTO!=='' && producto.CANTIDAD!=='' && confirmationProducto!=='Producto no encontrado' && validarBusquedaProducto===true && producto.CANTIDAD>0){
      setValidarBusquedaProducto(false);
      if(getGlobalValue()===1 || getGlobalValue()===3){
        //salen productos
        const response = await axios.post('http://localhost:3001/api/buscarcantidad', 
        { REFPRODUCTO: producto.REFPRODUCTO, IDCATPRODUCTO: producto.IDCATPRODUCTO}); 
        if(response.data[0].CANTIDAD>=producto.CANTIDAD){
          agregarProducto(producto);
          setConfirmationEstado(`Aceptado: ${producto.CANTIDAD}`);
        }else{
          setConfirmationEstado(`Denegado: ${producto.CANTIDAD}`);
        }
      }if(getGlobalValue()===2 || getGlobalValue()===4){
        //entran productos
        agregarProducto(producto);
        setConfirmationEstado(`Aceptado: ${producto.CANTIDAD}`);
      }
    }else{      
      setConfirmationEstado('Campos vacios, producto no encontrado, no oprimió buscar producto o cantida negativa o nula');
    }
  };

  // Función para manejar la acción de guardar
  const guardar = () => {
    // Lógica para guardar (puedes implementar esto según tus necesidades)
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
          <input className="input" type="text" value={producto.REFPRODUCTO} onChange={(event) =>setProducto({...producto, REFPRODUCTO: event.target.value,})} required/>

          <label className="label">Categoria de Producto:</label>
          <select className="select" value={producto.IDCATPRODUCTO} onChange={(event) =>setProducto({...producto, IDCATPRODUCTO: event.target.value,})} required>
          <option value="">Seleccionar Tipo Documento</option>
            {tipoCatProducto.map((docuOption) => (
              <option key={docuOption.IDCATPRODUCTO} value={docuOption.IDCATPRODUCTO}>
                {docuOption.DESCATPRODUCTO}
              </option>
            ))}
        </select>

          <label className="label">Nombre y precio del Producto:</label>
          {/*Busqueda de producto*/}
          {producto.NOMPRODUCTO && producto.PRECIO!==0 ?(
            <div>
              <div>{`Nombre: ${producto.NOMPRODUCTO}`}</div>
              <div>{`Precio: ${producto.PRECIO}`}</div>
            </div>
          ) : (
            <div>
              <div>{`Mensaje: ${confirmationProducto}`}</div>
            </div>
          )}

          <button className="button" onClick={buscarProductos}>
            Buscar Producto
          </button>

          <label className="label">Cantidad:</label>
          <input className="input" type="text" value={producto.CANTIDAD} onChange={(event) =>setProducto({...producto, CANTIDAD: event.target.value,})} required />
                    
          <button className="preregistro-button" onClick={preregistrar}>
            Prerregistrar
          </button>

          {/* Mostrar "Aceptado" o "No hay" según el estado */}
          {confirmationEstado && (
            <div>{`${confirmationEstado}`}</div>
          )}
        </div>

        <div className="productos-derecha">
          <div className="scroll-container">
            {/* Mostrar la lista de productos encontrados */}
            {productosEncontrados.map((producto, index) => (
              <div key={index} className="product-item">
                {producto.NOMPRODUCTO} - ${producto.PRECIO} - Cant:{producto.CANTIDAD}
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
