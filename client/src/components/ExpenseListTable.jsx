import React from "react";

const ExpenseListTable = ({ transactions, handleDelete }) => {
    const filteredExpenses = transactions.filter(
        (transaction) => transaction.type === "expense"
    );

    return (
        <div className="mt-6]">
            <h2 className="font-bold text-lg">Latest Expenses</h2>
            <div className="grid grid-cols-4 w-auto rounded-tl-xl rounded-tr-xl bg-slate-200 p-2 mt-3">
                <h2 className="font-bold text-sm md:text-lg">Name</h2>
                <h2 className="font-bold text-sm md:text-lg">Amount</h2>
                <h2 className="font-bold text-sm md:text-lg">Date</h2>
                <h2 className="font-bold text-sm md:text-lg">Action</h2>
            </div>
            {filteredExpenses.map((expense, index) => (
                <div
                    className="grid grid-cols-4 w-auto bg-slate-50 rounded-bl-xl rounded-br-xl p-2"
                    key={index}
                >
                    <h2 className="text-slate-800 font-semibold text-xs md:text-lg">
                        {expense.category}
                    </h2>
                    <h2 className="text-xs md:text-lg">${expense.amount}</h2>
                    <h2 className="text-xs md:text-lg">
                        {new Date(expense.created_at).toLocaleDateString(
                            "en-US",
                            {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                            }
                        )}
                    </h2>
                    <button
                        onClick={() => handleDelete(expense.id)}
                        className="text-red-500 cursor-pointer text-xs md:text-lg"
                    >
                        Delete
                    </button>
                    {/* <h2>
          <Trash
            className="text-red-500 cursor-pointer"
            onClick={() => deleteExpense(expenses)}
          />
        </h2> */}
                </div>
            ))}
        </div>
    );
};

export default ExpenseListTable;
