const { User } = require("../models/user.model");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/generateToken");

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already exists with this email."
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            name,
            email,
            password: hashedPassword
        });
        return res.status(201).json({
            success: true,
            message: "Account created successfully."
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to register"
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password"
            });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password"
            });
        }
        generateToken(res, user, `Welcome back ${user.name}`);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to login"
        });
    }
};

const logout = async (_, res) => {
    try {
        return res.status(200).cookie('token', '', { maxAge: 0 }).json({
            message: 'Logged out successfully.',
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Failed to logout'
        });
    }
};

module.exports = { register, login, logout }; // ✅ CommonJS export
