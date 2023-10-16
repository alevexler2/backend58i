// Importa los módulos necesarios de Mongoose
const { Schema, model } = require('mongoose');

// Crea un nuevo esquema (schema) para el modelo de usuario
const userSchema = new Schema({
  // Define el campo 'userName' como una cadena de texto única y requerida
  userName: {
    type: String,
    unique: true,
    required: true,
  },
  // Define el campo 'password' como una cadena de texto requerida
  password: {
    type: String,
    required: true,
  },
  // Define el campo 'email' como una cadena de texto única y requerida
  email: {
    type: String,
    required: true,
    unique: true,
  },
  // Define el campo 'admin' como un valor booleano con un valor predeterminado de false
  admin: {
    type: Boolean,
    default: false,
  }
});

// Crea y exporta el modelo 'User' utilizando el esquema definido anteriormente
module.exports = model('User', userSchema);
