import React from "react";

const ExpenseListTable = ({ transactions, handleDelete }) => {
    const filteredExpenses = transactions.filter(
        (transaction) => transaction.type === "expense"
    );

    return (
        <div className="mt-6]">
            <h2 className="font-bold text-lg">Latest Expenses</h2>
            <div className="grid grid-cols-4 w-[550px] rounded-tl-xl rounded-tr-xl bg-slate-200 p-2 mt-3">
                <h2 className="font-bold">Name</h2>
                <h2 className="font-bold">Amount</h2>
                <h2 className="font-bold">Date</h2>
                <h2 className="font-bold">Action</h2>
            </div>
            {filteredExpenses.map((expense, index) => (
                <div
                    className="grid grid-cols-4 w-[550px] bg-slate-50 rounded-bl-xl rounded-br-xl p-2"
                    key={index}
                >
                    <h2 className="text-slate-800 font-semibold">
                        {expense.category}
                    </h2>
                    <h2>${expense.amount}</h2>
                    <h2>
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
                        className="text-red-500 cursor-pointer"
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
