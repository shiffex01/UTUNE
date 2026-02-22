import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { analyticsData } from "../data/analyticsData";

const COLORS = ["#22c55e", "#ef4444"];

const ActiveInactiveChart = () => {
  const pieData = [
    {
      name: "Active Users",
      value: analyticsData.summary.activeUsers,
    },
    {
      name: "Inactive Users",
      value: analyticsData.summary.inactiveUsers,
    },
  ];

  return (
    <div className="chart_bg">
      <h3 className="font-semibold mb-4">Active & Inactive Users</h3>

      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ActiveInactiveChart;