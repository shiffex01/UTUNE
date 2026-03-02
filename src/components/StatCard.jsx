import React from "react";

const StatCard = ({ title, value, change, icon, bgColor }) => {
  return (
    <div className="bg-white shadow-md rounded-xl items-start md:items-center p-5 w-full">

      <div
        className={`${bgColor} p-3 rounded-2xl w-16 flex items-center justify-center text-white text-2xl`}
      >
        {icon}
      </div>

      <h4 className="text-gray-500 text-sm mt-4">{title}</h4>

      <div className="flex justify-between items-center mt-3">
        <h2 className="text-2xl font-bold">{value}</h2>
        <span className="text-green-500 text-sm">{change}</span>
      </div>

    </div>
  );
};

export default StatCard;