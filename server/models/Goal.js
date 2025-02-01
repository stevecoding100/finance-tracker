const { client } = require("../database/db");

const goalModel = {
    //Create a new goal
    createGoal: async (userId, emoji, title, targetAmount, savedAmount) => {
        const SQL = ` 
        INSERT INTO goals (user_id, emoji, title, target_amount, saved_amount, created_at)
        VALUES ($1, $2, $3, $4, $5, NOW())
        RETURNING *;
        `;
        const values = [userId, emoji, title, targetAmount, savedAmount];
        const { rows } = await client.query(SQL, values);
        return rows[0];
    },

    // Get all goals for a user
    getGoalsByUser: async (userId) => {
        const SQL = `
        SELECT * FROM goals
        WHERE user_id = $1
        ORDER BY created_at DESC
        `;
        const { rows } = await client.query(SQL, [userId]);
        return rows;
    },
    // Get a specific goal by its ID
    getGoalById: async (goalId) => {
        const SQL = `
        SELECT * FROM goals
        WHERE id = $1
        `;
        const { rows } = await client.query(SQL, [goalId]);
        return rows[0];
    },

    // Update a goal by its ID
    updateGoal: async (goalId, updates) => {
        const fields = Object.keys(updates)
            .map((key, index) => `${key} = $${index + 2}`)
            .join(", ");
        const values = [goalId, ...Object.values(updates)];

        const SQL = `
        UPDATE goals
        SET ${fields}, created_at = NOW()
        WHERE id = $1
        RETURNING *
        `;
        const { rows } = await client.query(SQL, values);
        return rows[0];
    },
    // Delete a goal by its ID
    deleteGoal: async (goalId) => {
        const SQL = `
            DELETE FROM goals
            WHERE id = $1
            RETURNING *;
        `;
        const { rows } = await client.query(SQL, [goalId]);
        return rows[0];
    },
};

module.exports = goalModel;
