import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserApi } from "../../services/api";

function CreateExpense({
    createTransaction,
    getAllTransactions,
    setExpenseList,
}) {
    const { getProfile } = useUserApi();

    const [userId, setUserId] = useState();
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getProfile();
                setUserId(response.data.user.id);
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };
        fetchProfile();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newExpense = {
            userId,
            amount: parseFloat(amount),
            category,
            type: "expense",
            description,
        };

        try {
            const response = await createTransaction(newExpense);
            if (response.status === 201) {
                const updatedIncome = await getAllTransactions();
                setExpenseList(updatedIncome.data.transactions);
                setAmount("");
                setCategory("");
                setDescription("");
                setIsModalOpen(false);
            } else {
                console.error("Failed to create transaction:", response);
            }
        } catch (error) {
            console.error("Error creating transaction:", error);
        }
    };

    const incomeCategories = [
        "Housing",
        "Utilities",
        "Transportation",
        "Alcohol",
        "Food and Groceries",
        "Insurance",
        "Healthcare",
        "Debt Payments",
        "Entertainment",
        "Clothing and Personal Care",
        "Savings and Investments",
    ];

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const openModal = () => setIsModalOpen(true);

    return (
        <>
            <div
                className="bg-slate-100 p-10 rounded-2xl
            items-center flex flex-col border-2 border-dashed
            cursor-pointer hover:shadow-md"
                onClick={openModal}
            >
                <h2 className="text-3xl">+</h2>
                <h2>Create New Expense</h2>
            </div>
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Expense</DialogTitle>
                        <DialogDescription>
                            <form onSubmit={handleSubmit} className="mt-5">
                                <div className="mt-2">
                                    <h2 className="text-black font-medium my-1">
                                        Amount
                                    </h2>
                                    <Input
                                        type="number"
                                        placeholder="e.g. $400"
                                        value={amount}
                                        onChange={(e) =>
                                            setAmount(e.target.value)
                                        }
                                        required
                                    />
                                </div>
                                <div className="mt-2">
                                    <h2 className="text-black font-medium my-1">
                                        Category
                                    </h2>
                                    <select
                                        value={category}
                                        onChange={handleCategoryChange}
                                        required
                                        className="w-full p-2 border rounded"
                                    >
                                        <option value="" disabled>
                                            Select a category
                                        </option>
                                        {incomeCategories.map((cat) => (
                                            <option key={cat} value={cat}>
                                                {cat}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mt-2">
                                    <h2 className="text-black font-medium my-1">
                                        Description
                                    </h2>
                                    <textarea
                                        placeholder="e.g Wen't to Chipotle"
                                        value={description}
                                        onChange={(e) =>
                                            setDescription(e.target.value)
                                        }
                                        className="w-[80%] h-[100px]"
                                        maxLength={30}
                                    />
                                    <p>{description.length}/30 characters</p>
                                </div>
                                <DialogFooter className="sm:justify-start">
                                    <Button
                                        type="submit"
                                        className="mt-5 w-full rounded-full"
                                    >
                                        Create Income
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default CreateExpense;
