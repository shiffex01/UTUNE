import React, { useState, useEffect } from "react";
import UserCard from "../components/UserCard";
import { IoSearch } from "react-icons/io5";
import { getAllUsers, banUser, unbanUser } from "../services/api";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [activeTab, setActiveTab] = useState("active");
  const [search, setSearch] = useState("");

  // Fetch users from backend on mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getAllUsers();
        // Normalize backend shape to match UserCard expectations
        const normalized = (res.data?.users || []).map((u) => ({
          id: u.id || u._id,
          phone: u.email, // backend returns email; adjust if phone field exists
          status: u.status === "active" ? "active" : u.status === "banned" ? "banned" : "inactive",
          date: u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "—",
          active: u.status,
        }));
        setUsers(normalized);
      } catch (err) {
        setApiError("Failed to load users.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    // Optimistically update UI
    setUsers((prev) =>
      prev.map((user) => (user.id === id ? { ...user, status: newStatus } : user))
    );
    try {
      if (newStatus === "banned") {
        await banUser(id);
      } else {
        await unbanUser(id);
      }
    } catch (err) {
      // Revert on failure
      setUsers((prev) =>
        prev.map((user) =>
          user.id === id
            ? { ...user, status: newStatus === "banned" ? "active" : "banned" }
            : user
        )
      );
      alert("Action failed. Please try again.");
    }
  };

  const filteredUsers = users
    .filter((user) => user.status === activeTab)
    .filter((user) =>
      user.phone.toLowerCase().includes(search.toLowerCase())
    );

  const countByStatus = (status) =>
    users.filter((u) => u.status === status).length;

  return (
    <div className="main">
      <div className="flex-1">

        {loading && (
          <p className="text-center text-gray-500 py-10">Loading users…</p>
        )}
        {apiError && (
          <p className="text-center text-red-500 py-10">{apiError}</p>
        )}

        {!loading && !apiError && (
          <>
            <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
              <div className="flex gap-4 mb-4">
                {["active", "inactive", "banned"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 cursor-pointer py-2 rounded-md md:text-xl text-md capitalize ${
                      activeTab === tab
                        ? tab === "active"
                          ? "bg-green-500 text-white"
                          : tab === "inactive"
                          ? "bg-yellow-500 text-white"
                          : "bg-red-500 text-white"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {tab} ({countByStatus(tab)})
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 bg-gray-100 w-full rounded-md p-4">
                <IoSearch />
                <input
                  type="text"
                  placeholder="Search by phone number..."
                  className="text-md bg-transparent outline-none w-full"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredUsers.map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                  onStatusChange={handleStatusChange}
                  activeMenuId={activeMenuId}
                  setActiveMenuId={setActiveMenuId}
                />
              ))}
              {filteredUsers.length === 0 && (
                <p className="text-gray-400 col-span-full text-center py-10">
                  No {activeTab} users found.
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Users;