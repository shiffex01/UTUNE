import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import ChartsSection from "../components/ChartsSection";
import RecentActivity from "../components/RecentActivity";
import { IoMdTrendingUp } from "react-icons/io";
import { LuUsers } from "react-icons/lu";
import { FiActivity } from "react-icons/fi";
import { MdLibraryMusic } from "react-icons/md";
import { getAdminStats, getAllUsers, getAllTunes } from "../services/api";

const AdminDashboard = () => {
  const [stats, setStats]           = useState(null);
  const [chartData, setChartData]   = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState("");

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [statsRes, usersRes, tunesRes] = await Promise.all([
          getAdminStats(),
          getAllUsers(),
          getAllTunes(),
        ]);

        setStats(statsRes.data);

        // Build chart series — one bar per status bucket from tunes
        const tunes = tunesRes.data?.songs || [];
        const pending  = tunes.filter(t => t.status === "pending").length;
        const approved = tunes.filter(t => t.status === "approved").length;
        const rejected = tunes.filter(t => t.status === "rejected").length;
        setChartData([
          { month: "Pending",  users: pending,  active: pending  },
          { month: "Approved", users: approved, active: approved },
          { month: "Rejected", users: rejected, active: rejected },
        ]);

        // Build recent activity feed from newest users + tunes
        const users = usersRes.data?.users || [];
        const userActivity = users.slice(0, 5).map(u => ({
          name: `User ${u.email} joined`,
          time: u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "—",
        }));
        const tuneActivity = tunes.slice(0, 5).map(t => ({
          name: `"${t.title}" uploaded (${t.status})`,
          time: t.createdAt ? new Date(t.createdAt).toLocaleDateString() : "—",
        }));
        // Interleave and take latest 8
        const combined = [...userActivity, ...tuneActivity]
          .sort((a, b) => (b.time > a.time ? 1 : -1))
          .slice(0, 8);
        setActivities(combined);
      } catch (err) {
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const statCards = stats
    ? [
        { title: "Total Users",      value: stats.totalUsers,             change: "", icon: <LuUsers />,        bgColor: "bg-blue-500"   },
        { title: "Active Ringtones", value: stats.activeRingtones,        change: "", icon: <FiActivity />,     bgColor: "bg-orange-600" },
        { title: "Pending Tunes",    value: stats.totalSongs?.pending ?? "—", change: "", icon: <MdLibraryMusic />, bgColor: "bg-blue-600"   },
        { title: "Approved Tunes",   value: stats.totalSongs?.approved ?? "—", change: "", icon: <IoMdTrendingUp />, bgColor: "bg-green-600"  },
      ]
    : [];
    
  return (
    <div className="main">
      <div className="flex-1">

        {loading && <p className="text-center text-gray-500 py-10">Loading stats…</p>}
        {error && <p className="text-center text-red-500 py-10">{error}</p>}

        {/* Stat Cards */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {statCards.map((card, index) => (
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
        )}

        {/* Charts */}
        <div className="mt-8">
          <ChartsSection analytics={chartData} />
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <RecentActivity activities={activities} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;