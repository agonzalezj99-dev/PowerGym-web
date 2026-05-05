const db = require("../config/db");
const { crearNotificacion } = require("./notificaciones_controller");

// VER MIS INSCRIPCIONES
const getMisInscripciones = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT i.id, c.nombre, c.instructor, c.dia_semana, c.hora_inicio, c.hora_fin
       FROM inscripciones i
       JOIN clases c ON i.clase_id = c.id
       WHERE i.usuario_id = $1`,
      [req.usuario.id]
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las inscripciones" });
  }
};

// INSCRIBIRSE A UNA CLASE
const inscribirse = async (req, res) => {
  const { clase_id } = req.body;
  try {
    const clases = await db.query(
      `SELECT c.plazas_max, c.nombre, c.instructor, c.dia_semana, c.hora_inicio, c.hora_fin,
              COUNT(i.id) as inscritos
       FROM clases c
       LEFT JOIN inscripciones i ON c.id = i.clase_id
       WHERE c.id = $1
       GROUP BY c.id, c.nombre, c.instructor, c.dia_semana, c.hora_inicio, c.hora_fin`,
      [clase_id]
    );

    if (clases.rows.length === 0) {
      return res.status(404).json({ error: "Clase no encontrada" });
    }

    if (clases.rows[0].inscritos >= clases.rows[0].plazas_max) {
      return res.status(400).json({ error: "No hay plazas disponibles" });
    }

    await db.query(
      "INSERT INTO inscripciones (usuario_id, clase_id) VALUES ($1, $2)",
      [req.usuario.id, clase_id]
    );

    const clase = clases.rows[0];

    await crearNotificacion(
      req.usuario.id,
      `Inscripción confirmada: ${clase.nombre}`,
      `Te has inscrito a ${clase.nombre} con ${clase.instructor} el ${clase.dia_semana} de ${clase.hora_inicio.slice(0, 5)} a ${clase.hora_fin.slice(0, 5)}.`
    );

    res.status(201).json({ mensaje: "Inscripción realizada correctamente" });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(400).json({ error: "Ya estás inscrito en esta clase" });
    }
    console.error(error);
    res.status(500).json({ error: "Error al inscribirse" });
  }
};

// CANCELAR INSCRIPCIÓN
const cancelarInscripcion = async (req, res) => {
  try {
    await db.query(
      "DELETE FROM inscripciones WHERE id = $1 AND usuario_id = $2",
      [req.params.id, req.usuario.id]
    );
    res.json({ mensaje: "Inscripción cancelada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al cancelar la inscripción" });
  }
};

const getTodasInscripciones = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT i.id, u.nombre as usuario_nombre, u.email as usuario_email,
              c.nombre as clase_nombre, c.dia_semana, c.hora_inicio, c.hora_fin, i.fecha
       FROM inscripciones i
       JOIN usuarios u ON i.usuario_id = u.id
       JOIN clases c ON i.clase_id = c.id
       ORDER BY i.fecha DESC`
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las inscripciones" });
  }
};

module.exports = { getMisInscripciones, inscribirse, cancelarInscripcion, getTodasInscripciones };