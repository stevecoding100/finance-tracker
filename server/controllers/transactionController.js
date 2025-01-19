const transactionModel = require("../models/Transaction");

const transactionController = {
    // Create a new transaction
    createTransaction: async (req, res) => {
        try {
            const { userId, category, type, amount, description } = req.body;

            // Validate inputs
            if (!userId || !category || !type || !amount) {
                return res
                    .status(400)
                    .json({ message: "All fields are required" });
            }

            const newTransaction = await transactionModel.createTransaction({
                userId,
                category,
                type,
                amount,
                description,
            });

            res.status(201).json({
                message: "Transaction created successfully",
                transaction: newTransaction,
            });
        } catch (error) {
            console.error("Error creating transaction:", error.message);
            res.status(500).json({ message: "Error creating transaction" });
        }
    },
    // Get all transactions for a user
    getTransactions: async (req, res) => {
        try {
            const { userId } = req.params;

            // Validate userId
            if (!userId) {
                return res.status(400).json({ message: "User ID is required" });
            }

            const transactions = await transactionModel.getTransactionsByUserId(
                userId
            );

            res.status(200).json({
                message: "Transaactions retrieved successfully",
                transactions,
            });
        } catch (error) {
            console.error("Error fetching transactions:", error.message);
            res.status(500).json({ message: "Error fetching transactions" });
        }
    },
    // Get a single transaction by ID
    getTransactionById: async (req, res) => {
        try {
            const { transactionId } = req.params;

            if (!transactionId) {
                return res
                    .status(400)
                    .json({ message: "Transaction ID is required" });
            }

            const transaction = await transactionModel.getTransactionById(
                transactionId
            );

            res.status(200).json({
                message: "Transaction retrieved successfully",
                transaction,
            });
        } catch (error) {
            console.error("Error fetching transaction:", error.message);
            res.status(500).json({ message: "Error fetching transaction" });
        }
    },
    // Update an existing transaction
    updateTransaction: async (req, res) => {
        try {
            const { transactionId } = req.params;
            const { category, type, amount, description } = req.body;

            if (!transactionId) {
                return res
                    .status(400)
                    .json({ message: "Transaction ID is required" });
            }

            const updatedTransaction = await transactionModel.updateTransaction(
                transactionId,
                {
                    category,
                    type,
                    amount,
                    description,
                }
            );

            res.status(200).json({
                message: "Transaction updated successfully",
                transaction: updatedTransaction,
            });
        } catch (error) {
            console.error("Error updating transaction:", error.message);
            res.status(500).json({ message: "Error updating transaction" });
        }
    },
    // Delete a transaction
    deleteTransaction: async (req, res) => {
        try {
            const { transactionId } = req.params;

            if (!transactionId) {
                return res
                    .status(400)
                    .json({ message: "Transaction ID is required" });
            }

            const deletedTransaction = await transactionModel.deleteTransaction(
                transactionId
            );

            res.status(200).json({
                message: "Transaction deleted successfully",
                transaction: deletedTransaction,
            });
        } catch (error) {
            console.error("Error deleting transaction:", error.message);
            res.status(500).json({ message: "Error deleting transaction" });
        }
    },
};

module.exports = transactionController;
