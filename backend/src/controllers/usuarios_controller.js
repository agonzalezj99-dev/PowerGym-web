const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { crearNotificacion } = require("./notificaciones_controller");

const register = async (req, res) => {
  const { nombre, email, contrasena, fecha_nacimiento } = req.body;

  try {
    const existe = await db.query(
      "SELECT id FROM usuarios WHERE email = $1", [email]
    );
    if (existe.rows.length > 0) {
      return res.status(400).json({ error: "El email ya está registrado" });
    }

    const hash = await bcrypt.hash(contrasena, 10);

    await db.query(
      "INSERT INTO usuarios (nombre, email, contrasena, fecha_nacimiento) VALUES ($1, $2, $3, $4)",
      [nombre, email, hash, fecha_nacimiento]
    );

    // Notificar al admin
    const admin = await db.query("SELECT id FROM usuarios WHERE rol = 'admin' LIMIT 1");
    if (admin.rows.length > 0) {
      await crearNotificacion(
        admin.rows[0].id,
        "Nuevo registro",
        `El usuario ${nombre} (${email}) se ha registrado en PowerGym.`
      );
    }

    res.status(201).json({ mensaje: "Usuario registrado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al registrar el usuario" });
  }
};

const login = async (req, res) => {
  const { email, contrasena } = req.body;

  try {
    const result = await db.query(
      "SELECT * FROM usuarios WHERE email = $1", [email]
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

const updatePerfil = async (req, res) => {
  const { nombre, fecha_nacimiento, membresia, contrasena } = req.body;

  try {
    if (contrasena) {
      const hash = await bcrypt.hash(contrasena, 10);
      await db.query(
        "UPDATE usuarios SET nombre = $1, fecha_nacimiento = $2, membresia = $3, contrasena = $4 WHERE id = $5",
        [nombre, fecha_nacimiento, membresia, hash, req.usuario.id]
      );
    } else {
      await db.query(
        "UPDATE usuarios SET nombre = $1, fecha_nacimiento = $2, membresia = $3 WHERE id = $4",
        [nombre, fecha_nacimiento, membresia, req.usuario.id]
      );
    }
    res.json({ mensaje: "Perfil actualizado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el perfil" });
  }
};

const getEstadisticas = async (req, res) => {
  try {
    const socios = await db.query(
      "SELECT COUNT(*) FROM usuarios WHERE rol = 'socio'"
    );
    const inscripciones = await db.query(
      "SELECT COUNT(*) FROM inscripciones"
    );
    const clases = await db.query(
      "SELECT COUNT(*) FROM clases"
    );
    const clasesPopulares = await db.query(
      `SELECT c.nombre, COUNT(i.id) as inscritos
       FROM clases c
       LEFT JOIN inscripciones i ON c.id = i.clase_id
       GROUP BY c.nombre
       ORDER BY inscritos DESC
       LIMIT 3`
    );

    res.json({
      socios: socios.rows[0].count,
      inscripciones: inscripciones.rows[0].count,
      clases: clases.rows[0].count,
      clasesPopulares: clasesPopulares.rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener estadísticas" });
  }
};

const getTodosUsuarios = async (req, res) => {
  try {
    const result = await db.query(
      "SELECT id, nombre, email, fecha_nacimiento, membresia, rol, fecha_registro FROM usuarios WHERE rol = 'socio' ORDER BY fecha_registro DESC"
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
};

const updateUsuario = async (req, res) => {
  const { membresia } = req.body;
  try {
    await db.query(
      "UPDATE usuarios SET membresia = $1 WHERE id = $2",
      [membresia, req.params.id]
    );
    res.json({ mensaje: "Usuario actualizado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar usuario" });
  }
};

const deleteUsuario = async (req, res) => {
  try {
    await db.query("DELETE FROM usuarios WHERE id = $1", [req.params.id]);
    res.json({ mensaje: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar usuario" });
  }
};

module.exports = { register, login, getPerfil, updatePerfil, getEstadisticas, getTodosUsuarios, updateUsuario, deleteUsuario };