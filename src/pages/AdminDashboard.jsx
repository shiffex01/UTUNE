import React from "react";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import ChartsSection from "../components/ChartsSection";
import RecentActivity from "../components/RecentActivity";
import { IoMdTrendingUp } from "react-icons/io";
import { LuUsers } from "react-icons/lu";
import { FiActivity } from "react-icons/fi";

import {
  dashboardStats,
  analyticsData,
  recentActivities,
} from "../data/dashboardMock";

const AdminDashboard = () => {
    const mockData = [
    {
        title: "Total Users",
        value: dashboardStats.totalUsers,
        change: "+6.6%",
        icon: <LuUsers />,
        bgColor: "bg-blue-500"
    },
    {
        title: "Active Users",
        value: dashboardStats.activeUsers,
        change: "+4.4%",
        icon: <FiActivity />,
        bgColor: "bg-orange-600"
    },
    {
        title: "Analytics",
        value: dashboardStats.ctr,
        change: "+1.8%",
        icon: <IoMdTrendingUp />,
        bgColor: "bg-blue-600"
    },
    ];
    
  return (
    <div className="main">
      <div className="flex-1">
        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {mockData.map((card, index) => (
            <StatCard
              key={index}
              title={card.title}
              value={card.value}
              change={card.change}
              icon={card.icon}
              bgColor={card.bgColor}
            />
          ))}
        </div>

        {/* Charts */}
        <div className="mt-8">
          <ChartsSection analytics={analyticsData} />
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <RecentActivity activities={recentActivities} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;