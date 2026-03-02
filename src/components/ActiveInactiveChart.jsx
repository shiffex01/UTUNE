import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
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
    <div className="chart_bg w-full overflow-hidden">
      <h3 className="font-semibold mb-4 text-center md:text-left">
        Active & Inactive Users
      </h3>

      {/* Responsive height wrapper */}
      <div className="w-full h-[250px] sm:h-[280px] md:h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              outerRadius="80%"
              labelLine={false}
            >
              {pieData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>

            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ActiveInactiveChart;