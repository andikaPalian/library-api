const express = require("express");
const { addBook } = require("../controllers/book.controllers");
const router = express.Router();

router.post("/add", addBook);

module.exports = router;