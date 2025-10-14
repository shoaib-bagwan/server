const User = require('../models/user');
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();
const JWT_SECURE_KEY = process.env.JWT_SECRET;

router.post('/register', async (req, res) => {
    try {
        const { username, email, password,address,mobileNo, role } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(404).send({ message: "user already found" })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            mobileNo,
            address,
            password: hashedPassword,
            role: role || "user"
        });
        const savedUser = await newUser.save();
        const token = jwt.sign({ id: savedUser._id }, JWT_SECURE_KEY, { expiresIn: '1h' });
        res.status(200).json({ user: savedUser, token });
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
});
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Invalid username or Password" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(404).json({ message: "Invalid email and Password" });
        }
        const token = jwt.sign({ id: user._id }, JWT_SECURE_KEY, { expiresIn: '1h' })
        res.json({
            message: "Login Successfully",
            token,
            role: user.role,
            username: user.username,
            mobileNo: user.mobileNo,
            address: user.address,
            email: user.email,
        });
    } catch (e) {
        res.status(500).json({ message: e.message })
    }

});
router.get('/showalluser', async (req, res) => {
    const info = await User.find({})
    res.status(200).send(info);
});
router.get('user/:id', async (req, res) => {
    try {
        const info = await User.find({})
        if (info) {
            res.status(200).send(info);
        } else {
            res.status(404).json({ message: "data not found" });
        }
    } catch (err) {
        res.status(500).send(err)
    }
});

module.exports = router;
