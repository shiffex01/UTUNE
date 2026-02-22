import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaUsers, FaCog, FaSignOutAlt } from "react-icons/fa";
import { FiUser } from "react-icons/fi";

const Sidebar = () => {
  const linkStyle =
    "flex items-center gap-3 p-2 rounded-lg hover:bg-white/20 transition";

  return (
    <div className="h-screen w-64 bg-gradient-to-b from-purple-600 fixed to-pink-500 text-white p-6 flex flex-col justify-between">
      
      {/* TOP SECTION */}
      <div>
        <h1 className="text-2xl font-bold mb-10">UTUNE</h1>

        <ul className="space-y-4">
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `${linkStyle} ${isActive ? "bg-white/30" : ""}`
              }
            >
              <FaTachometerAlt />
              Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/users"
              className={({ isActive }) =>
                `${linkStyle} ${isActive ? "bg-white/30" : ""}`
              }
            >
              <FaUsers />
              Users
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/analytics"
              className={({ isActive }) =>
                `${linkStyle} ${isActive ? "bg-white/30" : ""}`
              }
            >
              <FaCog />
              Analytics
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/requests"
              className={({ isActive }) =>
                `${linkStyle} ${isActive ? "bg-white/30" : ""}`
              }
            >
              <FaCog />
              Requests
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `${linkStyle} ${isActive ? "bg-white/30" : ""}`
              }
            >
              <FaCog />
              Settings
            </NavLink>
          </li>

        </ul>
      </div>
      

      {/* BOTTOM SECTION */}
      <div className="border-t border-white/30 pt-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-white/20 p-2 rounded-full">
            <FiUser />
          </div>
          <div>
            <p className="text-sm font-semibold">Admin Name</p>
            <p className="text-xs opacity-80">admin@utune.com</p>
          </div>
        </div>

        <NavLink
          to="/login"
        >
          <button className="cursor-pointer flex items-center gap-2 text-sm bg-white/15 w-full rounded-xl flex items-center justify-center text-center p-2 hover:text-red-200 transition">
          <FaSignOutAlt />
          Logout
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;