import React, { useState, useEffect } from "react";
import { useGoalApi } from "../services/api";
import BudgetItem from "../components/budget/BudgetItem";
import CreateBudget from "../components/budget/CreateBudget";
import BudgetList from "../components/budget/BudgetList";

const Budgets = () => {
    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold">My Budgets</h1>
            <ul className="mt-4">
                <BudgetList />
            </ul>
        </div>
    );
};

export default Budgets;
