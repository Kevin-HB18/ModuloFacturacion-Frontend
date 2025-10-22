# 🚀 Modulo de facturación

Aplicación web desarrollada en React para gestionar un almacen, donde tiene como funciones:  
1. Abastecer inventario con un proveedor o realizar devolución según la factura registrada.  
2. Realizar ventas a clientes o permitir la devolución de lo comprado según la factura registrada.  
3. Registrar compradores o proveedores.  

## 🖼️ Interfaz GUI

### Login
<img width="344" height="339" alt="imagen" src="https://github.com/user-attachments/assets/61cb4a49-87b7-45d7-9ddf-fec5f4b325fb" />  

Se tiene un Login con los diferentes tipos de usuario donde para ingresar, se usa el código del empleado. Cada usuario puede realizar ciertas acciones, y a pesar de que todos pueden registrar un proveedor o cliente, hay diferencias:  

- El director comercial y el gerente de compras solo pueden realizar devoluciones a proveedores.
- El gerente de ventas y representante de ventas solo pueden realizar devoluciones a clientes.
- El vendedor solamente vende a clientes.
- El auxiliar de ventas solamente compra a proveedores.

### Encabezado
<img width="1262" height="57" alt="imagen" src="https://github.com/user-attachments/assets/b1ae9ff5-d5e1-4804-b214-e25792ed723d" />  

Todos poseen el mismo encabezado, aunque como se mencionó, en facturación varía.


### Registro de personas
<img width="1349" height="596" alt="imagen" src="https://github.com/user-attachments/assets/9d092502-be53-4a39-b574-ddb05afc74b9" />  

Todos los usuarios pueden registrar personas (compradores y proveedores).

### Módulo de facturación para realizar devoluciones a clientes y proveedores:  
<img width="1365" height="610" alt="imagen" src="https://github.com/user-attachments/assets/79187ee5-3f79-43ea-ac91-aba55ff14308" />  

La intención es poner los datos del cliente o proveedor al que se le va a hacer una devolución y poner que elementos se desean devolver.

### Módulo de facturación para realizar compras a proveedores o ventas a clientes: 
<img width="1365" height="607" alt="imagen" src="https://github.com/user-attachments/assets/65d1507e-385a-4b40-9364-7af3fcef2b79" />  

Para realizar una venta o compra, según sea el caso, se busca el nombre del proveedor o cliente, que fueron previamente registrados en el módulo de registro. Luego se buscan los elementos a comprar o vender y se prerregistran para luego ser totalizados y después ser guardados en la base de datos, además de generar un respectivo recibo.

### Recibos:
<img width="743" height="371" alt="imagen" src="https://github.com/user-attachments/assets/c5d9d407-f834-4884-8f08-4093a728e5ca" />  

Se genera un pdf con los elementos comprados y demás datos. En caso de ser una factura de devolución, los campos FacReferenciada: NULL y TipoFactRef: NULL cambiarán sus valores al número de la factura original y el tipo de factura, que puede ser de compra (CO) o de venta (VE).


## Link del backend: 
[Backend](https://github.com/Kevin-HB18/ModuloRegistroPersonas-backend) realizado con Node.js y Express.js usando una base de datos Oracle.


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
