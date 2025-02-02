import React, { useState, useEffect } from "react";
import { useUserApi, useGoalApi, useTransactionApi } from "../services/api";

import CardInfo from "../components/CardInfo";
import BudgetItem from "../components/budget/BudgetItem";
import BarchartDashboard from "../components/BarchartDashboard";
import ExpenseListTable from "../components/ExpenseListTable";

const DasboardHome = () => {
    const [userProfile, setUserProfile] = useState([]);
    const [budgetList, setBudgetList] = useState([]);
    const [transactions, setTransactions] = useState([]);

    const { getProfile } = useUserApi();
    const { getAllGoals } = useGoalApi();
    const { getAllTransactions, deleteTransactionById } = useTransactionApi();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getProfile();
                setUserProfile(response.data.user);
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };

        fetchProfile();
    }, []);

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

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await getAllTransactions();
                setTransactions(response.data.transactions);
            } catch (error) {
                console.error("Error fetching transactions:", error);
            }
        };
        fetchTransactions();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await deleteTransactionById(id);

            if (response.status === 200) {
                setTransactions((prevTransactions) =>
                    prevTransactions.filter(
                        (transaction) => transaction.id !== id
                    )
                );
            } else {
                console.error("Failed to delete the transaction.");
            }
        } catch (error) {
            console.error("Error deleting transaction:", error);
        }
    };
    return (
        <div className="p-8">
            <h1 className="font-bold text-4xl">Hi, {userProfile.name}!</h1>
            <p className="text-gray-500">
                Here's what happening with yout money. Let's manage your
                expenses.
            </p>
            <CardInfo budgetList={budgetList} transactions={transactions} />
            <div className="grid grid-cols-1 lg:grid-cols-3 mt-6 gap-5">
                <div className="lg:col-span-2">
                    <BarchartDashboard
                        transactions={transactions}
                        key={transactions.id}
                    />
                    <ExpenseListTable
                        transactions={transactions}
                        handleDelete={handleDelete}
                    />
                </div>

                <div className="grid gap-5 ">
                    <h2 className="font-bold text-xl md:text-2xl">
                        Latest Budgets
                    </h2>
                    {budgetList?.length > 0
                        ? budgetList.map((budget, index) => (
                              <BudgetItem budget={budget} key={index} />
                          ))
                        : [1, 2, 3, 4].map((item, index) => (
                              <div
                                  key={index}
                                  className="h-[180xp] w-full
                 bg-slate-200 rounded-lg animate-pulse"
                              ></div>
                          ))}
                </div>
            </div>
        </div>
    );
};

export default DasboardHome;
