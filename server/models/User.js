const uuid = require("uuid");
require("dotenv").config();
const { client } = require("../database/db");
const bcrypt = require("bcrypt");

const userModel = {
    getUserById: async (userId) => {
        try {
            const SQL = `SELECT id, name, email FROM users WHERE id = $1`;
            const { rows } = await client.query(SQL, [userId]);
            if (rows.length === 0) {
                throw new Error("User not found");
            }
            return rows[0];
        } catch (error) {
            console.error("Error fetching user by ID: ", error);
            throw error;
        }
    },
    // Create a new user
    createUser: async (name, email, password) => {
        try {
            // Hash the password before saving
            const hashedPassword = await bcrypt.hash(password, 10);
            const SQL = `
                INSERT INTO users (id, name, email, password)
                VALUES ($1, $2, $3, $4)
                RETURNING *;
            `;
            const userId = uuid.v4(); // Generate a unique ID
            const { rows } = await client.query(SQL, [
                userId,
                name,
                email,
                hashedPassword,
            ]);
            return rows[0];
        } catch (error) {
            console.error("Error creating user: ", error);
            throw error;
        }
    },
    // Update user details
    updateUser: async (userId, updatedFields) => {
        try {
            const allowedFields = ["name", "email", "password"];
            const updates = Object.keys(updatedFields)
                .filter((key) => allowedFields.includes(key))
                .map((key, idx) => `${key} = $${idx + 2}`);
            if (updatedFields.password) {
                updatedFields.password = await bcrypt.hash(
                    updatedFields.password,
                    10
                );
            }
            const SQL = `
                UPDATE users
                SET ${updates.join(", ")}
                WHERE id = $1
                RETURNING *;
            `;
            const values = [userId, ...Object.values(updatedFields)];
            const { rows } = await client.query(SQL, values);
            if (rows.length === 0) {
                throw new Error("User not found or no changes made");
            }
            return rows[0];
        } catch (error) {
            console.error("Error updating user: ", error);
            throw error;
        }
    },
    // Delete user
    deleteUser: async (userId) => {
        try {
            const SQL = `DELETE FROM users WHERE id = $1 RETURNING *`;
            const { rows } = await client.query(SQL, [userId]);
            if (rows.length === 0) {
                throw new Error("User not found");
            }
            return rows[0];
        } catch (error) {
            console.error("Error deleting user: ", error);
            throw error;
        }
    },
    // Get user by email
    getUserByEmail: async (email) => {
        try {
            const SQL = `SELECT email FROM users WHERE email = $1`;
            const { rows } = await client.query(SQL, [email]);
            return rows[0];
        } catch (error) {
            console.error("Error fetching user by email: ", error);
            throw error;
        }
    },
};

module.exports = userModel;
