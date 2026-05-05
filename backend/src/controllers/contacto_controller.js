const db = require("../config/db");
const { crearNotificacion } = require("./notificaciones_controller");

const enviarConsulta = async (req, res) => {
  const { nombre, email, mensaje } = req.body;

  try {
    await db.query(
      "INSERT INTO consultas (nombre, email, mensaje) VALUES ($1, $2, $3)",
      [nombre, email, mensaje]
    );

    const admin = await db.query("SELECT id FROM usuarios WHERE rol = 'admin' LIMIT 1");
    if (admin.rows.length > 0) {
      await crearNotificacion(
        admin.rows[0].id,
        "Nueva consulta",
        `${nombre} (${email}) ha enviado una consulta: "${mensaje.slice(0, 80)}..."`
      );
    }

    res.json({ mensaje: "Consulta enviada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al enviar la consulta" });
  }
};

const getConsultas = async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM consultas ORDER BY fecha DESC"
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las consultas" });
  }
};

module.exports = { enviarConsulta, getConsultas };