const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { client } = require("../database/db");
const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = {
    authenticate: async (email, password) => {
        try {
            // Fetch the user by email
            const SQL = `SELECT * FROM users WHERE email = $1`;
            const { rows } = await client.query(SQL, [email]);
            if (rows.length === 0) {
                throw new Error("Invalid email or password");
            }
            const user = rows[0];

            // Verify the password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                throw new Error("Invalid email or password");
            }

            // Generate a JWT token
            const token = jwt.sign(
                { id: user.id, email: user.email, name: user.name },
                JWT_SECRET,
                { expiresIn: "1h" } // Token expires in 1 hour
            );

            return {
                token,
                user: { id: user.id, name: user.name, email: user.email },
            };
        } catch (error) {
            console.error("Authentication failed:", error.message);
            throw error;
        }
    },
    findUserWithToken: async (token) => {
        try {
            // Verify the JWT token
            const payload = jwt.verify(token, JWT_SECRET);

            // Fetch the user from the database using the user_id from the token
            const SQL = `SELECT * FROM users WHERE id = $1`;
            const response = await client.query(SQL, [payload.id]);

            // If user not found, throw an error
            if (response.rows.length === 0) {
                throw new Error("User not found");
            }
            // Return the user
            return response.rows[0];
        } catch (error) {
            const err = new Error("Invalid token");
            err.status = 401;
            throw err;
        }
    },
};

module.exports = authMiddleware;
