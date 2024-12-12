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

const getAll = async (req, res) => {
    try {
        const { genre } = req.query;
        const filters = {};
        if (genre) {
            filters.genre = genre;
        };
        const books = await Book.find(filters);
        if (!books || books.length === 0) {
            return res.status(404).json({message: genre ? `Book with genre ${genre} not found` : "Books Not Found"});
        };
        res.status(200).json({books});
    } catch (error) {
        console.error("Error getting books:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message || "An unexpected error occurred",
        });
    };
};

const getSingleBook = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({message: "No book with that ID"});
        };
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({message: "Book Not Found"});
        };
        res.status(200).json({book});
    } catch (error) {
        console.error("Error getting book:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message || "An unexpected error occurred",
        });
    };
};

const updateBook = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({message: "No book with that ID"});
        };
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({message: "Book Not Found"});
        };
        const updateBook = await Book.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json({message: "Book updated successfully", data: updateBook});
    } catch (error) {
        console.error("Error updating book:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message || "An unexpected error occurred",
        });
    };
};

const deleteBook = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({message: "No book with that ID"});
        };
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) {
            return res.status(404).json({message: "Book Not Found"});
        };
        res.status(200).json({message: "Book deleted successfully"});
    } catch (error) {
        console.error("Error deleting book:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message || "An unexpected error occurred",
        });
    };
};

module.exports = {addBook, getAll, getSingleBook, updateBook, deleteBook};