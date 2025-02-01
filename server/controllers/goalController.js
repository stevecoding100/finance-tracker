const goalModel = require("../models/Goal");

const goalController = {
    // Create a new goal
    createGoal: async (req, res) => {
        try {
            const { userId, emoji, title, targetAmount, savedAmount } =
                req.body;

            // Validate required fields
            if (!userId || !title) {
                res.status(400).json({
                    message: "User ID and title are required",
                });
            }

            // Create a new goal
            const newGoal = await goalModel.createGoal(
                userId,
                emoji,
                title,
                targetAmount,
                savedAmount
            );

            res.status(201).json({
                message: "Goal created successfully",
                goal: newGoal,
            });
        } catch (error) {
            console.error("Error creating goal:", error.message);
            res.status(500).json({
                message: "Server error while creating goal",
            });
        }
    },
    // Get all goals for a user
    getGoalsByUser: async (req, res) => {
        try {
            const { userId } = req.params;

            if (!userId) {
                return res.status(400).json({ message: "User ID is required" });
            }

            const goals = await goalModel.getGoalsByUser(userId);

            res.status(200).json(goals);
        } catch (error) {
            console.error("Error fetching goals:", error.message);
            res.status(500).json({
                message: "Server error while fetching goals",
            });
        }
    },
    // Get a specific goal by its ID
    getGoalById: async (req, res) => {
        try {
            const { goalId } = req.params;

            if (!goalId) {
                return res.status(400).json({ message: "Goal ID is required" });
            }
            const goal = await goalModel.getGoalById(goalId);

            if (!goal) {
                return res.status(404).json({ message: "Goal not found" });
            }

            res.status(200).json(goal);
        } catch (error) {
            console.error("Error fetching goal:", error.message);
            res.status(500).json({
                message: "Server error while fetching goal",
            });
        }
    },
    // Update a goal
    updateGoal: async (req, res) => {
        try {
            const { goalId } = req.params;
            const updates = req.body;

            if (!goalId) {
                return res.status(400).json({ message: "Goal ID is required" });
            }

            const updatedGoal = await goalModel.updateGoal(goalId, updates);

            if (!updatedGoal) {
                return res.status(404).json({ message: "Goal not found" });
            }

            res.status(200).json({
                message: "Goal updated successfully",
                goal: updatedGoal,
            });
        } catch (error) {
            console.error("Error updating goal:", error.message);
            res.status(500).json({
                message: "Server error while updating goal",
            });
        }
    },
    // Delete a goal
    deleteGoal: async (req, res) => {
        try {
            const { goalId } = req.params;

            if (!goalId) {
                return res.status(400).json({ message: "Goal ID is required" });
            }

            const deletedGoal = await goalModel.deleteGoal(goalId);

            if (!deletedGoal) {
                return res.status(404).json({ message: "Goal not found" });
            }

            res.status(200).json({
                message: "Goal deleted successfully",
            });
        } catch (error) {
            console.error("Error deleting goal:", error.message);
            res.status(500).json({
                message: "Server error while deleting goal",
            });
        }
    },
};

module.exports = goalController;
