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

const TotalUsersChart = ({ data }) => {
  return (
    <div className="chart_bg w-full overflow-hidden">
      <h3 className="font-semibold mb-4 text-center md:text-left">
        Total Users Growth
      </h3>

      {/* Responsive height wrapper */}
      <div className="w-full h-[250px] sm:h-[280px] md:h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="totalUsersColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="month"
              tick={{ fontSize: 12 }}
              interval="preserveStartEnd"
            />

            <YAxis tick={{ fontSize: 12 }} />

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
    </div>
  );
};

export default TotalUsersChart;