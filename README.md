# estacionamiento-denys
Este es un proyecto de registro de empleados con Vue.js y JSON Server. Permite ingresar y visualizar la información de los empleados, así como filtrar por tipo de vehículo y buscar por nombre del empleado.

## Instalación
1. Clona el repositorio en tu máquina local:

## Clona el repositorio
   git clone https://github.com/dhurtado07/estacionamiento-denys.git

## Ingresa al directorio
cd estacionamiento-denys

## Instala las dependencias del frontend y del servidor JSON
npm install

## Inicia el servidor JSON Server (asegúrate de que no esté ocupando el puerto 3001):
json-server --watch db.json --port 3001

## En otra ventana de terminal, inicia la aplicación Vue:
npm run serve

## Uso
* Llena el formulario para agregar un nuevo empleado.
* Los empleados agregados se mostrarán en la tabla.
* Utiliza los filtros para ver empleados por tipo de vehículo o busca por nombre del empleado.

## Tecnologías utilizadas
* Vue.js
* JSON Server
* Bootstrap

