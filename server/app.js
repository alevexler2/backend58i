// Importa los módulos necesarios
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const { connection } = require('../db/connection');

//Importando rutas
const userRoutes = require('../routes/user.routes');

// Configura las variables de entorno utilizando dotenv
dotenv.config();

// Crea una instancia de Express
const app = express();

// Configura Express para manejar solicitudes JSON
app.use(express.json());

// Configura el registro de solicitudes utilizando Morgan en modo de desarrollo
app.use(morgan('dev'));

// Obtiene el puerto del entorno
const port = process.env.PORT;

// Inicia el servidor de Express y escucha en el puerto especificado
app.listen(port, () => {
  console.log(`Estamos escuchando el puerto ${port}`)
});

//definiendo rutas
app.use('/users', userRoutes);

// Inicia la conexión a la base de datos
connection();
