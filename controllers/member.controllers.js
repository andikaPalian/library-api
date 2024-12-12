const Member = require("../models/member.models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const registerMember = async (req, res) => {
    try {
        const {name, email, password, phone, address} = req.body;
        if (!name || !email || !password || !phone || !address) {
            return res.status(400).json({message: "All fields are required"});
        };
        const availableMember = await Member.findOne({email});
        if (availableMember) {
            return res.status(400).json({message: "Member is alreadt exists"})
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const member = new Member({
            name,
            email,
            password: hashedPassword,
            phone,
            address
        });
        await member.save();
        res.status(200).json({message: "Member registered successfully", data: member});
    } catch (error) {
        console.error("Error registering member:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message || "An unexpected error occurred",
        });
    };
};

const loginMember = async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).json({message: "Please enter email and password"});
        };
        const member = await Member.findOne({email});
        if (member && (await bcrypt.compare(password, member.password))) {
            const accessToken = jwt.sign({id: member._id}, process.env.ACCESS_TOKEN, {expiresIn: "1d"});
            member.password = undefined;
            return res.status(200).json({message: "Member logged in successfully", data: {member, accessToken}});
        } else {
            return res.status(401).json({message: "Email or Password is not valid"});
        };
    } catch (error) {
        console.error("Error logging in member", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message || "An unexpected error occurred",
        });
    };
};

module.exports = {registerMember, loginMember};