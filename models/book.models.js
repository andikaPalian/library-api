const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    publisher: {type: String, required: true},
    publicationYear: {type: Number, required: true},
    pages: {type: Number, required: true},
    genre: {type: String, required: true},
}, {
    timestamps: true,
});

module.exports = mongoose.model("Book", bookSchema);