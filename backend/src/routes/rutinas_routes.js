const express = require("express");
const router = express.Router();

const { generarRutina } = require("../controllers/rutinas_controller");
const { auth } = require("../middleware/auth_middleware");

router.post("/", auth, generarRutina);

module.exports = router;