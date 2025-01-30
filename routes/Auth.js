const express = require("express");
const bcrypt = require("bcrypt");
const { generateToken } = require("../config/jwt");
const User = require("../models/User");
const router = express.Router();


router.post("/signup", async (req, res) => {
    try {
        const { username, password } = req.body;

        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const newUser = new User({ username, password });
        await newUser.save();

        const token = generateToken(newUser._id);
        res.status(201).json({ token });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});


router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ message: "Invalid credentials" });
        console.log("Credentials are incorrect");

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        const token = generateToken(user._id);
        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

module.exports = router;
