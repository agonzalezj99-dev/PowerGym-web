const express = require("express");
const router = express.Router();
const { getMisNotificaciones, marcarLeida, marcarTodasLeidas } = require("../controllers/notificaciones_controller");
const { auth } = require("../middleware/auth_middleware");

router.get("/", auth, getMisNotificaciones);
router.put("/leer-todas", auth, marcarTodasLeidas);
router.put("/:id/leer", auth, marcarLeida);

module.exports = router;