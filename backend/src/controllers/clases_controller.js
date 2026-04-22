const db = require("../config/db");

// VER TODAS LAS CLASES
const getClases = async (req, res) => {
  try {
    const [clases] = await db.query(
      "SELECT * FROM clases ORDER BY dia_semana, hora_inicio"
    );
    res.json(clases);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las clases" });
  }
};

// VER UNA CLASE
const getClase = async (req, res) => {
  try {
    const [clases] = await db.query(
      "SELECT * FROM clases WHERE id = ?",
      [req.params.id]
    );
    if (clases.length === 0) {
      return res.status(404).json({ error: "Clase no encontrada" });
    }
    res.json(clases[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener la clase" });
  }
};

// CREAR CLASE (solo admin)
const createClase = async (req, res) => {
  const { nombre, instructor, dia_semana, hora_inicio, hora_fin, plazas_max } = req.body;
  try {
    await db.query(
      "INSERT INTO clases (nombre, instructor, dia_semana, hora_inicio, hora_fin, plazas_max) VALUES (?, ?, ?, ?, ?, ?)",
      [nombre, instructor, dia_semana, hora_inicio, hora_fin, plazas_max]
    );
    res.status(201).json({ mensaje: "Clase creada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear la clase" });
  }
};

// EDITAR CLASE (solo admin)
const updateClase = async (req, res) => {
  const { nombre, instructor, dia_semana, hora_inicio, hora_fin, plazas_max } = req.body;
  try {
    await db.query(
      "UPDATE clases SET nombre = ?, instructor = ?, dia_semana = ?, hora_inicio = ?, hora_fin = ?, plazas_max = ? WHERE id = ?",
      [nombre, instructor, dia_semana, hora_inicio, hora_fin, plazas_max, req.params.id]
    );
    res.json({ mensaje: "Clase actualizada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar la clase" });
  }
};

// BORRAR CLASE (solo admin)
const deleteClase = async (req, res) => {
  try {
    await db.query("DELETE FROM clases WHERE id = ?", [req.params.id]);
    res.json({ mensaje: "Clase eliminada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar la clase" });
  }
};

module.exports = { getClases, getClase, createClase, updateClase, deleteClase };