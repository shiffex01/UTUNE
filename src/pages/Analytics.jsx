import React , { useState, useEffect } from "react";
import StatCard from "../components/StatCard";
import TotalUsersChart from "../components/TotalUsersChart";
import NewRegistrationsChart from "../components/NewRegistrationsChart";
import ActiveInactiveChart from "../components/ActiveInactiveChart";
import DailyActiveChart from "../components/DailyActiveChart";
import { LuUsers } from "react-icons/lu";
import { FiUserCheck, FiActivity } from "react-icons/fi";
import { IoMdTrendingUp } from "react-icons/io";
import { analyticsData as fallbackData } from "../data/analyticsData";
import { getAdminStats, getAllUsers, getTimeSeries } from "../services/api";
import * as XLSX from "xlsx";



const Analytics = () => {
  const [timePeriod, setTimePeriod] = useState("12months");
  const [loading, setLoading]       = useState(true);
  const [apiError, setApiError]     = useState("");

  // Real summary from /api/admin/stats
  const [summary, setSummary] = useState(null);

  // Active / Inactive counts derived from real user list
  const [activeUsers, setActiveUsers]     = useState(0);
  const [inactiveUsers, setInactiveUsers] = useState(0);

  // Time-series chart data from /api/admin/analytics/time-series
  const [chartSeries, setChartSeries] = useState([]);

  // Map UI timePeriod → API range param
  const rangeMap = { "12months": "12months", "90days": "30days", "30days": "30days", "7days": "7days" };

  // Fetch summary + users once on mount
  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const [statsRes, usersRes] = await Promise.all([
          getAdminStats(),
          getAllUsers(),
        ]);

        const s = statsRes.data;
        setSummary({
          totalUsers:      s.totalUsers             ?? 0,
          activeRingtones: s.activeRingtones         ?? 0,
          pendingTunes:    s.totalSongs?.pending      ?? 0,
          approvedTunes:   s.totalSongs?.approved     ?? 0,
          rejectedTunes:   s.totalSongs?.rejected     ?? 0,
          totalTunes:      s.totalSongs?.total        ?? 0,
        });

        const users = usersRes.data?.users || [];
        setActiveUsers(users.filter(u => u.status === "active").length);
        setInactiveUsers(users.filter(u => u.status !== "active" && u.status !== "banned").length);
      } catch (err) {
        setApiError("Failed to load analytics data.");
      }
    };
    fetchSummary();
  }, []);

  // Fetch time-series whenever timePeriod changes
  useEffect(() => {
    const fetchTimeSeries = async () => {
      setLoading(true);
      setApiError("");
      try {
        const range = timePeriod === "12months" ? "12months"
                    : timePeriod === "90days"   ? "30days"
                    : "7days";
        const res = await getTimeSeries(range);
        const { labels = [], newUsers = [], newSongs = [] } = res.data;

        // Map API response → shape expected by all chart components:
        // { month, total, new, active, inactive, banned, dau }
        const mapped = labels.map((label, i) => ({
          month:    label,           // x-axis label (e.g. "2025-04" or "2026-02-05")
          day:      label,           // alias for "30days" mode
          total:    newUsers[i] ?? 0,
          new:      newUsers[i] ?? 0,
          active:   newUsers[i] ?? 0,
          inactive: 0,
          banned:   0,
          dau:      newSongs[i] ?? 0, // repurpose dau as newSongs for DailyActiveChart
          newSongs: newSongs[i] ?? 0,
        }));
        setChartSeries(mapped);
      } catch (err) {
        // Fall back to mock data if API fails
        const fallback = timePeriod === "12months" ? fallbackData.monthlyStats
                       : timePeriod === "90days"   ? fallbackData.monthlyStats.slice(-3)
                       : fallbackData.weeklyStats;
        setChartSeries(fallback);
      } finally {
        setLoading(false);
      }
    };
    fetchTimeSeries();
  }, [timePeriod]);

  const statCards = summary
    ? [
        { title: "Total Users",      value: summary.totalUsers,      change: "", icon: <LuUsers />,       bgColor: "bg-blue-500"   },
        { title: "Active Ringtones", value: summary.activeRingtones, change: "", icon: <FiUserCheck />,   bgColor: "bg-green-600"  },
        { title: "Pending Tunes",    value: summary.pendingTunes,    change: "", icon: <IoMdTrendingUp />, bgColor: "bg-purple-600" },
        { title: "Total Tunes",      value: summary.totalTunes,      change: "", icon: <FiActivity />,    bgColor: "bg-orange-500" },
      ]
    : [];

  const downloadExcel = () => {
    if (!summary) return;

    const summaryRows = [
      { Metric: "Total Users",      Value: summary.totalUsers      },
      { Metric: "Active Ringtones", Value: summary.activeRingtones },
      { Metric: "Pending Tunes",    Value: summary.pendingTunes    },
      { Metric: "Approved Tunes",   Value: summary.approvedTunes   },
      { Metric: "Rejected Tunes",   Value: summary.rejectedTunes   },
    ];

    const tableRows = chartSeries.map((row) => ({
      Period:           row.month,
      NewUsers:         row.new      ?? "—",
      NewSongs:         row.newSongs ?? "—",
      Active:           row.active   ?? "—",
      Inactive:         row.inactive ?? "—",
      Banned:           row.banned   ?? "—",
    }));

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(summaryRows), "Summary");
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(tableRows),   "Time Series");
    XLSX.writeFile(workbook, "analytics_report.xlsx");
  };


  return (
    <div className="main">
      <div className="flex-1">
        <div className="flex md:justify-between justify-end items-center mb-6">
          <button 
          onClick={downloadExcel}
          disabled={!summary}
          className="px-4 py-2 bg-gradient-to-r font-bold from-blue-600 to-pink-500 text-white rounded-md shadow disabled:opacity-50">
            Download Report
          </button>
        </div>

        {loading && <p className="text-center text-gray-500 py-10">Loading analytics…</p>}
        {apiError && <p className="text-center text-red-500 py-10">{apiError}</p>}

        {!loading && !apiError && (
          <>
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
          <TotalUsersChart data={chartSeries} />
          <NewRegistrationsChart data={chartSeries} />
          <ActiveInactiveChart activeUsers={activeUsers} inactiveUsers={inactiveUsers} />
          <DailyActiveChart data={chartSeries} timePeriod={timePeriod}/>
        </div>

        {/* Stats Table */}
        <div className="bg-white p-6 mt-8 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4">Detailed Statistics</h2>
          <div className="overflow-x-auto">
          <table className="w-full text-center text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">Period</th>
                <th className="p-2 text-left">New Users</th>
                <th className="p-2 text-left">New Songs</th>
              </tr>
            </thead>
            <tbody>
              {chartSeries.map((row, i) => (
                <tr key={i} className="border-b hover:bg-gray-50 transition">
                  <td className="p-2">{row.month}</td>
                  <td className="p-2">{row.new      ?? "—"}</td>
                  <td className="p-2">{row.newSongs ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Analytics;