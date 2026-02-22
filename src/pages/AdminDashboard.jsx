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
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
        <ChartsSection analytics={analyticsData} />

        {/* Recent Activity */}
        <RecentActivity activities={recentActivities} />
      </div>
    </div>
  );
};

export default AdminDashboard;