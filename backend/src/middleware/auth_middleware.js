const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No tienes permiso, inicia sesión" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "powergym_secret");
    req.usuario = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido o expirado" });
  }
};

const soloAdmin = (req, res, next) => {
  if (req.usuario.rol !== "admin") {
    return res.status(403).json({ error: "Solo los administradores pueden hacer esto" });
  }
  next();
};

module.exports = { auth, soloAdmin };