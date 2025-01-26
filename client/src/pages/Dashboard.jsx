import React from "react";
import { Link, Outlet } from "react-router-dom";
import SideNav from "../components/SideNav";

const Dashboard = () => {
    // const checkUserBudgets = async () => {
    //     const result = await
    // };
    return (
        <div className="flex">
            <SideNav />
            <div className="flex-1 p-5">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
