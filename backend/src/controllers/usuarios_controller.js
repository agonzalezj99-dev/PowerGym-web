const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
const register = async (req, res) => {
  const { nombre, email, contrasena, fecha_nacimiento } = req.body;

  try {
    const existe = await db.query(
      "SELECT id FROM usuarios WHERE email = $1",
      [email]
    );
    if (existe.rows.length > 0) {
      return res.status(400).json({ error: "El email ya está registrado" });
    }

    const hash = await bcrypt.hash(contrasena, 10);

    await db.query(
      "INSERT INTO usuarios (nombre, email, contrasena, fecha_nacimiento) VALUES ($1, $2, $3, $4)",
      [nombre, email, hash, fecha_nacimiento]
    );

    res.status(201).json({ mensaje: "Usuario registrado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al registrar el usuario" });
  }
};

// LOGIN
const login = async (req, res) => {
  const { email, contrasena } = req.body;

  try {
    const result = await db.query(
      "SELECT * FROM usuarios WHERE email = $1",
      [email]
    );
    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Email o contraseña incorrectos" });
    }

    const usuario = result.rows[0];

    const valida = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!valida) {
      return res.status(401).json({ error: "Email o contraseña incorrectos" });
    }

    const token = jwt.sign(
      { id: usuario.id, rol: usuario.rol },
      process.env.JWT_SECRET || "powergym_secret",
      { expiresIn: "7d" }
    );

    res.json({ token, rol: usuario.rol, nombre: usuario.nombre });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
};

// VER PERFIL
const getPerfil = async (req, res) => {
  try {
    const result = await db.query(
      "SELECT id, nombre, email, fecha_nacimiento, membresia, rol, fecha_registro FROM usuarios WHERE id = $1",
      [req.usuario.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el perfil" });
  }
};

// EDITAR PERFIL
const updatePerfil = async (req, res) => {
  const { nombre, fecha_nacimiento, membresia } = req.body;

  try {
    await db.query(
      "UPDATE usuarios SET nombre = $1, fecha_nacimiento = $2, membresia = $3 WHERE id = $4",
      [nombre, fecha_nacimiento, membresia, req.usuario.id]
    );
    res.json({ mensaje: "Perfil actualizado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el perfil" });
  }
};

// BORRAR PERFIL
const deletePerfil = async (req, res) => {
  try {
    await db.query("DELETE FROM usuarios WHERE id = $1", [req.usuario.id]);
    res.json({ mensaje: "Cuenta eliminada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar la cuenta" });
  }
};

module.exports = { register, login, getPerfil, updatePerfil, deletePerfil };