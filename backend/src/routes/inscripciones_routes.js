const express = require("express");
const router = express.Router();
const { getMisInscripciones, inscribirse, cancelarInscripcion } = require("../controllers/inscripciones.controller");
const { auth } = require("../middleware/auth.middleware");

router.get("/", auth, getMisInscripciones);
router.post("/", auth, inscribirse);
router.delete("/:id", auth, cancelarInscripcion);

module.exports = router;