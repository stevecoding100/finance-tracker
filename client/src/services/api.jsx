import axios from "axios";
import { useAuth } from "../auth/authContext";

const api = axios.create({
    baseURL: "http://localhost:3000",
});

// User routes
export const useUserApi = () => {
    const { user } = useAuth();
    const userId = user?.user?.id;
    const token = user?.token;

    const registerUser = (data) => api.post("/auth/user/register", data);
    const loginUser = (data) => api.post("/auth/user/login", data);
    const updateUserProfile = (data) =>
        api.put(`/auth/user/updateuser/${userId}`, data);
    const getProfile = () =>
        api.get("/auth/user/profile", {
            headers: { Authorization: `Bearer ${token}` },
            userId,
        });

    return { registerUser, loginUser, updateUserProfile, getProfile };
};

// Goal/Budget Routes
export const useGoalApi = () => {
    const { user } = useAuth();
    const userId = user?.user?.id;

    const createGoal = (data) => api.post("/goal/create", data);
    const getAllGoals = () => api.get(`/goal/allgoals/${userId}`);
    const getGoalById = (goalId) => api.get(`/goal/${goalId}`);
    const updateGoal = (goalId, data) =>
        api.put(`/goal/update/${goalId}`, data);
    const deleteGoal = (goalId) => api.delete(`/goal/delete/${goalId}`);

    return { createGoal, getAllGoals, getGoalById, updateGoal, deleteGoal };
};

// Transactions / Incomes / Expenses Routes
export const useTransactionApi = () => {
    const { user } = useAuth();
    const userId = user?.user?.id;

    const createTransaction = (data) => api.post("/transaction/create", data);
    const getAllTransactions = () => api.get(`/transaction/all/${userId}`);
    const getTransactionById = (transactionId) =>
        api.get(`/transaction/${transactionId}`);
    const updateTransactionById = (transactionId, data) =>
        api.put(`/transaction/update/${transactionId}`, data);
    const deleteTransactionById = (transactionId) =>
        api.delete(`/transaction/delete/${transactionId}`);

    return {
        createTransaction,
        getAllTransactions,
        getTransactionById,
        updateTransactionById,
        deleteTransactionById,
    };
};
