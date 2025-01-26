import { useAuth } from "../auth/authContext";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import logo from "../assets/spendsmart-logo.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
                    <div className="flex justify-between items-center">
                        {/* <span className="mr-4">Welcome, {user.user.name}</span> */}
                        <Avatar>
                            <AvatarImage
                                src="https://github.com/shadcn.png"
                                alt="@shadcn"
                            />
                            <AvatarFallback>SD</AvatarFallback>
                        </Avatar>
                        <Button
                            onClick={handleLogout}
                            className="ml-4 bg-purple-800"
                        >
                            Logout
                        </Button>
                    </div>
                ) : (
                    <div className="flex gap-3 items-center">
                        <Link to="/register">
                            <Button variant="outline" className="rounded-full">
                                Sign Up
                            </Button>
                        </Link>
                        <Link to="/login">
                            <Button className="rounded-full  bg-blue-800">
                                Login
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;
