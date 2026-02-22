import React , { useState } from "react";
import StatCard from "../components/StatCard";
import TotalUsersChart from "../components/TotalUsersChart";
import NewRegistrationsChart from "../components/NewRegistrationsChart";
import ActiveInactiveChart from "../components/ActiveInactiveChart";
import DailyActiveChart from "../components/DailyActiveChart";
import { LuUsers } from "react-icons/lu";
import { FiUserCheck, FiActivity } from "react-icons/fi";
import { IoMdTrendingUp } from "react-icons/io";
import { analyticsData } from "../data/analyticsData";

const Analytics = () => {
  const statCards = [
    {
      title: "Total Users",
      value: analyticsData.summary.totalUsers,
      change: "+5.4%",
      icon: <LuUsers />,
      bgColor: "bg-blue-500",
    },
    {
      title: "Active Users",
      value: analyticsData.summary.activeUsers,
      change: "+3.2%",
      icon: <FiUserCheck />,
      bgColor: "bg-green-600",
    },
    {
      title: "New Registrations",
      value: analyticsData.summary.newUsers,
      change: "+8.9%",
      icon: <IoMdTrendingUp />,
      bgColor: "bg-purple-600",
    },
    {
      title: "Daily Active Avg",
      value: analyticsData.summary.dailyActiveUsers,
      change: "+2.1%",
      icon: <FiActivity />,
      bgColor: "bg-orange-500",
    },
  ];

  const [timePeriod, setTimePeriod] = useState("12months");
  let filteredMonthlyData = analyticsData.monthlyStats;

  if (timePeriod === "90days") {
    filteredMonthlyData = analyticsData.monthlyStats.slice(-3);
  }

  if (timePeriod === "30days") {
    filteredMonthlyData = analyticsData.weeklyStats;
  }


  return (
    <div className="main">
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Analytics</h1>
          <button className="px-4 py-2 bg-gradient-to-r font-bold from-blue-600 to-pink-500 text-white rounded-md shadow">
            Download Report
          </button>
        </div>

        {/* Date Filter */}
        <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
          <label className="font-medium">Time Period</label>
          <select
          className="ml-4 px-3 py-2 border rounded-md"
          value={timePeriod}
          onChange={(e) => setTimePeriod(e.target.value)}
        >
          <option value="30days">Last 30 Days</option>
          <option value="90days">Last 90 Days</option>
          <option value="12months">Last 12 Months</option>
        </select>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {statCards.map((card, idx) => (
            <StatCard key={idx} {...card} />
          ))}
          
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <TotalUsersChart data={filteredMonthlyData} />
          <NewRegistrationsChart data={filteredMonthlyData} />
          <ActiveInactiveChart />
          <DailyActiveChart data={filteredMonthlyData} timePeriod={timePeriod}/>
        </div>

        {/* Stats Table */}
        <div className="bg-white p-6 mt-8 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4">Detailed Statistics</h2>
          <table className="w-full text-center text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">
                  {timePeriod === "30days" ? "Day" : "Month"}
                </th>
                <th className="p-2 text-left">Total Users</th>
                <th className="p-2 text-left">New Registrations</th>
                <th className="p-2 text-left">Active</th>
                <th className="p-2 text-left">Inactive</th>
                <th className="p-2 text-left">Banned</th>
                <th className="p-2 text-left">Daily Active Users</th>
              </tr>
            </thead>

            <tbody>
              {filteredMonthlyData.map((row, i) => (
                <tr key={i} className="border-b hover:bg-gray-50 transition">
                  <td className="p-2">
                    {timePeriod === "30days" ? row.day : row.month}
                  </td>
                  <td className="p-2">{row.total}</td>
                  <td className="p-2">{row.new}</td>
                  <td className="p-2">{row.active}</td>
                  <td className="p-2">{row.inactive}</td>
                  <td className="p-2">{row.banned}</td>
                  <td className="p-2">{row.dau}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;