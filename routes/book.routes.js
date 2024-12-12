const express = require("express");
const { addBook, getAll, getSingleBook, updateBook, deleteBook } = require("../controllers/book.controllers");
const {validateToken, validateAdmin} = require("../middleware/authMiddleware");
const router = express.Router();

router.use(validateToken);
router.post("/add", validateAdmin, addBook);
router.get("/get", getAll);
router.get("/get/:id", getSingleBook);
router.put("/update/:id", validateAdmin,  updateBook);
router.delete("/delete/:id", validateAdmin, deleteBook);

module.exports = router;