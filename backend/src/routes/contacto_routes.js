const express = require("express");
const router = express.Router();
const { enviarConsulta, getConsultas } = require("../controllers/contacto_controller");
const { auth, soloAdmin } = require("../middleware/auth_middleware");

router.post("/", enviarConsulta);
router.get("/", auth, soloAdmin, getConsultas);

module.exports = router;