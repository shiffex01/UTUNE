
import Sidebar from "../components/Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { FiMenu } from "react-icons/fi"; // menu icon
import { useState } from "react";

const AdminLayout = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const pageTitles = {
  "/": ["Dashboard", "Analytics and user overview"],
  "/users": ["Users", "Manage user accounts by phone number"],
  "/analytics": ["Analytics", "User statistics and growth metrics"],
  "/requests": ["Tune Activation Requests", "Approve or decline user tune activation requests"],
  "/settings": ["Settings", "Configure platform settings"],
  "/login": ["Login", ""],
};

const currentTitle = pageTitles[location.pathname] || ["Page", ""];
  return (
    <div className="flex bg-gray-100 min-h-screen relative">
              {/* Sidebar */}
        <Sidebar
          className={`
            fixed top-0 left-0 h-screen z-30 transform transition-transform duration-300
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
            md:translate-x-0
          `}
          closeSidebar={() => setIsSidebarOpen(false)} // pass function
        />

        {/* Mobile overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-20 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

      {/* Main content area */}
      <div className="flex-1 flex flex-col ml-0 md:ml-64">
        {/* Header inside content */}
        <div className="bg-white shadow-md flex justify-between items-center h-30 px-4 md:px-8 sticky top-0 z-10 w-full">
          <div className="flex flex-col gap-2 p-2">
            <h1 className="md:text-3xl text-2xl font-bold">{currentTitle[0]}</h1>
            <h1 className="md:text-xl text-md text-gray-600">{currentTitle[1]}</h1>
          </div>  

          {/* Mobile menu icon */}
          <button
            className="md:hidden text-3xl"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <FiMenu />
          </button>
        </div>

        {/* Scrollable page content */}
       <div className="flex-1 md:w-full p-4 sm:p-6 md:p-8 overflow-y-auto">
          <Outlet />
        </div> 
      </div>
    </div>
  );
};

export default AdminLayout;