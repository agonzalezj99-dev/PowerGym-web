const express = require("express");
const router = express.Router();
const { getMisInscripciones, inscribirse, cancelarInscripcion } = require("../controllers/inscripciones_controller");
const { auth } = require("../middleware/auth_middleware");

router.get("/", auth, getMisInscripciones);
router.post("/", auth, inscribirse);
router.delete("/:id", auth, cancelarInscripcion);

module.exports = router;