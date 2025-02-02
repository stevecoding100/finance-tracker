import React from "react";
import ExpenseList from "../components/expenses/ExpensList";

const Expenses = () => {
    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold">My Expenses</h1>
            <ul className="mt-4">
                <ExpenseList />
            </ul>
        </div>
    );
};

export default Expenses;
