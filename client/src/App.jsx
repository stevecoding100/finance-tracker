import { AuthProvider } from "./auth/authContext";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./auth/ProtectedRoute";
import Budgets from "./pages/Budgets";
import Incomes from "./pages/Incomes";
import Expenses from "./pages/Expenses";
import Settings from "./pages/Settings";

function App() {
    return (
        <AuthProvider>
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />

                    <Route
                        path="/dashboard/*"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    >
                        <Route path="budgets" element={<Budgets />} />
                        <Route path="incomes" element={<Incomes />} />
                        <Route path="expenses" element={<Expenses />} />
                        <Route path="settings" element={<Settings />} />
                    </Route>
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
