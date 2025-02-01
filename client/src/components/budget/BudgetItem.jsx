import React, { useState } from "react";
import { Link } from "react-router-dom";

const BudgetItem = ({ budget, index }) => {
    const { id, emoji, saved_amount, target_amount, title } = budget;

    const calculateProgressPerc = () => {
        const perc = (saved_amount / target_amount) * 100;
        return perc > 100 ? 100 : perc.toFixed(2);
    };

    return (
        <Link to={`/dashboard/budgets/${id}`}>
            <div
                className="p-5 border rounded-2xl
  hover:shadow-md cursor-pointer h-[170px]"
            >
                <div className="flex gap-2 items-center justify-between">
                    <div className="flex gap-2 items-center">
                        <h2
                            className="text-2xl p-3 px-4
            bg-slate-100 rounded-full 
            "
                        >
                            {emoji}
                        </h2>
                        <div>
                            <h2 className="font-bold">{title}</h2>
                            {/* <h2 className="text-sm text-gray-500">3 Item</h2> */}
                        </div>
                    </div>
                    <h2 className="font-bold text-primary text-lg text-purple-800">
                        ${target_amount}
                    </h2>
                </div>

                <div className="mt-5">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-xs text-slate-400">
                            ${saved_amount} Saved
                        </h2>
                        <h2 className="text-xs text-slate-400">
                            ${target_amount - saved_amount} Remaining
                        </h2>
                    </div>
                    <div
                        className="w-full
            bg-slate-300 h-2 rounded-full"
                    >
                        <div
                            className="
            bg-primary h-2 rounded-full"
                            style={{
                                width: `${calculateProgressPerc()}%`,
                            }}
                        ></div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default BudgetItem;
