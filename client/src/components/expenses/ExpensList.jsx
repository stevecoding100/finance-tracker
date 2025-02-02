import React, { useEffect, useState } from "react";
import { useTransactionApi } from "../../services/api";
import CreateExpense from "./CreateExpense";
import ExpenseItem from "./ExpensesItem";

const ExpenseList = () => {
    const [ExpenseList, setExpenseList] = useState([]);
    const { createTransaction, getAllTransactions, deleteTransactionById } =
        useTransactionApi();

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await getAllTransactions();
                console.log(response.data.transactions);
                setExpenseList(response.data.transactions);
            } catch (error) {
                console.error("Error fetching transaction:", error);
            }
        };
        fetchTransactions();
    }, []);

    return (
        <div className="mt-7">
            <div
                className="grid grid-cols-1
    md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
                <CreateExpense
                    setExpenseList={setExpenseList}
                    getAllTransactions={getAllTransactions}
                    createTransaction={createTransaction}
                />
                {ExpenseList?.length > 0
                    ? ExpenseList.map((transactions, index) => (
                          <ExpenseItem
                              transactions={transactions}
                              key={index}
                          />
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
export default ExpenseList;
