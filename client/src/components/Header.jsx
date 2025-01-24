import { useAuth } from "../auth/authContext";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import logo from "../assets/spendsmart-logo.png";

const Header = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
    };
    return (
        <div className="p-5 flex justify-between items-center border shadow-sm">
            <div
                className="flex flex-row items-center"
                onClick={() => navigate("/")}
            >
                {/* Logo */}
                <img src={logo} alt="logo" width={40} height={25} />
                <span className="text-purple-800 font-bold text-xl ml-2">
                    SpendSmart
                </span>
            </div>

            <div>
                {user ? (
                    <>
                        {/* <span className="mr-4">Welcome, {user.user.name}</span> */}
                        <Button onClick={handleLogout}>Logout</Button>
                    </>
                ) : (
                    <>
                        <Button onClick={() => navigate("/login")}>
                            Login
                        </Button>
                        <Button onClick={() => navigate("/register")}>
                            Sign Up
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Header;
