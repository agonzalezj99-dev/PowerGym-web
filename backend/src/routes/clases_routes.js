const express = require("express");
const router = express.Router();
const { getClases, getClase, createClase, updateClase, deleteClase } = require("../controllers/clases.controller");
const { auth, soloAdmin } = require("../middleware/auth.middleware");

router.get("/", getClases);
router.get("/:id", getClase);
router.post("/", auth, soloAdmin, createClase);
router.put("/:id", auth, soloAdmin, updateClase);
router.delete("/:id", auth, soloAdmin, deleteClase);

module.exports = router;