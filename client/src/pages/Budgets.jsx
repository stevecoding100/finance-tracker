import React, { useState, useEffect } from "react";
import {
    createGoal,
    getAllGoals,
    getGoalById,
    updateGoal,
    deleteGoal,
} from "../services/api";
import { useAuth } from "../auth/authContext";

const Budgets = () => {
    const { user } = useAuth();
    const [goals, setGoals] = useState([]);
    const userId = user.user.id;
    useEffect(() => {
        const fetchGoals = async () => {
            try {
                const response = await getAllGoals(userId);
                setGoals(response.data);
            } catch (error) {
                console.error("Error fetching goals:", error);
            }
        };

        fetchGoals();
    }, [userId]);

    return (
        <div>
            <h1>Budgets</h1>
            <ul>
                {goals.map((goal) => (
                    <li key={goal.id}>{goal.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Budgets;
