import React from "react";
import {
    LayoutGrid,
    PiggyBank,
    Settings,
    CircleDollarSign,
} from "lucide-react";
import logo from "../assets/spendsmart-logo.png";
import { Link, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const SideNav = () => {
    const location = useLocation();
    const menuList = [
        {
            id: 1,
            name: "Dashboard",
            icon: LayoutGrid,
            path: "/dashboard",
        },
        {
            id: 2,
            name: "Incomes",
            icon: CircleDollarSign,
            path: "/incomes",
        },
        {
            id: 3,
            name: "Budgets",
            icon: PiggyBank,
            path: "/budgets",
        },
        {
            id: 4,
            name: "Expenses",
            icon: LayoutGrid,
            path: "/expenses",
        },
        {
            id: 5,
            name: "Settings",
            icon: Settings,
            path: "/settings",
        },
    ];

    return (
        <div className="h-screen p-5 border shadow-sm z-30">
            <div className="mt-5">
                {menuList.map((menu, index) => (
                    <Link to={menu.path} key={index}>
                        <h2
                            className={`flex gap-2 items-center text-gray-500 font-medium mb-2 p-4 cursor-pointer rounded-full hover:text-primary hover:bg-blue-100 ${
                                location.pathname == menu.path &&
                                "text-blue-800 bg-blue-100"
                            }`}
                        >
                            <menu.icon />
                            {menu.name}
                        </h2>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SideNav;
