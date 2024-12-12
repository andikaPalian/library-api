const express = require("express");
const { registerMember, loginMember } = require("../controllers/member.controllers");
const router = express.Router();

router.post("/register", registerMember);
router.post("/login", loginMember);

module.exports = router;