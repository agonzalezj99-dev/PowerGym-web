const express = require("express");
const router = express.Router();
const { getMisInscripciones, inscribirse, cancelarInscripcion, getTodasInscripciones } = require("../controllers/inscripciones_controller");
const { auth, soloAdmin } = require("../middleware/auth_middleware");

router.get("/todas", auth, soloAdmin, getTodasInscripciones);
router.get("/", auth, getMisInscripciones);
router.post("/", auth, inscribirse);
router.delete("/:id", auth, cancelarInscripcion);

module.exports = router;