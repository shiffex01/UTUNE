import React from "react";
import StatCard from "../components/StatCard";
import TotalUsersChart from "../components/TotalUsersChart";
import NewRegistrationsChart from "../components/NewRegistrationsChart";
import ActiveInactiveChart from "../components/ActiveInactiveChart";
import DailyActiveChart from "../components/DailyActiveChart";
import { analyticsStats, monthlyStats } from "../data/AnalyticsMock.js";
import { LuUsers } from "react-icons/lu";
import { FiUserCheck, FiActivity } from "react-icons/fi";
import { IoMdTrendingUp } from "react-icons/io";

const Analytics = () => {
  const statCards = [
    {
      title: "Total Users",
      value: analyticsStats.totalUsers,
      change: "+5.4%",
      icon: <LuUsers />,
      bgColor: "bg-blue-500",
    },
    {
      title: "Active Users",
      value: analyticsStats.activeUsers,
      change: "+3.2%",
      icon: <FiUserCheck />,
      bgColor: "bg-green-600",
    },
    {
      title: "New Registrations",
      value: analyticsStats.newRegistrations,
      change: "+8.9%",
      icon: <IoMdTrendingUp />,
      bgColor: "bg-purple-600",
    },
    {
      title: "Daily Active Avg",
      value: analyticsStats.dailyActive,
      change: "+2.1%",
      icon: <FiActivity />,
      bgColor: "bg-orange-500",
    },
  ];

  return (
    <div className="main">
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Analytics</h1>
          <button className="px-4 py-2 bg-red-500 text-white rounded-md shadow">
            Download Report
          </button>
        </div>

        {/* Date Filter */}
        <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
          <label className="font-medium">Time Period</label>
          <select className="ml-4 px-3 py-2 border rounded-md">
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
            <option>Last 12 Months</option>
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
          <TotalUsersChart />
          <NewRegistrationsChart />
          <ActiveInactiveChart />
          <DailyActiveChart />
        </div>

        {/* Stats Table */}
        <div className="bg-white p-6 mt-8 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Detailed Statistics</h2>
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">Month</th>
                <th className="p-2 text-left">Total Users</th>
                <th className="p-2 text-left">New Registrations</th>
                <th className="p-2 text-left">Active</th>
                <th className="p-2 text-left">Inactive</th>
                <th className="p-2 text-left">Banned</th>
                <th className="p-2 text-left">DAU</th>
              </tr>
            </thead>
            <tbody>
              {monthlyStats.map((row, i) => (
                <tr key={i} className="border-b">
                  <td className="p-2">{row.month}</td>
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