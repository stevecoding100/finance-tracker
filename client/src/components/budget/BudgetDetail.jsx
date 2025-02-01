import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useGoalApi } from "../../services/api";

const BudgetDetail = () => {
    const { id } = useParams();
    const { getGoalById, updateGoal, deleteGoal } = useGoalApi();
    const [budget, setBudget] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({
        emoji: "",
        title: "",
        saved_amount: "",
        target_amount: "",
        deadline: "",
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchBudget = async () => {
            try {
                const response = await getGoalById(id);
                setBudget(response.data);
                setFormData({
                    title: response.data.title,
                    saved_amount: response.data.saved_amount,
                    target_amount: response.data.target_amount,
                });
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching budget:", error);
            }
        };

        fetchBudget();
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
            await updateGoal(id, formData);
            navigate("/dashboard/budgets");
        } catch (error) {
            console.error("Error updating budget:", error);
        }
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this budget?")) {
            try {
                await deleteGoal(id);
                navigate("/dashboard/budgets");
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
            <h1>Update Budget</h1>
            <form onSubmit={handleUpdate}>
                <div className="mt-2">
                    <h2 className="text-black font-medium my-1">Budget Name</h2>
                    <Input
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mt-2">
                    <h2 className="text-black font-medium my-1">
                        Saved Amount (As of today)
                    </h2>
                    <Input
                        type="number"
                        name="saved_amount"
                        value={formData.saved_amount}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mt-2">
                    <h2 className="text-black font-medium my-1">
                        Budget Target Amount
                    </h2>
                    <Input
                        type="number"
                        name="target_amount"
                        value={formData.target_amount}
                        onChange={handleChange}
                        required
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

export default BudgetDetail;
