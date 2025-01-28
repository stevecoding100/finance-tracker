import React from "react";
import {
    LayoutGrid,
    PiggyBank,
    Settings,
    CircleDollarSign,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

const SideNav = () => {
    const location = useLocation();
    const menuList = [
        {
            id: 1,
            name: "Dashboard",
            icon: LayoutGrid,
            path: "/dashboard/home",
        },
        {
            id: 2,
            name: "Incomes",
            icon: CircleDollarSign,
            path: "/dashboard/incomes",
        },
        {
            id: 3,
            name: "Budgets",
            icon: PiggyBank,
            path: "/dashboard/budgets",
        },
        {
            id: 4,
            name: "Expenses",
            icon: LayoutGrid,
            path: "/dashboard/expenses",
        },
        {
            id: 5,
            name: "Settings",
            icon: Settings,
            path: "/dashboard/settings",
        },
    ];

    return (
        <div className="h-screen p-5 border shadow-sm w-[300px]">
            <div className="mt-5">
                {menuList.map((menu) => (
                    <Link to={menu.path} key={menu.id}>
                        <h2
                            className={`flex gap-2 items-center font-medium mb-2 p-4 cursor-pointer rounded-full hover:text-primary hover:bg-blue-100 hover:text-blue-800 ${
                                location.pathname == menu.path
                                    ? "text-blue-800 bg-blue-100"
                                    : "text-gray-500"
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
