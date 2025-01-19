const { client } = require("../database/db");

const transactionModel = {
    // Create a new transaction
    createTransaction: async ({
        userId,
        category,
        type,
        amount,
        description,
    }) => {
        try {
            const query = `
                INSERT INTO transactions (user_id, category, type, amount, description)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING *;
            `;
            const values = [userId, category, type, amount, description];
            const result = await client.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error("Error creating transaction:", error.message);
            throw new Error("Database error while creating transaction");
        }
    },
    // Retrieve all transactions for a user
    getTransactionsByUserId: async (userId) => {
        try {
            const query = `
                SELECT * FROM transactions
                WHERE user_id = $1
                ORDER BY created_at DESC;
            `;
            const values = [userId];
            const result = await client.query(query, values);
            return result.rows;
        } catch (error) {
            console.error("Error retrieving transactions:", error.message);
            throw new Error("Database error while retrieving transactions");
        }
    },
    // Retrieve a single transaction by ID
    getTransactionById: async (transactionId) => {
        try {
            const query = `
                SELECT * FROM transactions
                WHERE id = $1;
            `;
            const values = [transactionId];
            const result = await client.query(query, values);
            if (result.rows.length === 0) {
                throw new Error("Transaction not found");
            }
            return result.rows[0];
        } catch (error) {
            console.error("Error retrieving transaction:", error.message);
            throw new Error("Database error while retrieving transaction");
        }
    },
    // Update a transaction
    updateTransaction: async (
        transactionId,
        { category, type, amount, description }
    ) => {
        try {
            const query = `
                UPDATE transactions
                SET category = $1, type = $2, amount = $3, description = $4, created_at = NOW()
                WHERE id = $5
                RETURNING *;
            `;
            const values = [category, type, amount, description, transactionId];
            const result = await client.query(query, values);
            if (result.rows.length === 0) {
                throw new Error("Transaction not found");
            }
            return result.rows[0];
        } catch (error) {
            console.error("Error updating transaction:", error.message);
            throw new Error("Database error while updating transaction");
        }
    },
    // Delete a transaction
    deleteTransaction: async (transactionId) => {
        try {
            const query = `
                DELETE FROM transactions
                WHERE id = $1
                RETURNING *;
            `;
            const values = [transactionId];
            const result = await client.query(query, values);
            if (result.rows.length === 0) {
                throw new Error("Transaction not found");
            }
            return result.rows[0];
        } catch (error) {
            console.error("Error deleting transaction:", error.message);
            throw new Error("Database error while deleting transaction");
        }
    },
};

module.exports = transactionModel;
