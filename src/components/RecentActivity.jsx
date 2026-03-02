import React from "react";
import { analyticsData } from "../data/analyticsData";

const RecentActivity = ({ activities }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-5 mt-8">
      <h3 className="font-semibold mb-4">Recent Activity</h3>
      <ul className="space-y-3">
        {activities.map((item, index) => (
          <li
            key={index}
            className="flex justify-between border-b pb-2 text-sm"
          >
            <span>{item.name}</span>
            <span className="text-gray-400">{item.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivity;