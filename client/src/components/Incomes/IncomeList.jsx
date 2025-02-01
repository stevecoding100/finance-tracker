import React, { useEffect, useState } from "react";
import { useTransactionApi } from "../../services/api";
import IncomeItem from "./IncomeItem";
import CreateIncome from "./CreateIncome";

const IncomeList = () => {
    const [transactionList, setTransactionList] = useState([]);
    const { createTransaction, getAllTransactions, deleteTransactionById } =
        useTransactionApi();

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await getAllTransactions();
                console.log(response.data.transactions);
                setTransactionList(response.data.transactions);
            } catch (error) {
                console.error("Error fetching goals:", error);
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
                <CreateIncome
                    setTransactionList={setTransactionList}
                    getAllTransactions={getAllTransactions}
                    createTransaction={createTransaction}
                />
                {transactionList?.length > 0
                    ? transactionList.map((transactions, index) => (
                          <IncomeItem transactions={transactions} key={index} />
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
export default IncomeList;
