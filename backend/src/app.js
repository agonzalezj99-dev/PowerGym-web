const express = require("express");
const cors = require("cors");
require("dotenv").config();

const usuariosRoutes = require("./routes/usuarios_routes");
const clasesRoutes = require("./routes/clases_routes");
const inscripcionesRoutes = require("./routes/inscripciones_routes");
const contactoRoutes = require("./routes/contacto_routes");
const notificacionesRoutes = require("./routes/notificaciones_routes");
const rutinasRoutes = require("./routes/rutinas_routes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/usuarios", usuariosRoutes);
app.use("/api/clases", clasesRoutes);
app.use("/api/inscripciones", inscripcionesRoutes);
app.use("/api/contacto", contactoRoutes);
app.use("/api/notificaciones", notificacionesRoutes);
app.use("/api/rutinas", rutinasRoutes);

app.get("/", (req, res) => {
  res.json({ mensaje: "API PowerGym funcionando" });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});