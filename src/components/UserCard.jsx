import React from "react";
import { FaPhone } from "react-icons/fa";
import { MdContentCopy } from "react-icons/md";
import { MdMoreVert } from "react-icons/md";
import { useState } from "react";

const statusColors = {
  active: "bg-green-500",
  inactive: "bg-yellow-500",
  banned: "bg-red-500",
};

const UserCard = ({ user, setActiveMenuId, activeMenuId, onStatusChange }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const isBanned = user.status === "banned";
  const isMenuOpen = activeMenuId === user.id;

  const toggleMenu = () => {
    setActiveMenuId(isMenuOpen ? null : user.id);
  };

  const handleConfirm = () => {
    const newStatus = isBanned ? "active" : "banned";
    onStatusChange(user.id, newStatus);
    setShowConfirm(false);
    setActiveMenuId(null);
  }
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
  try {
    await navigator.clipboard.writeText(user.phone);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  } catch (err) {
    console.error("Failed to copy:", err);
  }
};
  return (
    <div className="bg-white shadow-sm rounded-xl p-4 shadow-5xl hover:shadow-md transition">
        <div>
            <div>
            <div className="flex items-center justify-between mb-2">
            <div
            className={`h-fit p-2 rounded-full ${statusColors[user.status]}`}
            >
                <FaPhone className="text-white"/>
            </div>
                <div>
                    <div onClick={toggleMenu} className="cursor-pointer">
                    <MdMoreVert/>
                    {/* Dropdown */}
                    {isMenuOpen && (
                        <div className="absolute mt-2 bg-white shadow-lg rounded-md p-2 z-10">
                        <button
                            onClick={() => setShowConfirm(true)}
                            className={`text-sm px-3 py-2 rounded w-full text-left cursor-pointer ${
                            isBanned ? "text-green-600" : "text-red-500"
                            }`}
                        >
                            {isBanned ? "Activate user" : "Ban user"}
                        </button>
                        </div>
                    )}
                    </div>
                </div>
            </div>
            </div>
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">{user.phone}</h3>
                <div className="relative">
                <MdContentCopy
                    onClick={handleCopy}
                    className="cursor-pointer hover:text-green-600 transition"
                />

                {copied && (
                    <span className="absolute -top-6 right-0 text-xs bg-black text-white px-2 py-1 rounded">
                    Copied!
                    </span>
                )}
                </div>
            </div>  
            <hr className="my-2 text-black/30"/>
            <p className="text-sm text-gray-600">Joined: {user.date} </p>
            <p className="text-sm text-gray-600">Joined: {user.active} </p>    
        </div>
        
          {/* Confirm Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-2xl">
            <h3 className="font-semibold text-lg mb-3">
              {isBanned ? "Activate User" : "Ban User"}
            </h3>

            <p className="text-sm text-gray-600 mb-6">
              {isBanned
                ? `Are you sure you want to activate ${user.phone}? They will regain access to the platform.`
                : `Are you sure you want to ban ${user.phone}? They will not be able to access the platform.`}
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 cursor-pointer py-2 text-sm bg-gray-100 rounded-md"
              >
                Cancel
              </button>

              <button
                onClick={handleConfirm}
                className={`px-4 py-2 text-sm cursor-pointer text-white rounded-md ${
                  isBanned ? "bg-green-500" : "bg-red-500"
                }`}
              >
                {isBanned ? "Activate" : "Ban"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCard;