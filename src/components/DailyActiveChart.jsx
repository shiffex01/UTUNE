import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const DailyActiveChart = ({ data, timePeriod }) => {
  // Transform data to have { day, users } keys for the chart
  const chartData = data.map((item) => ({
    day: timePeriod === "30days" ? item.day : item.month, // use day for weekly, month for monthly
    users: item.dau, // daily active users
  }));

  return (
    <div className="chart_bg">
      <h3 className="font-semibold mb-4">Daily Active Users</h3>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="dailyActiveColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />

          <Area
            type="monotone"
            dataKey="users"
            stroke="#4f46e5"
            strokeWidth={2}
            fill="url(#dailyActiveColor)"
          />
        </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DailyActiveChart;