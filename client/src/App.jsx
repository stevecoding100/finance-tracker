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
import DasboardHome from "./pages/DasboardHome";
import BudgetDetail from "./components/budget/BudgetDetail";
import IncomeDetail from "./components/Incomes/IncomeDetail";

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
                        <Route path="home" element={<DasboardHome />} />
                        <Route path="budgets" element={<Budgets />} />
                        <Route path="budgets/:id" element={<BudgetDetail />} />
                        <Route path="incomes" element={<Incomes />} />
                        <Route path="incomes/:id" element={<IncomeDetail />} />
                        <Route path="expenses" element={<Expenses />} />
                        <Route path="settings" element={<Settings />} />
                    </Route>
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
