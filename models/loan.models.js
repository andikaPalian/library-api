const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema({
    memberId: {type: mongoose.Schema.Types.ObjectId, ref: "Member", required: true},
    bookId: {type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true},
    loanDate: {type: Date, default: Date.now},
    returnDate: {type: Date},
    status: {type: String, enum: ["borrowed", "returned"], default: "borrowed"},
}, {
    timestamps: true,
});

module.exports = mongoose.model("Loan", loanSchema);