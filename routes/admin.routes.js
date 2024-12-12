const express = require("express");
const { registerAdmin, loginAdmin } = require("../controllers/admin.controllers");
const { validateToken, validateAdmin } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register",validateToken, validateAdmin, registerAdmin); // Hanya admin yang dapat menambahkan admin lain
router.post("/login", loginAdmin);

module.exports = router;