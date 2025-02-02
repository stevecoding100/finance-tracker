import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTransactionApi } from "../../services/api";

const ExpenseDetail = () => {
    const { id } = useParams();
    const { getTransactionById, updateTransactionById, deleteTransactionById } =
        useTransactionApi();
    const [income, setIncome] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({
        amount: "",
        category: "",
        description: "",
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchIncomes = async () => {
            try {
                const response = await getTransactionById(id);
                const transaction = response.data.transaction;
                setIncome(transaction);
                setFormData({
                    amount: transaction.amount,
                    type: "income",
                    category: transaction.category,
                    description: transaction.description,
                });
                console.log(formData);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching budget:", error);
            }
        };

        fetchIncomes();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await updateTransactionById(id, formData);
            navigate("/dashboard/expenses");
        } catch (error) {
            console.error("Error updating budget:", error);
        }
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this budget?")) {
            try {
                await deleteTransactionById(id);
                navigate("/dashboard/expenses");
            } catch (error) {
                console.error("Error deleting budget:", error);
            }
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1 className="text-2xl font-bold p-10">Update Income</h1>
            <form onSubmit={handleUpdate}>
                <div className="mt-2">
                    <h2 className="text-black font-medium my-1">Amount</h2>
                    <Input
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mt-2">
                    <h2 className="text-black font-medium my-1">Categoty</h2>
                    <Input
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mt-2">
                    <h2 className="text-black font-medium my-1">Description</h2>
                    <textarea
                        className="w-[80%] h-[150px]"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>
                <div className="mt-4">
                    <Button type="submit">Update Budget</Button>
                    <Button
                        type="button"
                        onClick={handleDelete}
                        className="ml-4 bg-red-800 text-white"
                    >
                        Delete
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default ExpenseDetail;
