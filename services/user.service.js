const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const createUserService = async ({ userName, email, password, admin }) => {
  // Genera un salt para el proceso de hash
  const saltRounds = 10;

  // Hashea la contraseña utilizando bcrypt
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const newUser = new User({
    userName,
    email,
    password: hashedPassword, // Almacena la contraseña hasheada en la base de datos
    admin,
  });

  await newUser.save();


  // Maneja errores de hashing o almacenamiento
  if (!newUser) throw new Error('Hubo un error al crear el nuevo usuario');

  // Retorna el nuevo usuario creado
  return newUser;
};

const loginUserService = async ({ userName, email, password }) => {
  let userFounded;
  const SECRET_KEY = process.env.SECRET_KEY;

  if (userName) {
    // Busca al usuario por userName
    userFounded = await User.findOne({ userName });
  } else if (email) {
    // Si no se proporciona userName, busca al usuario por email
    userFounded = await User.findOne({ email });
  }

  // Si no se encuentra ningún usuario, devuelve un error
  if (!userFounded) throw new Error('Las credenciales son incorrectas');

  // Compara la contraseña proporcionada con la contraseña hasheada en la base de datos
  const passwordMatch = await bcrypt.compare(password, userFounded.password);

  // Si las contraseñas no coinciden, devuelve un error
  if (!passwordMatch) throw new Error('Las credenciales son incorrectas');

  //Eliminar el password del usuario antes de retornarlo
  const userWithoutPassword = userFounded._doc;
  delete userWithoutPassword.password;

  // Si el usuario se encontró y la contraseña coincide, puedes devolver el usuario o un token de autenticación, según tus necesidades.

  const payload = {
    userWithoutPassword
  };

  const token = jwt.sign(payload, SECRET_KEY, {
    expiresIn: "10h",
  });

  return { token, userWithoutPassword };
};

const getAllusersService = async ({ username, email, admin }) => {
  let query = {}; // Consulta inicial sin filtros

  if (username) {
    query.userName = username;
  }

  if (email) {
    query.email = email;
  }

  if (admin !== undefined) {
    query.admin = admin;
  }

  // Realiza la consulta utilizando la query construida
  const users = await User.find(query);

  if (!users) {
    throw new Error('No se encontraron usuarios con los filtros seleccionados');
  }
  return users;

}

// Exportamos los servicios
module.exports = {
  createUserService,
  loginUserService,
  getAllusersService,
};
