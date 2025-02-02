import React, { useEffect, useState } from "react";

import { PiggyBank, ReceiptText, Wallet, CircleDollarSign } from "lucide-react";
import formatNumber from "../utils/formatNumber";

const CardInfo = ({ transactions, budgetList }) => {
    const totalBudget = budgetList.reduce(
        (accumulator, goal) => accumulator + parseFloat(goal.saved_amount),
        0
    );

    const totalSpent = transactions
        .filter((transaction) => transaction.type === "expense")
        .reduce(
            (accumulator, transaction) =>
                accumulator + parseFloat(transaction.amount),
            0
        );

    const totalIncome = transactions
        .filter((transaction) => transaction.type === "income")
        .reduce(
            (accumulator, transaction) =>
                accumulator + parseFloat(transaction.amount),
            0
        );
    return (
        <div>
            {/* TotalIncome */}
            <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <div className="p-7 border rounded-2xl flex items-center justify-between">
                    <div>
                        <h2 className="text-sm">Total Income</h2>
                        <h2 className="font-bold text-2xl">
                            ${formatNumber(totalIncome)}
                        </h2>
                    </div>
                    <CircleDollarSign className="bg-blue-800 p-3 h-12 w-12 rounded-full text-white" />
                </div>

                {/* TotalBudget */}

                <div className="p-7 border rounded-2xl flex items-center justify-between">
                    <div>
                        <h2 className="text-sm">Total Budget</h2>
                        <h2 className="font-bold text-2xl">
                            ${formatNumber(totalBudget)}
                        </h2>
                    </div>
                    <PiggyBank className="bg-blue-800 p-3 h-12 w-12 rounded-full text-white" />
                </div>

                {/* TotalSpent */}

                <div className="p-7 border rounded-2xl flex items-center justify-between">
                    <div>
                        <h2 className="text-sm">Total Spent</h2>
                        <h2 className="font-bold text-2xl">
                            ${formatNumber(totalSpent)}
                        </h2>
                    </div>
                    <ReceiptText className="bg-blue-800 p-3 h-12 w-12 rounded-full text-white" />
                </div>

                {/* No. of Budget */}

                <div className="p-7 border rounded-2xl flex items-center justify-between">
                    <div>
                        <h2 className="text-sm">No. of Budget</h2>
                        <h2 className="font-bold text-2xl">
                            {budgetList?.length}
                        </h2>
                    </div>
                    <Wallet className="bg-blue-800 p-3 h-12 w-12 rounded-full text-white" />
                </div>
            </div>
        </div>
    );
};

export default CardInfo;
