import React, { useState, useEffect } from "react"; //importa elementos propios de react
import "./Facturacion.css"; //importa css
import axios from "axios"; //axios para conectarse con el backend
import { useNavigate } from 'react-router-dom'; //para poder navegar a otros links
import { PDFDownloadLink, PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'; //para el manejo de pdf

import { getGlobalValue } from '../App'; //variable global de permisos de empleado
import { getEmpleado } from '../App'; //variable de codigo del empleado

export function Facturar() {

  const styles = StyleSheet.create({//estilos dedicados para el pdf
    page: {
      flexDirection: 'column',
      padding: 10,
    },
    section: {
      margin: 10,
      padding: 10,
    },
    heading: {
      fontSize: 16,
      marginBottom: 10,
      textDecoration: 'underline',
    },
    content: {
      fontSize: 12,
      marginBottom: 5,
    },
    total: {
      fontSize: 14,
      marginTop: 10,
      alignSelf: 'flex-end',
    },
    bold: {
      fontSize: 14,
      fontWeight: 'bold',
    },
  });


  // Estados para almacenar datos y resultados

  const [tipoDocumento, setTipoDocumento] = useState([]);
  const [tipoCatProducto, setTipoCatProducto] = useState([]);  
  const [confirmationPersona, setConfirmationPersona] = useState('');
  const [confirmationProducto, setConfirmationProducto] = useState('');
  const [confirmationEstado, setConfirmationEstado] = useState('');
  const [validarBusquedaProducto, setValidarBusquedaProducto] =useState(false);
  const [factura, setFactura] = useState('');
  const [confirmationFactura, setConfirmationFactura] = useState('');
  const [cantidadFacturas, setCantidadFacturas] = useState(0);
  const [confirmationGuardar, setConfirmationGuardar] = useState('');
  const [poderguardar, setPoderGuardar] = useState(false);
  const [habilitarDev, setHabilitarDev] = useState(false); //para habilitar los componentes que buscan el producto y envian a BD (solo para devoluciones)
  const [nombreEmpleado,setNombreEmpleado] = useState([]);   
  const [nombredocumento, setNombreDocumento] = useState('');
  const [productosEncontrados, setProductosEncontrados] = useState([]);  
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();//para cambiar de ruta

  const [persona, setPersona] = useState({
    IDTIPOPERSONA:'',
    IDTIPODOC:'',
    NDOCUMENTO:'',
    NOMBRE:'',
    APELLIDO:''
  });

  const [producto, setProducto] = useState({
    ITEM:1,
    REFPRODUCTO:'',
    IDCATPRODUCTO:'',
    NOMPRODUCTO:'',
    PRECIO:'',
    CANTIDAD:0
  })

  const agregarProducto = (nuevoProducto) => {//para agregar productos en el panel inferior derecho
    setProductosEncontrados((prevProductos) => prevProductos.concat(nuevoProducto));
  };

  const MyPDF = () => {   //generador de pdf
    const getTipoFactura = () => { //determina que tipo de factura será entregado según los permisos del empleado
      const globalValue = getGlobalValue();     
      if (globalValue === 1) {
        return 'DC';
      } else if (globalValue === 2) {
        return 'DV';
      } else if (globalValue === 3) {
        return 'VE';
      } else if (globalValue === 4) {
        return 'CO';
      }
    }
    const getTipoFacturaDev = () => {  //determina que tipo de factura de devolucion será entregado según los permisos del empleado
      const globalValue = getGlobalValue();   
      if (globalValue === 1) {
        return 'CO';
      } else if (globalValue === 2) {
        return 'VE';
      }else{
        return 'NULL';
      }
    }
    const getTipoPersona = () => {  //determina si la persona es cliente o proovedor
      if (persona.IDTIPOPERSONA === 1) {
        return 'Cliente';
      } else if (persona.IDTIPOPERSONA === 2) {
        return 'Proovedor';
      } else{
        return '';
      } 
    }

    const numFacRef = () =>{ //para el numero de factura de devolucion
      if(factura){
        return factura;
      }else{
        return 'NULL';
      }
    }
    const formattedDateTime = new Date().toLocaleString(); //fecha y hora actual
    return(//returna el documento pdf
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.heading}>Información de la Factura</Text>

          <Text style={styles.content}>Fecha/hora: {formattedDateTime}   #Factura: {cantidadFacturas}    TipoFactura: {getTipoFactura()} </Text>
          <Text style={styles.content}>FacReferenciada: {numFacRef()}    TipoFactRef: {getTipoFacturaDev()}</Text>

          <Text style={styles.heading}>Persona:</Text>
          <Text style={styles.content}>TipoPersona: {getTipoPersona()} Doc: {nombredocumento}    #Documento: {persona.NDOCUMENTO}</Text>
          <Text style={styles.content}>Nombre: {persona.NOMBRE} Apellido: {persona.APELLIDO}</Text>

          <Text style={styles.heading}>Empleado:</Text>
          <Text style={styles.content}>Código: {getEmpleado()}  Nombre: {nombreEmpleado.NOMEMPLEADO} Apellido: {nombreEmpleado.APELLEMPLEADO}</Text>
          <Text style={styles.heading}>Productos:</Text>

          {productosEncontrados.map((producto) => {
             const categoriaEncontrada = tipoCatProducto.find(categoria => categoria.IDCATPRODUCTO === producto.IDCATPRODUCTO);
             const nombreCategoria = categoriaEncontrada ? categoriaEncontrada.DESCATPRODUCTO : 'No especificada';
            return (
            <Text key={producto.id} style={styles.content}>
              {`${producto.ITEM}    Cat: ${nombreCategoria}    Ref: ${producto.REFPRODUCTO}    Nombre: ${producto.NOMPRODUCTO}    Cant: ${producto.CANTIDAD}    Precio: $ ${parseFloat(producto.PRECIO)*parseFloat(producto.CANTIDAD)}`}
            </Text>
            )
          })}

          <Text style={styles.total}>Total Factura: $ {total}</Text>
        </View>
      </Page>
    </Document>
  );};
  

  const buscarPersona = async () => { //busca a la persona a la que se le va a hacer factura
    setProductosEncontrados([]); //reinicia el panel inferior derecho
    setProducto({...producto, ITEM: 1}); //reinicia el numero de items
    setHabilitarDev(false); //deshabilida toda la parte inferior (solo para devoluciones)
    fetchDataNomEmpleado(); //busca el nombre del empleado
    const numdoc=parseInt(persona.IDTIPODOC)-1;
    setNombreDocumento(tipoDocumento[numdoc].DESCTIPODOC); //trae la descripción del tipo de documento para el pdf    
    
    if(getGlobalValue()===1 || getGlobalValue()===4){ //la factura será para un proovedor
      const response = await axios.post('http://localhost:3001/api/buscarpersona', 
      { IDTIPOPERSONA: 2, IDTIPODOC: persona.IDTIPODOC ,NDOCUMENTO: persona.NDOCUMENTO });             
      if(Array.isArray(response.data) && response.data.length > 0){ 
        setConfirmationPersona('');          
        setPersona(prevPersona => ({
          ...prevPersona, 
          IDTIPOPERSONA: 2,  //proovedor      
          NOMBRE: response.data[0].NOMBRE, //modifica características de la persona a buscar
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
    }else if(getGlobalValue()===2 || getGlobalValue()===3){ //la factura será para un cliente
      const response = await axios.post('http://localhost:3001/api/buscarpersona', 
      { IDTIPOPERSONA: 1, IDTIPODOC: persona.IDTIPODOC ,NDOCUMENTO: persona.NDOCUMENTO });        
      if(Array.isArray(response.data) && response.data.length > 0){
        setConfirmationPersona('');
        console.log(response.data)      
        setPersona(prevPersona => ({
          ...prevPersona, 
          IDTIPOPERSONA: 1, //cliente       
          NOMBRE: response.data[0].NOMBRE, //modifica características de la persona a buscar
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

  const buscarFactura = async () => { //busca si la factura existe o no según sea cliente o proovedor
    setConfirmationFactura('');
    if(getGlobalValue()===1){
      const response = await axios.post('http://localhost:3001/api/verificarFactura', 
      { NFACTURA: factura, IDTIPOFAC: 'CO', IDTIPODOC: persona.IDTIPODOC, NDOCUMENTO: persona.NDOCUMENTO});             
      if (response.data.exists) {
        setConfirmationFactura('ExisteFactura');
        setHabilitarDev(true);
      } else {
        setConfirmationFactura('No ExisteFactura');            
      }  
    }else if(getGlobalValue()===2){
      const response = await axios.post('http://localhost:3001/api/verificarFactura', 
      { NFACTURA: factura, IDTIPOFAC: 'VE', IDTIPODOC: persona.IDTIPODOC, NDOCUMENTO: persona.NDOCUMENTO});             
      if (response.data.exists) {
        setConfirmationFactura('ExisteFactura');
        setHabilitarDev(true);
      } else {
        setConfirmationFactura('No ExisteFactura');            
      }  
    }      
  };

  // Función para manejar la búsqueda de productos
  const buscarProductos = async () => {
    const response = await axios.post('http://localhost:3001/api/buscarproducto', 
      { REFPRODUCTO: producto.REFPRODUCTO, IDCATPRODUCTO: producto.IDCATPRODUCTO});        
      if(Array.isArray(response.data) && response.data.length > 0){
        setConfirmationProducto('');              
        setProducto(prevProducto => ({
          ...prevProducto, 
          NOMPRODUCTO: response.data[0].NOMPRODUCTO,  //modifica características del producto      
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

  const fetchDataNomEmpleado = async () => {//busca el nombre del empleado
    try {
    const response = await axios.post("http://localhost:3001/api/buscarnombreempleado",{CODEMPLEADO: getEmpleado()});
    setNombreEmpleado(response.data.result[0]);         
    } catch (error) {
    console.error("Error al obtener los empleados", error);
    }
  };
 
  useEffect(() => {//useEffect permite ejecutar código en ciertos momentos durante el ciclo de vida de un componente, como cuando se monta, se actualiza o se desmonta

    //obtiene los tipos de documentos
    const fetchDataDoc = async () => { 
      try {
      const response = await axios.get("http://localhost:3001/api/obtenertipodoc");
      setTipoDocumento(response.data);
      } catch (error) {
      console.error("Error al obtener los tipos de documento", error);
      }
    };

    //obtiene las categorias de los productos
    const fetchDataCatProducto = async () => {
      try {
      const response = await axios.get("http://localhost:3001/api/obtenercatproducto");
      setTipoCatProducto(response.data);
      } catch (error) {
      console.error("Error al obtener los tipos de producto", error);
      }
    };
   
    fetchDataDoc();
    fetchDataCatProducto();   

    if (getGlobalValue() === 0) {
      // Redireccionar a la página de login si la variable no es igual a 0
      navigate('/login')
    }
    
  }, [navigate]);
 

  // Función para manejar la acción de totalizar
  const totalizar = () => {
    // Lógica para calcular el total
    const totalCalculado = productosEncontrados.reduce(
      (acc, producto) => acc + parseFloat(producto.PRECIO)*parseFloat(producto.CANTIDAD),
      0
    );//va sumando el precio de los productos encontrados (precio unitario por cantidad), en inicia tal suma en 0
    setTotal(totalCalculado);//modifica la variable total
    fetchDataCantFacturas(); //saber cantidad de facturas
    setConfirmationGuardar('');    
    setPoderGuardar(true);
  };

  //Guarda los productos encontrados en el panel inferior derecho
  const preregistrar = async () => {
    setConfirmationEstado('');   
    if(producto.REFPRODUCTO!=='' && producto.IDCATPRODUCTO!=='' && producto.CANTIDAD!=='' && confirmationProducto!=='Producto no encontrado' && validarBusquedaProducto===true && producto.CANTIDAD>0){//validador para saber si puede prerregistrar o no
      setValidarBusquedaProducto(false); //ya validado el producto, el estado se pone en falso para futuros productos puedan ser validados
      
      if(getGlobalValue()===1 || getGlobalValue()===3){//productos que van de salida        
        const response = await axios.post('http://localhost:3001/api/buscarcantidad', 
        { REFPRODUCTO: producto.REFPRODUCTO, IDCATPRODUCTO: producto.IDCATPRODUCTO});         
        if(response.data.CANTIDAD>=producto.CANTIDAD){
          setProducto(prevState => ({ ...prevState, ITEM: prevState.ITEM + 1 }));
          agregarProducto(producto);
          setConfirmationEstado(`Aceptado: ${producto.CANTIDAD}`);
        }else{
          setConfirmationEstado(`Denegado: ${producto.CANTIDAD}`);
        }
      }if(getGlobalValue()===2 || getGlobalValue()===4){ //productos que van de entrada     
        setProducto(prevState => ({ ...prevState, ITEM: prevState.ITEM + 1 }));
        agregarProducto(producto);
        setConfirmationEstado(`Aceptado: ${producto.CANTIDAD}`);
      }      
    }else{      
      setConfirmationEstado('Campos vacios, producto no encontrado, no oprimió buscar producto o cantida negativa o nula');//mensaje de error
    }
  };

  //Envia a procesar en backend para guardar los datos en tabla FACTURA
  const fetchDataPushFactura = async (tipofac,tipofac_sup,nfac_sup) => {
    try {
      await axios.post('http://localhost:3001/api/insertarfactura', 
      { IDTIPOFAC:tipofac, IDTIPOPERSONA: persona.IDTIPOPERSONA, IDTIPODOC: persona.IDTIPODOC, NDOCUMENTO: persona.NDOCUMENTO, IDTIPOFAC_SUP:tipofac_sup, NFACTURA_SUP:nfac_sup, CODEMPLEADO:getEmpleado(), TOTALFACTURA:total}); 
    } catch (error) {
      console.error("Error al obtener los tipos de cargo", error);
    }
  };

  //Busca la cantidad de facturas que hay
  const fetchDataCantFacturas = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/obtenercantidadfacturas");
      setCantidadFacturas(response.data);          
    } catch (error) {
      console.error("Error al obtener los tipos de cargo", error);
    }
  };

  //Guarda datos para procesar en backend en tabla DETALLEFACTURA
  const fetchDataPushProductos = async (tipof) => {
    productosEncontrados.forEach(async producto => {
      setTimeout(async () => {
        try {
          const respuesta = await axios.post('http://localhost:3001/api/insertardetallefactura',
          {NFACTURA: cantidadFacturas, IDTIPOFAC: tipof, ITEM: producto.ITEM, IDCATPRODUCTO: producto.IDCATPRODUCTO, REFPRODUCTO: producto.REFPRODUCTO, CANTIDAD: producto.CANTIDAD , PRECIO: parseFloat(producto.PRECIO)*parseFloat(producto.CANTIDAD)});
          console.log(respuesta.data); // Maneja la respuesta si es necesario
        } catch (error) {
          console.error('Error al insertar productos:', error); // Maneja el error si ocurre alguno
        }
    });
    }, 2000);
  };

  //Envia a procesar en backend para guardar los datos en tabla INVENTARIO (solo para productos que entran)
  const fetchDataPushInventarioEntra = async (tipof,consecinv) => {
    productosEncontrados.forEach(async producto => {      
      const existencias = await axios.post('http://localhost:3001/api/buscarexistenciaproducto',
      {IDCATPRODUCTO: producto.IDCATPRODUCTO, REFPRODUCTO: producto.REFPRODUCTO });
      console.log(existencias.data.EXISTENCIA);
      setTimeout(async () => {
        try {
          const respuesta = await axios.post('http://localhost:3001/api/insertarinventario',
          { IDTIPOFAC: tipof, 
            NFACTURA:cantidadFacturas,
            ITEM: producto.ITEM,
            IDCATPRODUCTO:producto.IDCATPRODUCTO, 
            REFPRODUCTO:producto.REFPRODUCTO,
            CONSECINVEN_SUP:consecinv, 
            SALEN:null, 
            ENTRAN:producto.CANTIDAD, 
            EXISTENCIA:parseInt(existencias.data.EXISTENCIA)+parseInt(producto.CANTIDAD)});

          console.log(respuesta.data); // Maneja la respuesta si es necesario
        } catch (error) {
          console.error('Error al insertar productos:', error); // Maneja el error si ocurre alguno
        }
      }, 2000);
    });
  };

  //Envia a procesar en backend para guardar los datos en tabla INVENTARIO (solo para productos que salen)
  const fetchDataPushInventarioSale = async (tipof,consecinv) => {
    productosEncontrados.forEach(async producto => {      
      const existencias = await axios.post('http://localhost:3001/api/buscarexistenciaproducto',
      {IDCATPRODUCTO: producto.IDCATPRODUCTO, REFPRODUCTO: producto.REFPRODUCTO });
      console.log(existencias.data.EXISTENCIA);
      setTimeout(async () => {
        try {
          const respuesta = await axios.post('http://localhost:3001/api/insertarinventario',
          { IDTIPOFAC: tipof, 
            NFACTURA:cantidadFacturas,
            ITEM: producto.ITEM,
            IDCATPRODUCTO:producto.IDCATPRODUCTO, 
            REFPRODUCTO:producto.REFPRODUCTO,
            CONSECINVEN_SUP:consecinv, 
            SALEN:producto.CANTIDAD, 
            ENTRAN:null, 
            EXISTENCIA:parseInt(existencias.data.EXISTENCIA)-parseInt(producto.CANTIDAD)});

          console.log(respuesta.data); // Maneja la respuesta si es necesario
        } catch (error) {
          console.error('Error al insertar productos:', error); // Maneja el error si ocurre alguno
        }
      }, 2000);
    });
  };


  // Función que ejecuta funciones para ser procesadas en el backend
  const guardar = async () => {   
    
    if(getGlobalValue()===1){
      //para devolver compras a proovedores(salen productos)
      fetchDataPushFactura('DC','CO',factura);           
        
      setTimeout(() => {          
        fetchDataPushProductos('DC');     
      }, 6000); 

      setTimeout(() => {          
        fetchDataPushInventarioSale('DC',null);     
        setConfirmationGuardar('Productos comprados devolvidos exitosamente');
      }, 8000); 
    }
    if(getGlobalValue()===2){
      //Para devolver compras a clientes(entran productos)
      fetchDataPushFactura('DV','VE',factura);           
        
      setTimeout(() => {          
        fetchDataPushProductos('DV');     
      }, 6000); 

      setTimeout(() => {          
        fetchDataPushInventarioSale('DV',null);     
        setConfirmationGuardar('Productos vendidos devolvidos exitosamente');
      }, 8000); 

    }
    if(getGlobalValue()===3){
      //para hacer ventas a clientes (salen productos)
      fetchDataPushFactura('VE',null,null);           
        
      setTimeout(() => {          
        fetchDataPushProductos('VE');     
      }, 6000); 

      setTimeout(() => {          
        fetchDataPushInventarioSale('VE',null);     
        setConfirmationGuardar('Productos vendidos exitosamente');
      }, 8000); 

    }
    if(getGlobalValue()===4){
      //para hacer compras al proovedor(entran productos)     
      fetchDataPushFactura('CO',null,null);           
        
      setTimeout(() => {          
        fetchDataPushProductos('CO');     
      }, 6000); 

      setTimeout(() => {          
        fetchDataPushInventarioEntra('CO',null);     
        setConfirmationGuardar('Productos comprados exitosamente');
      }, 8000); 
      
    }
    setTimeout(() => {          
      setProducto({...producto, ITEM: 1});
    }, 10000);    
    setPoderGuardar(false);
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

          {/*bUSCAR FACTURA*/}
         {(getGlobalValue()===1 || getGlobalValue()===2) && (
            <div>
              <label className="label">Número de Factura:</label>
              <input className="input" type="text" value={factura} onChange={(event) =>setFactura(event.target.value)} required/>
              
              <button className="button" onClick={buscarFactura}>
                Buscar Factura
              </button>

            {/* Mensaje de confirmacion de factura encontrada o no */}
            {confirmationFactura && (
              <div>{`${confirmationFactura}`}</div>
            )}
            </div>
          )}

        
      </div>

      {/* Sección de búsqueda de productos y resultados */}
      {((habilitarDev===true && (getGlobalValue()===1 || getGlobalValue()===2)) || (getGlobalValue()!==1 && getGlobalValue()!==2)) && (
      <div className="productos-section">
        <div className="productos-izquierda">

          {/* Codigo del producto*/}
          <label className="label">Código de Producto:</label>
          <input className="input" type="text" value={producto.REFPRODUCTO} onChange={(event) =>setProducto({...producto, REFPRODUCTO: event.target.value,})} required/>

          {/* Categoria del producto */}
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
          {/*Mensaje de Busqueda de producto*/}
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
          
          {/* Boton para buscar producto */}
          <button className="button" onClick={buscarProductos}>
            Buscar Producto
          </button>

          {/* Entrada para digitar cantidad que saldrá o entraá */}
          <label className="label">Cantidad:</label>
          <input className="input" type="text" value={producto.CANTIDAD} onChange={(event) =>setProducto({...producto, CANTIDAD: event.target.value,})} required />
          
          {/* Boton para prerregistar el producto en panel inferior derecho */}
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
                ITEM:{producto.ITEM} - {producto.NOMPRODUCTO} - ${producto.PRECIO} - Cant:{producto.CANTIDAD}
              </div>
            ))}
          </div>
          <div className="botones-section">
            {/* Boton de totalizar */}
            <button className="button" onClick={totalizar}>
              Totalizar
            </button>
            {/* Mensaje que muestra el total de la factura */}
            <label className="total-label">{`Total: $${total.toFixed(
              2
            )}`}</label>
            <br />

            {/* Boton que descarga el pdf generado y que envia datos a BD */}
            <PDFDownloadLink document={<MyPDF />} fileName="Factura.pdf">
              <button className="button-guardar" onClick={guardar}>
                Guardar
              </button>
            </PDFDownloadLink>            
           
            {/* Mensaje que confirma que se ha enviado*/}
            {confirmationGuardar && (
            <div>{`${confirmationGuardar}`}</div>
            )}
          </div>
        </div>
      </div>
      )}
    </div>
  );
}
