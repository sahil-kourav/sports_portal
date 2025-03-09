import { LayoutDashboard, Trophy, ChevronsLeft, ChevronsRight } from "lucide-react";
import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div className="flex">
      <div
        className={`h-screen border-r border-gray-300 dark:border-gray-700 p-3 sticky top-0 transition-all duration-300 ${
          collapsed ? "w-[70px]" : "w-[200px] sm:w-[250px]"
        }`}
      >
        {/* Toggle Button */}
        <button
          className="mt-4 flex items-center justify-center w-full p-2 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-300"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronsRight size={22} /> : <ChevronsLeft size={22} />}
        </button>

        {/* Sidebar Options */}
        <div className="space-y-4 mt-5">
          <SidebarLink to="dashboard" label="Dashboard" icon={<LayoutDashboard size={collapsed ? 30 : 25} />} active={location.pathname === "/dashboard"} collapsed={collapsed} />
          <SidebarLink to="tournament" label="Tournaments" icon={<Trophy size={collapsed ? 30 : 25} />} active={location.pathname.startsWith("/tournament")} collapsed={collapsed} />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        <Outlet />
      </div>
    </div>
  );
};

// Sidebar Link Component
const SidebarLink = ({ to, label, icon, active, collapsed }) => {
  return (
    <Link
      to={to}
      className={`flex items-center gap-2 px-3 py-2 rounded-md transition duration-300 ${
        active ? "bg-blue-500 text-white" : "hover:bg-gray-200 dark:hover:bg-gray-700"
      }`}
    >
      {icon}
      {!collapsed && <span>{label}</span>}
    </Link>
  );
};

export default Sidebar;