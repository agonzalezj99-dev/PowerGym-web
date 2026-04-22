const express = require("express");
const router = express.Router();
const { enviarConsulta, getConsultas } = require("../controllers/contacto.controller");
const { auth, soloAdmin } = require("../middleware/auth.middleware");

router.post("/", enviarConsulta);
router.get("/", auth, soloAdmin, getConsultas);

module.exports = router;