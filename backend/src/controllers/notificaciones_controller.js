const db = require("../config/db");

const getMisNotificaciones = async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM notificaciones WHERE usuario_id = $1 ORDER BY fecha DESC",
      [req.usuario.id]
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener notificaciones" });
  }
};

const marcarLeida = async (req, res) => {
  try {
    await db.query(
      "UPDATE notificaciones SET leida = true WHERE id = $1 AND usuario_id = $2",
      [req.params.id, req.usuario.id]
    );
    res.json({ mensaje: "Notificación marcada como leída" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al marcar notificación" });
  }
};

const marcarTodasLeidas = async (req, res) => {
  try {
    await db.query(
      "UPDATE notificaciones SET leida = true WHERE usuario_id = $1",
      [req.usuario.id]
    );
    res.json({ mensaje: "Todas marcadas como leídas" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al marcar notificaciones" });
  }
};

const crearNotificacion = async (usuario_id, titulo, mensaje) => {
  await db.query(
    "INSERT INTO notificaciones (usuario_id, titulo, mensaje) VALUES ($1, $2, $3)",
    [usuario_id, titulo, mensaje]
  );
};

module.exports = { getMisNotificaciones, marcarLeida, marcarTodasLeidas, crearNotificacion };