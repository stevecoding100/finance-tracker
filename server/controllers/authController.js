const userModel = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");
const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const authController = {
    // User registration
    register: async (req, res) => {
        try {
            const { name, email, password } = req.body;

            // Check if the user already exists
            const existingUser = await userModel.getUserByEmail(email);
            if (existingUser) {
                return res.status(400).json({ message: "User already exists" });
            }

            // Create a new user
            const newUser = await userModel.createUser(name, email, password);

            // Create JWT token
            const token = jwt.sign(
                { id: newUser.id, email: newUser.email, name: newUser.name },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );

            return res.status(201).json({
                message: "User registered successfully",
                user: {
                    id: newUser.id,
                    name: newUser.name,
                    email: newUser.email,
                },
                token,
            });
        } catch (error) {
            console.error("Error registering user:", error.message);
            res.status(500).json({ error: "Server error during registration" });
        }
    },
    // User login
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            // Authenticate the user
            const { token, user } = await authMiddleware.authenticate(
                email,
                password
            );

            res.status(200).json({ message: "Login successful", token, user });
        } catch (error) {
            console.error("Error during login:", error.message);
            res.status(401).json({ error: error.message });
        }
    },
    // Get user profile
    getUserProfile: async (req, res) => {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                return res.status(401).json({ error: "No token provided" });
            }

            const token = authHeader.split(" ")[1]; // Extract the token
            const decoded = jwt.verify(token, JWT_SECRET);

            // Fetch the user by ID
            const user = await userModel.getUserById(decoded.id);
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            res.status(200).json({ user });
        } catch (error) {
            console.error("Error fetching user profile:", error.message);
            res.status(401).json({ error: "Invalid or expired token" });
        }
    },
    updateUser: async (req, res) => {
        const { userId } = req.params;
        const { name, email, password } = req.body;
        try {
            // Validate input (example: ensure email is valid)
            if (!name && !email && !password) {
                return res.status(400).json({ message: "No fields to update" });
            }
            const updates = {};
            if (name) updates.name = name;
            if (email) updates.email = email;
            if (password) updates.password = password;

            // Call the user model to update the user
            const updatedUser = await userModel.updateUser(userId, updates);

            if (!updatedUser) {
                return res.status(404).json({ message: "User not found" });
            }

            res.status(200).json({
                message: "User updated successfully",
                user: updatedUser,
            });
        } catch (error) {
            console.error("Error updating user:", error);
            res.status(500).json({
                message: "Server error while updating user",
            });
        }
    },
};

module.exports = authController;
