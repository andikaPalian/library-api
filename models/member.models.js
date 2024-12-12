const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    phone: {type: String, required: true},
    address: {type: String, required: true},
    joinDate: {type: Date, default: Date.now},
    role: {type: String, default: "user", enum: ["user"]},
}, {
    timestamps: true,
});

module.exports = mongoose.model("Member", memberSchema);