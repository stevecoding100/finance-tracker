import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
});

export const registerUser = (data) => api.post("/auth/user/register", data);
export const loginUser = (data) => api.post("/auth/user/login", data);
export const getProfile = (token) =>
    api.get("/auth/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
    });
