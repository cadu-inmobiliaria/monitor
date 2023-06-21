# mon api

Monitora el estado de microservicios

### Estructura de carpetas
```
  .
  .
  .
  modules
  ├───menu
  │   ├───controllers
  │   │   ├───submenu.controller.js
  │   ├───rules
  │   │   ├───submenu.rules.js
  │   ├───routes
  │   │   ├───submenu.routes.js
  │   ├───services
  │   │   └───service.service.js
  │   ├───middlewares
  │   │   └───middleware.middleware.js
  .
  .
  .
```
### Nomenclatura de archivos
  - `*.controller.js`: Archivo que contiene las funciones que se ejecutan en las rutas.
  - `*.rules.js`: Archivo que contiene las reglas de validación de los datos de entrada.
  - `*.routes.js`: Archivo que contiene las rutas de la API.
  - `*.service.js`: Archivo que contiene las funciones que se ejecutan en los controladores.
  - `*.middleware.js`: Archivo que contiene las funciones que se ejecutan en los middlewares.

### Nomenclatura de funciones para endpoints
  - `getEntity`: Función que obtiene datos de la base de datos.
  - `postEntity`: Función que inserta datos en la base de datos.
  - `putEntity`: Función que actualiza datos en la base de datos.
  - `deleteEntity`: Función que elimina datos de la base de datos.

### Nomenclatura de funciones para servicios
  - `getEntity`: Función que obtiene datos de la base de datos.
  - `insertEntity`: Función que inserta datos en la base de datos.
  - `updateEntity`: Función que actualiza datos en la base de datos.
  - `deleteEntity`: Función que elimina datos de la base de datos.

### Nomenclatura de funciones para controladores dropdown
  - `getEntityDropDown`: Función que obtiene datos de la base de datos.

### Convención de respuesta
```
{
  error: true,
  message:'Error al obtener los datos',
  data:{}
}
```
### Convención de respuesta de error
```
{
  error: true,
  message:'Error al obtener los datos',
  data:{}
}
```
### ¿Qué es un servicio?
  - Un servicio es una función que se ejecuta en un controlador por ejemplo, obtener datos, insertar datos, actualizar datos, eliminar datos, etc. Estos pueden estar en un archivo aparte dentro services o en el mismo archivo del controlador.
### ¿Cuándo se debe mover servicio a un archivo aparte?
  - Cuando el servicio se va a utilizar en varios controladores o sea una función con demasiadas lineas.
### ¿Qué es un controlador?
  - Un controlador es una función que se ejecuta en una ruta, por ejemplo, obtener datos, insertar datos, actualizar datos, eliminar datos, etc. Estos pueden estar en un archivo aparte dentro controllers o en el mismo archivo de las rutas.
### ¿Qué es una regla?
  - Es objeto que contiene las reglas de validación de los datos de entrada, la validación se realiza con la librería express-validator.
### ¿Qué es una ruta?
  - Es un archivo que contiene las rutas, el método, el controlador y las reglas de validación de los datos de entrada.
### ¿Qué es un middleware?
  - Es una función que se ejecuta antes de que se ejecute el controlador, por ejemplo, autenticación, validación de permisos, etc.
### ¿Qué es un módulo?
  - Es una carpeta que contiene los controladores, reglas, rutas y servicios de un recurso.
## Módulo shared
  Los controladores, reglas y servicios que se encuentran en el modulo shared son los que se pueden utilizar en cualquier módulo de la aplicación, por ejemplo, el middleware de autenticación o reglas de validación de datos de entrada que se pueden utilizar en cualquier módulo.
## Módulo aplicación
  Este módulo informa sobre la version de la API y el estado del servidor.
## Directorio core
  Este directorio contiene funciones base para el funcionamiento del servidor, como la conexión a la base de datos, manejo de errores, etc.
## Archivo index.js
  Este archivo es el que se ejecuta al iniciar el servidor, confugura el servidor express, y las rutas de la API.
## Codigos de respuesta HTTP utilizados
  - 200: OK
  - 201: Created
  - 400: Bad Request
  - 401: Unauthorized
  - 403: Forbidden
  - 404: Not Found
  - 500: Internal Server Error

## ¿Cuándo usar código de respuesta 200 o 201?
  - Cuando se obtiene un dato de la base de datos se debe usar el código 200.
  - Cuando se inserta un dato en la base de datos se debe usar el código 201.
## ¿Cuándo usar código de respuesta 400, 401, 403 o 404?
  - Cuando el request no cumple con las reglas de validación se debe usar el código 400 o uando se inserta un dato en la base de datos y ya existe.
  - Cuando el request no tiene el header de autorización se debe usar el codigo 401.
  - Cuando se obtiene un dato de la base de datos y no se encuentra se debe usar el código 404.
## ¿Cuándo usar código de respuesta 500?
  - Cuando se produce un error en el servidor se debe usar el código 500.
### Configuración de variables de entorno
  El proyecto utiliza variables de entorno en archivo js, para configurar las variables de entorno se debe crear un archivo llamado `env.js` en la raíz del proyecto.
## Directorio public
  Este directorio un archivo llamado `index.html` que se utiliza para probar la API.  
### Puerto de ejecución del servidor
Puede configurar el puerto en el que se ejecuta el servidor, por defecto es 5000
```javascript
const PORT = 5003;
```
### Exportación de variables
Se exportan todas las variables 
```javascript
module.exports = {
  DATABASES,
  BUCKETS,
  PORT,
  //....
};
```
## Instalación de dependencias
```Bash
npm install
```
## Ejecución de la aplicación
  Construye el proyecto y lo ejecuta en modo producción
```Bash
npm start
```
## Ejecución de la aplicación en modo desarrollo
```Bash
npm run dev
```
## PM2
  Hay scripts para ejecutar la aplicación con pm2, estos scripts se encuentran en el archivo `package.json` y exportan la variable export PM2_HOME=/srv/develop/, es recomendable ejetar la aplicación en modo desarrollo antes de ejecutarla con pm2 para verificar que no existan errores.
### Ejecución de la aplicación con pm2
```Bash
  nmp run pm2:install # Agrega la aplicacion a pm2
  nmp run pm2:start # Inicia la aplicacion o la reinicia si ya esta corriendo 
  nmp run pm2:stop # Detiene la aplicacion
  nmp run pm2:delete # Elimina la aplicacion de pm2
```
