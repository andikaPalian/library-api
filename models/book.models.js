const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    judul: {type: String, required: true},
    penulis: {type: String, required: true},
    penerbit: {type: String, required: true},
    tahunTerbit: {type: Number, required: true},
    jumlahHalaman: {type: Number, required: true},
    genre: {type: String, required: true},
}, {
    timestamps: true,
});

module.exports = mongoose.model("Book", bookSchema);