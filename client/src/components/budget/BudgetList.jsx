import React, { useEffect, useState } from "react";
import { useGoalApi } from "../../services/api";
import CreateBudget from "./CreateBudget";
import BudgetItem from "./BudgetItem";

const BudgetList = () => {
    const [budgetList, setBudgetList] = useState([]);
    const { getAllGoals } = useGoalApi();

    useEffect(() => {
        const fetchGoals = async () => {
            try {
                const response = await getAllGoals();
                setBudgetList(response.data);
            } catch (error) {
                console.error("Error fetching goals:", error);
            }
        };
        fetchGoals();
    }, []);
    return (
        <div className="mt-7">
            <div
                className="grid grid-cols-1
    md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
                <CreateBudget />
                {budgetList?.length > 0
                    ? budgetList.map((budget, index) => (
                          <BudgetItem budget={budget} key={index} />
                      ))
                    : [1, 2, 3, 4].map((item, index) => (
                          <div
                              key={index}
                              className="w-full bg-slate-200 rounded-lg
    h-[150px]"
                          ></div>
                      ))}
            </div>
        </div>
    );
};

export default BudgetList;
