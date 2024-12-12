const mongoose = require("mongoose");
const Book = require("../models/book.models");

const addBook = async (req, res) => {
    try {
        const {judul, penulis, penerbit, tahunTerbit, jumlahHalaman, genre} = req.body;
        if (!judul || !penulis || !penerbit || !tahunTerbit || !jumlahHalaman || !genre) {
            return res.status(400).json({message: "All fields are required"});
        };
        const book = new Book({
            judul,
            penulis,
            penerbit,
            tahunTerbit,
            jumlahHalaman,
            genre,
        });
        await book.save();
        res.status(201).json({
            message: "Book added successfully",
            data: book,
        })
    } catch (error) {
        console.error("Error adding book:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message || "An unexpected error occurred",
        });
    };
};

module.exports = {addBook};