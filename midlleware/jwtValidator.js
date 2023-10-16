const jwt = require("jsonwebtoken");

const jwtValidator = async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ msg: "Your token is not valid" });
  }

  // Dividir el encabezado de autorización en sus partes (Bearer y token)
  const [bearer, token] = authHeader.split(" ");

  if (bearer !== "Bearer" || !token) {
    return res.status(401).json({ msg: "Your token is not valid" });
  }

  const SECRET = process.env.SECRET_KEY;

  jwt.verify(token, SECRET, (err) => {
    if (err) {
      return res.status(401).json({ msg: "Your token is not valid", err });
    }
    next(); // Solo llama a next si la verificación del token fue exitosa
  });

};

module.exports = { jwtValidator };
