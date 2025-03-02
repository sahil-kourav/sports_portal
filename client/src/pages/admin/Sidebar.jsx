// import { LayoutDashboard, Trophy } from "lucide-react";
// import React from "react";
// import { Link, Outlet } from "react-router-dom";

// const Sidebar = () => {
//   return (
//     <div className="flex">
//       <div className=" lg:block w-[230px] sm:w-[250px] space-y-8 border-r border-gray-300 dark:border-gray-700  p-5 sticky top-0  h-screen">
//         <div className="space-y-4  mt-5">
//           <Link to="dashboard" className="flex items-center gap-2">
//             <LayoutDashboard size={22} />
//             <h1>Dashboard</h1>
//           </Link>
//           <Link to="tournament" className="flex items-center gap-2">
//             <Trophy size={22} />
//             <h1>Tournaments</h1>
//           </Link>
//         </div>
//       </div>
//     <div className="flex-1 p-10 ">
//         <Outlet/>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;








import { LayoutDashboard, Trophy, Menu } from "lucide-react";
import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div className="flex">
      <div
        className={`h-screen border-r border-gray-300 dark:border-gray-700 p-3 sticky top-0 transition-all duration-300 ${
          collapsed ? "w-[70px]" : "w-[230px] sm:w-[250px]"
        }`}
      >
        {/* Toggle Button */}
        <button
          className="mt-4 flex items-center justify-center w-full p-2 bg-gray-200 dark:bg-gray-700 rounded-md"
          onClick={() => setCollapsed(!collapsed)}
        >
          <Menu size={22} />
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







// import React from "react";
// import { Link, useLocation, Outlet } from "react-router-dom";
// import { LayoutDashboard, Trophy } from "lucide-react";

// const Sidebar = () => {
//   const location = useLocation();

//   return (
//     <div className="flex">
//       {/* Sidebar */}
//       <div className="lg:w-[250px] sm:w-[300px] space-y-8 border-r border-gray-300 dark:border-gray-700 p-5 sticky top-0 h-screen">
//         <div className="space-y-4 mt-5">
//           <SidebarLink to="/dashboard" label="Dashboard" icon={<LayoutDashboard size={22} />} active={location.pathname === "/dashboard"} />
//           <SidebarLink to="/tournament" label="Tournaments" icon={<Trophy size={22} />} active={location.pathname.startsWith("/tournament")} />
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-10">
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// // Sidebar Link Component
// const SidebarLink = ({ to, label, icon, active }) => {
//   return (
//     <Link to={to} className={`flex items-center gap-2 px-3 py-2 rounded-md transition duration-300 ${active ? "bg-blue-500 text-white" : "hover:bg-gray-200 dark:hover:bg-gray-700"}`}>
//       {icon}
//       <span>{label}</span>
//     </Link>
//   );
// };

// export default Sidebar;
