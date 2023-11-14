import React, { useState } from "react";
import "./Facturacion.css";

export function Facturar() {
  // Estados para almacenar datos y resultados
  const [tipoDocumento, setTipoDocumento] = useState("");
  const [numeroDocumento, setNumeroDocumento] = useState("");
  const [nombrePersona, setNombrePersona] = useState("");
  const [apellidoPersona, setApellidoPersona] = useState("");


  const [codigoProducto, setCodigoProducto] = useState("");
  const [precioProducto, setPrecioProducto] = useState("");
  const [productosEncontrados, setProductosEncontrados] = useState([]);
  const [cantidad, setCantidad] = useState("");
  const [estado, setEstado] = useState("");
  const [total, setTotal] = useState(0);
  // Función para manejar la búsqueda de persona
  const buscarPersona = () => {
    // Lógica para buscar persona según tipoDocumento y numeroDocumento
    // Actualizar el estado de nombrePersona con el resultado

    const resultado = {
        nombre: 'Juan ',
        apellido: 'Pérez',
      };
  
      setNombrePersona(resultado.nombre);
      setApellidoPersona(resultado.apellido);
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
        <select
          className="select"
          value={tipoDocumento}
          onChange={(e) => setTipoDocumento(e.target.value)}
        >
          {/* ... opciones del select */}
        </select>

        <label className="label">Número de Documento:</label>
        <input
          className="input"
          type="text"
          value={numeroDocumento}
          onChange={(e) => setNumeroDocumento(e.target.value)}
        />

        <button className="button" onClick={buscarPersona}>
          Buscar Persona
        </button>

        {/* Mostrar el nombre y apellido de la persona */}
        {nombrePersona && (
          <div>
            <div>{`Nombre: ${nombrePersona}`}</div>
            <div>{`Apellido: ${apellidoPersona}`}</div>
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
