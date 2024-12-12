const Loan = require("../models/loan.models");
const Book = require("../models/book.models");

const borrowBook = async (req, res) => {
    try {
        const {bookId} = req.body;
        const memberId = req.user.id;
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({message: "Book Not Found"});
        };
        const loan = new Loan({
            memberId,
            bookId,
        });
        await loan.save();
        res.status(200).json({message: "Book borrowed successfully", data: loan});
    } catch (error) {
        console.error("Error borrowing book", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message || "An unexpected error occured",
        });
    };
};

const returnBook = async (req, res) => {
    try {
        const {loanId} = req.body;
        const loan = await Loan.findById(loanId);
        if (!loan || loan.status === "returned") {
            return res.status(400).json({message: "Invalid loan or already returned"});
        };
        loan.status = "returned";
        loan.returnDate = new Date();
        await loan.save();
        res.status(200).json({message: "Book returned successfully", data: loan});
    } catch (error) {
        console.error("Error returning book:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message || "An unexpected error occurred",
        });
    };
};

module.exports = {borrowBook, returnBook};