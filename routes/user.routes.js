const express = require('express');
const { createUser, loginUser, getAllUsers } = require('../controller/user.controller');
const { jwtValidator } = require("../midlleware/jwtValidator");

const route = express();

route.get('/', jwtValidator, getAllUsers);
route.post('/', createUser);
route.post('/login', loginUser);

module.exports = route;
