const db = require("../config/db");

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
      `SELECT c.plazas_max, COUNT(i.id) as inscritos
       FROM clases c
       LEFT JOIN inscripciones i ON c.id = i.clase_id
       WHERE c.id = $1
       GROUP BY c.id`,
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

module.exports = { getMisInscripciones, inscribirse, cancelarInscripcion };