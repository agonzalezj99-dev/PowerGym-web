const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/usuarios_controller");
const { auth } = require("../middleware/auth_middleware");

router.post("/register", register);
router.post("/login", login);

module.exports = router;