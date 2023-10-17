//Importando userServices
const {
  createUserService,
  loginUserService,
  getAllusersService
} = require('../services/user.service');

// Controlador para crear un nuevo usuario
const createUser = async (req, res) => {
  try {
    const newUser = await createUserService(req.body);
    res.status(201).json({ newUser });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Controlador para iniciar sesión de un usuario
const loginUser = async (req, res) => {
  try {
    const logedUser = await loginUserService(req.body);
    res.status(201).json({ logedUser });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error });
  }
};

// Controlador para obtener todos los usuarios
const getAllUsers = async (req, res) => {
  try {
    const users = await getAllusersService(req.headers);
    res.status(201).json({ users });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error });
  }
};

//Exportando controladores de usuarios
module.exports = {
  createUser,
  loginUser,
  getAllUsers,
};
