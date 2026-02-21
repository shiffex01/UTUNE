import React, { useState } from "react";
import UserCard from "../components/UserCard";
import { usersMock } from "../data/UsersMock";
import { IoSearch } from "react-icons/io5";

const Users = () => {
  const [users, setUsers] = useState(usersMock);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [activeTab, setActiveTab] = useState("active");
  const [search, setSearch] = useState("");

  const handleStatusChange = (id, newStatus) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, status: newStatus } : user
      )
    );
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
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Users</h1>
        <p className="text-sm text-gray-500 mb-6">
          Manage user accounts by status section
        </p>

        <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
          <div className="flex gap-4 mb-4">
            {["active", "inactive", "banned"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 cursor-pointer py-2 rounded-md text-sm capitalize ${
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
              className="text-sm bg-transparent outline-none w-full"
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
        </div>
      </div>
    </div>
  );
};

export default Users;