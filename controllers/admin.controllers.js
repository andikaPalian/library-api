const Admin = require("../models/admin.models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const registerAdmin = async (req, res) => {
    try {
        const {username, email, password} = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({message: "All fields are required"});
        };
        const adminAvailable = await Admin.findOne({email});
        if (adminAvailable) {
            return res.statua(400).json({message: "Admin already registered"});
        };
        const hashedPassword = await bcrypt.hash(password, 10);
        const admin = new Admin({
            username,
            email,
            password: hashedPassword,
        });
        await admin.save();
        res.status(201).json({message: "Admin registered successfully", data: admin});
    } catch (error) {
        console.error("Error registering admin:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message || "An unexpected error occurred",
        });
    };
};

const loginAdmin = async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).json({message: "Please enter email and password"});
        };
        const admin = await Admin.findOne({email});
        if (admin && (await bcrypt.compare(password, admin.password))) {
            const accessToken = jwt.sign({id: admin._id}, process.env.ACCESS_TOKEN, {expiresIn: "1d"});
            admin.password = undefined;
            return res.status(200).json({message: "Admin logged in successfully", data: {admin, accessToken}});
        } else {
            return res.status(401).json({message: "Email or Password is not valid"});
        };
    } catch (error) {
        console.error("Error logging in admin:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message || "An unexpected error occurred",
        });
    };
};

module.exports = {registerAdmin, loginAdmin};