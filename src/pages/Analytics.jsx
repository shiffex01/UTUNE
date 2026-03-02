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
import * as XLSX from "xlsx";



const Analytics = () => {
      const downloadExcel = () => {
      // Summary section
      const summary = [
        { Metric: "Total Users", Value: analyticsData.summary.totalUsers },
        { Metric: "Active Users", Value: analyticsData.summary.activeUsers },
        { Metric: "New Registration", Value: analyticsData.summary.newUsers },
        { Metric: "Daily Active Avg", Value: analyticsData.summary.dailyActiveUsers },
      ];

      // Table section
      const tableRows = filteredMonthlyData.map((row) => ({
        Period: timePeriod === "30days" ? row.day : row.month,
        TotalUsers: row.total,
        NewRegistrations: row.new,
        Active: row.active,
        Inactive: row.inactive,
        Banned: row.banned,
        DailyActiveUsers: row.dau,
      }));

      // Create workbook
      const workbook = XLSX.utils.book_new();

      // Summary sheet
      const summarySheet = XLSX.utils.json_to_sheet(summary);
      XLSX.utils.book_append_sheet(workbook, summarySheet, "Summary");

      // Table Sheet
      const tableSheet = XLSX.utils.json_to_sheet(tableRows);
      XLSX.utils.book_append_sheet(workbook, tableSheet, "Detailed Stats");

      // Export file
      XLSX.writeFile(workbook, "analytics_report.xlsx");
    };

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
      <div className="flex-1">
        <div className="flex md:justify-between justify-end items-center mb-6">
          <button 
          onClick={downloadExcel}
          className="px-4 py-2 bg-gradient-to-r font-bold from-blue-600 to-pink-500 text-white rounded-md shadow">
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