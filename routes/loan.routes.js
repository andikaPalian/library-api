const express = require("express");
const { validateToken } = require("../middleware/authMiddleware");
const { borrowBook, returnBook } = require("../controllers/loan.controllers");
const router = express.Router();

router.use(validateToken);
router.post("/borrow", borrowBook);
router.post("/return", returnBook);

module.exports = router;