import React, { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import {
  LayoutDashboard,
  Trophy,
  User,
  LogOut,
  LogIn,
  UserPlus,
} from "lucide-react";
import { toast } from "sonner";

/* ── helpers ── */
const DEFAULT_AVATAR =
  "https://static.vecteezy.com/system/resources/previews/036/280/650/non_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg";

const NAV_LINKS = [
  { label: "Home",       to: "/" },
  { label: "About Us",   to: "/about-us" },
  { label: "Contact Us", to: "/contact-us" },
];

/* ── UserAvatar ── */
const UserAvatar = ({ user, size = "w-9 h-9" }) => (
  <Avatar className={size}>
    <AvatarImage src={user?.photoUrl || DEFAULT_AVATAR} alt={user?.name || "User"} />
    <AvatarFallback className="bg-blue-100 text-blue-700 font-semibold">
      {user?.name?.charAt(0)?.toUpperCase() || "U"}
    </AvatarFallback>
  </Avatar>
);

/* ── DropdownLink ── */
const DropdownLink = ({ to, icon: Icon, label, onClick, danger }) => {
  const base =
    "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors";
  const style = danger
    ? `${base} text-red-600 hover:bg-red-50 cursor-pointer`
    : `${base} text-gray-700 hover:bg-gray-100`;

  if (onClick) {
    return (
      <button className={`${style} w-full text-left`} onClick={onClick}>
        {Icon && <Icon size={15} />} {label}
      </button>
    );
  }
  return (
    <Link to={to} className={style}>
      {Icon && <Icon size={15} />} {label}
    </Link>
  );
};

/* ── UserMenu (shared between desktop & mobile) ── */
const UserMenu = ({ user, onLogout }) => (
  <DropdownMenuContent
    className="w-56 p-2 rounded-xl shadow-xl border border-gray-100 bg-white"
    align="end"
    sideOffset={8}
  >
    {/* User info */}
    <div className="flex items-center gap-3 px-3 py-2.5 mb-1">
      <UserAvatar user={user} size="w-9 h-9" />
      <div className="flex flex-col min-w-0">
        <span className="font-semibold text-sm text-gray-900 truncate">{user?.name}</span>
        <span className="text-xs text-gray-400 truncate">{user?.email}</span>
      </div>
    </div>

    <DropdownMenuSeparator className="my-1" />

    {/* Role-specific links */}
    {user?.role === "admin" ? (
      <>
        <DropdownLink to="/admin/dashboard"  icon={LayoutDashboard} label="Dashboard" />
        <DropdownLink to="/admin/tournament" icon={Trophy}          label="Tournaments" />
      </>
    ) : (
      <DropdownLink to="/my-tournaments" icon={Trophy} label="My Tournaments" />
    )}

    <DropdownLink to="/profile" icon={User} label="Edit Profile" />

    <DropdownMenuSeparator className="my-1" />

    <DropdownLink icon={LogOut} label="Logout" onClick={onLogout} danger />
  </DropdownMenuContent>
);

/* ── Navbar ── */
const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
    } catch {
      toast.error("Logout failed. Please try again.");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Logged out successfully.");
      navigate("/login");
    }
  }, [isSuccess, data, navigate]);

  const isActive = (path) =>
    path === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(path);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-full">

        {/* Logo */}
        <Link to="/" className="font-bold text-xl tracking-tight text-gray-900">
          SportXpert
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive(to)
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="rounded-full ring-2 ring-transparent hover:ring-blue-200 transition-all focus:outline-none">
                  <UserAvatar user={user} size="w-9 h-9" />
                </button>
              </DropdownMenuTrigger>
              <UserMenu user={user} onLogout={handleLogout} />
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 text-sm font-medium"
                onClick={() => navigate("/login")}
              >
                <LogIn size={14} /> Login
              </Button>
              <Button
                size="sm"
                className="gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium"
                onClick={() => navigate("/register")}
              >
                <UserPlus size={14} /> Sign Up
              </Button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};

export default Navbar;