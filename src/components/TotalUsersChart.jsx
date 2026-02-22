import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { analyticsData } from "../data/analyticsData";

const TotalUsersChart = ({ data }) => {
  return (
    <div className="chart_bg">
      <h3 className="font-semibold mb-4">Total Users Growth</h3>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="totalUsersColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>

          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />

          <Area
            type="monotone"
            dataKey="total"
            stroke="#3b82f6"
            strokeWidth={2}
            fill="url(#totalUsersColor)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TotalUsersChart;