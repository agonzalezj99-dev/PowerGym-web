const db = require("../config/db");
const { Resend } = require("resend");

const enviarConsulta = async (req, res) => {
  const { nombre, email, mensaje } = req.body;

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    await db.query(
      "INSERT INTO consultas (nombre, email, mensaje) VALUES ($1, $2, $3)",
      [nombre, email, mensaje]
    );

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: process.env.EMAIL_DESTINO,
      subject: `Nueva consulta de ${nombre}`,
      html: `
        <h2>Nueva consulta - PowerGym</h2>
        <p><b>Nombre:</b> ${nombre}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Mensaje:</b> ${mensaje}</p>
      `
    });

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