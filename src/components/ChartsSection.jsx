import React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ChartsSection = ({ analytics }) => {
  return (
    <div className="grid md:grid-cols-2 gap-6 mt-8">
      <div className="bg-white p-5 rounded-xl shadow-md">
        <h3 className="mb-4 font-semibold">Analysis Graph</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={analytics}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="users" stroke="#7c3aed" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-5 rounded-xl shadow-md">
        <h3 className="mb-4 font-semibold">Daily Active Users</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={analytics}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="active" fill="#ec4899" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartsSection;