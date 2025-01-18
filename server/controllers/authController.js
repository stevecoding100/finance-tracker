const userModel = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");
const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");

const authController = {
    // User registration
};
