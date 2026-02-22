import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { analyticsData } from "../data/analyticsData";


const NewRegistrationChart = ({ data }) => {
  return (
    <div className="chart_bg">
        <h3 className="font-semibold mb-4">New Registrations</h3>
        <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
                <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill="#10b981" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    </div>
  );
};

export default NewRegistrationChart;