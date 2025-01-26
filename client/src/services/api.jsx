import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
});

// User routes
export const registerUser = (data) => api.post("/auth/user/register", data);
export const loginUser = (data) => api.post("/auth/user/login", data);
export const updateUserProfile = (userId) =>
    api.put(`/auth/user/updateuser/${userId}`);
export const getProfile = (token) =>
    api.get("/auth/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
    });

// Goal/Budget Routes
export const createGoal = (data) => api.post("/goal/create", data);
export const getAllGoals = (userId) => api.get(`/goal/allgoals/${userId}`);
export const getGoalById = (goalId) => api.get(`/goal/${goalId}`);
export const updateGoal = (goalId, data) =>
    api.put(`/goal/update/${goalId}`, data);
export const deleteGoal = (goalId) =>
    api.delete(`/goal/delete/${goalId}`, goalId);

// Transactions / Icomes / Expenses  Routes
export const createTransaction = (data) =>
    api.post("/transaction/create", data);

export const getAllTransactions = (userId) =>
    api.get(`/transaction/all/${userId}`);

export const getTransactionById = (transactionId) =>
    api.get(`/transaction/${transactionId}`);

export const updateTransactionById = (transactionId) =>
    api.put(`/transaction/update/${transactionId}`);

export const deleteTransactionById = (transactionId) =>
    api.delete(`/transaction/delete/${transactionId}`);
