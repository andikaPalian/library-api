const express = require("express");
const { addBook, getAll, getSingleBook, updateBook, deleteBook } = require("../controllers/book.controllers");
const router = express.Router();

router.post("/add", addBook);
router.get("/get", getAll);
router.get("/get/:id", getSingleBook);
router.put("/update/:id", updateBook);
router.delete("/delete/:id", deleteBook);

module.exports = router;