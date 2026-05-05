const express = require("express");
const router = express.Router();
const { register, login, getPerfil, updatePerfil, getEstadisticas, getTodosUsuarios, updateUsuario, deleteUsuario } = require("../controllers/usuarios_controller");
const { auth, soloAdmin } = require("../middleware/auth_middleware");

router.post("/register", register);
router.post("/login", login);
router.get("/perfil", auth, getPerfil);
router.put("/perfil", auth, updatePerfil);
router.get("/estadisticas", auth, soloAdmin, getEstadisticas);
router.get("/todos", auth, soloAdmin, getTodosUsuarios);
router.put("/:id", auth, soloAdmin, updateUsuario);
router.delete("/:id", auth, soloAdmin, deleteUsuario);

module.exports = router;