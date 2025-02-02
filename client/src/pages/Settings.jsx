import React from "react";
import { UserRoundPen, Bell, Mail, SunMoon, Accessibility } from "lucide-react";

const Settings = () => {
    return (
        <div className="w-full p-6 bg-white shadow-md rounded-md mt-10">
            <h2 className="text-2xl font-semibold mb-6">Settings</h2>
            <ul className="space-y-4">
                <li>
                    <a
                        href="#"
                        className="flex items-center p-3 bg-gray-100 rounded-md hover:bg-gray-200"
                    >
                        <span className="mr-3">
                            <UserRoundPen />
                        </span>
                        Manage Profile
                    </a>
                </li>
                <li>
                    <a
                        href="#"
                        className="flex items-center p-3 bg-gray-100 rounded-md hover:bg-gray-200"
                    >
                        <span className="material-icons mr-3">
                            <Bell />
                        </span>
                        Notifications
                    </a>
                </li>
                <li>
                    <a
                        href="#"
                        className="flex items-center p-3 bg-gray-100 rounded-md hover:bg-gray-200"
                    >
                        <span className="material-icons mr-3">
                            <Mail />
                        </span>
                        Contact us
                    </a>
                </li>
                <li>
                    <a
                        href="#"
                        className="flex items-center p-3 bg-gray-100 rounded-md hover:bg-gray-200"
                    >
                        <span className="material-icons mr-3">
                            <SunMoon />
                        </span>
                        palette
                    </a>
                </li>
                <li>
                    <a
                        href="#"
                        className="flex items-center p-3 bg-gray-100 rounded-md hover:bg-gray-200"
                    >
                        <span className="material-icons mr-3">
                            <Accessibility />
                        </span>
                        Accessibility
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default Settings;
