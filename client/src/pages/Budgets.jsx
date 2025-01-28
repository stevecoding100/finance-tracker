import React, { useState, useEffect } from "react";
import { useGoalApi } from "../services/api";

const Budgets = () => {
    const { createGoal, getAllGoals, getGoalById, updateGoal, deleteGoal } =
        useGoalApi();

    const [goals, setGoals] = useState([]);

    useEffect(() => {
        const fetchGoals = async () => {
            try {
                const response = await getAllGoals();
                setGoals(response.data);
            } catch (error) {
                console.error("Error fetching goals:", error);
            }
        };

        fetchGoals();
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-bold">Budgets</h1>
            <ul className="mt-4">
                {goals.map((goal) => (
                    <li key={goal.id} className="text-xl ">
                        {goal.title}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Budgets;
