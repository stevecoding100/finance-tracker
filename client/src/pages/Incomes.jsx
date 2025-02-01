import React from "react";
import IncomeList from "../components/Incomes/IncomeList";

const Incomes = () => {
    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold">My Incomes</h1>
            <ul className="mt-4">
                <IncomeList />
            </ul>
        </div>
    );
};

export default Incomes;
