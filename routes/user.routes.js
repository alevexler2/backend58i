// Importa los módulos necesarios
const express = require('express');
const { createUser, loginUser, getAllUsers } = require('../controller/user.controller');
const { jwtValidator } = require("../midlleware/jwtValidator");

const route = express();

// Ruta para obtener todos los usuarios (requiere validación de JWT)
route.get('/', jwtValidator, getAllUsers);
// Ruta para crear un nuevo usuario
route.post('/', createUser);
// Ruta para iniciar sesión (login) de un usuario
route.post('/login', loginUser);

//Exportando rutas
module.exports = route;
