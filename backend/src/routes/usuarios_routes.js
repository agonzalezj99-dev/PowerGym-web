const express = require("express");
const router = express.Router();
const { register, login, getPerfil, updatePerfil, deletePerfil } = require("../controllers/usuarios_controller");
const { auth } = require("../middleware/auth_middleware");

router.post("/register", register);
router.post("/login", login);
router.get("/perfil", auth, getPerfil);
router.put("/perfil", auth, updatePerfil);
router.delete("/perfil", auth, deletePerfil);

module.exports = router;