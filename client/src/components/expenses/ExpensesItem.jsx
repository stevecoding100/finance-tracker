import React, { useState } from "react";
import { Link } from "react-router-dom";

const ExpenseItem = ({ transactions }) => {
    const { amount, category, description, id, type, created_at } =
        transactions;

    const date = new Date(created_at).toLocaleDateString();

    if (type === "income") {
        return;
    }

    return (
        <Link to={`/dashboard/incomes/${id}`}>
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
                            {"💸"}
                        </h2>
                        <div>
                            <h2 className="font-bold uppercase">{category}</h2>
                            <h2 className="text-sm text-gray-500">{date}</h2>
                        </div>
                    </div>
                    <h2 className="font-bold text-primary text-lg text-red-800">
                        ${amount}
                    </h2>
                </div>

                <div className="mt-5">
                    <div className="mb-3">
                        <h2 className="text-xs text-slate-400">
                            {description}
                        </h2>
                    </div>
                    <div
                        className="w-full
            bg-red-800 h-2 rounded-full"
                    ></div>
                </div>
            </div>
        </Link>
    );
};

export default ExpenseItem;
