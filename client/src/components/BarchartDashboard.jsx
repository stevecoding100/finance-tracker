import React, { useState } from "react";
import {
    Bar,
    BarChart,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

const BarchartDashboard = ({ transactions }) => {
    // Calculate totalSpend and amount for each category
    const groupedData = transactions.reduce((acc, item) => {
        const category = item.category;
        const type = item.type;
        const amount = parseFloat(item.amount);

        if (!acc[category]) {
            acc[category] = { name: category, totalSpend: 0, income: 0 };
        }

        if (type === "expense") {
            acc[category].totalSpend += amount;
        } else if (type === "income") {
            acc[category].income += amount;
        }

        return acc;
    }, {});

    const sortedData = Object.values(groupedData)
        .sort((a, b) => {
            return b.totalSpend - a.totalSpend;
        })
        .slice(0, 2) // Get top 2 categories by totalSpend
        .concat(
            Object.values(groupedData)
                .sort((a, b) => {
                    return b.income - a.income;
                })
                .slice(0, 2)
        ); // Get top 2 categories by amount

    return (
        <div className="border rounded-2xl p-5 w-auto">
            <h2 className="font-bold text-lg">Activity</h2>
            <ResponsiveContainer width={"80%"} height={300}>
                <BarChart
                    data={sortedData}
                    margin={{
                        top: 7,
                    }}
                >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="totalSpend" stackId="a" fill="#4845d2" />
                    <Bar dataKey="income" stackId="a" fill="#89d245" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default BarchartDashboard;
