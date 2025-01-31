import React, { useState } from "react";
import {
    LayoutGrid,
    PiggyBank,
    Settings,
    CircleDollarSign,
    Menu,
    X,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

const SideNav = () => {
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div className="relative h-screen">
            {/* Mobile Menu Button */}
            <button
                onClick={toggleMobileMenu}
                className="fixed bottom-5 left-4 z-10 bg-blue-700 text-white rounded-full p-2 shadow-md sm:hidden"
            >
                {isMobileMenuOpen ? (
                    <X className="h-5 w-5" />
                ) : (
                    <Menu className="h-5 w-5" />
                )}
            </button>

            {/* Overlay */}
            {isMobileMenuOpen && (
                <div
                    onClick={toggleMobileMenu}
                    className="fixed top-0 left-0 w-full h-full bg-black/50 z-10 sm:hidden"
                ></div>
            )}

            <div
                className={`transition-all duration-300 bg-white  z-20 ${
                    // Common styles
                    isMobileMenuOpen
                        ? "fixed top-0 left-0 h-screen p-5 border shadow-sm w-full translate-x-0"
                        : "hidden" // Mobile styles: hidden by default, fixed and shown when open
                } md:block md:static md:p-5 md:border md:shadow-sm md:w-[300px] md:translate-x-0 md:h-full`} // Desktop styles: visible, takes up space
            >
                <div className="mt-5">
                    {menuList.map((menu) => (
                        <Link
                            to={menu.path}
                            key={menu.id}
                            onClick={() =>
                                isMobileMenuOpen && toggleMobileMenu()
                            }
                        >
                            <h2
                                className={`flex gap-2 items-center font-medium mb-2 p-4 cursor-pointer rounded-full hover:text-primary hover:bg-blue-100 hover:text-blue-800 transition-colors duration-200 ${
                                    location.pathname === menu.path
                                        ? "text-blue-800 bg-blue-100 font-bold"
                                        : "text-gray-500"
                                }`}
                            >
                                <menu.icon className="h-5 w-5" />
                                <span>{menu.name}</span>
                            </h2>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SideNav;
