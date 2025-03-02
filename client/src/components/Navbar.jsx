import { Menu, Users } from 'lucide-react';
import React, { useEffect } from "react";
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from '@/features/api/authApi';
import { useSelector } from "react-redux";
import { toast } from "sonner";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser().unwrap();
  };
  

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "User log out.");
      navigate("/login");
    }
  }, [isSuccess, data, navigate]);
  


  return (
    <div className="h-20 dark:bg-[#020817] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10">
      {/* Desktop */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 hidden md:flex justify-between items-center gap-10 h-full">
        <div className="flex items-center gap-2">
          <Users size={"30"} />
          <h1 className="hidden md:block font-semibold text-2xl">SportXpert</h1>
        </div>
        {/* <div className="flex gap-6 item-end"> */}
        <div className="flex ml-auto gap-6 items-center">
          <Link to="/" className="dark:text-white hover:text-gray-500 px-3 py-2 rounded-md">Home</Link>
          <Link to="/about-us" className="dark:text-white hover:text-gray-500  px-3 py-2 rounded-md">About Us</Link>
          <Link to="/contact-us" className="dark:text-white hover:text-gray-500 px-3 py-2 rounded-md">Contact Us</Link>
          <Link to="/services" className="dark:text-white hover:text-gray-500 px-3 py-2 rounded-md">Services</Link>
        </div>
        {/* User icons and dark mode icon */}
        <div className="flex items-center gap-6">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>

                <Avatar>
                  <AvatarImage src={user?.photoUrl || "https://static.vecteezy.com/system/resources/previews/036/280/650/non_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"} alt={user.name || "User"} />
                  <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>

              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 mr-5">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem><Link to="/profile">Edit Profile</Link></DropdownMenuItem>
                  {user?.role !== "admin" && (
                    <DropdownMenuItem>
                      <Link to="/my-tournaments">My Tournaments</Link>
                    </DropdownMenuItem>
                  )}

                  {user?.role === "admin" && (
                    <>
                      <DropdownMenuItem><Link to="/admin/tournament" className="dark:text-white hover:text-gray-500 rounded-md">Tournaments</Link></DropdownMenuItem>
                      <DropdownMenuItem><Link to="/admin/dashboard">Dashboard</Link></DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-500 hover:bg-red-100 cursor-pointer" onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-6">

              <Button variant="outline" className="hover:bg-blue-500 hover:text-white transition-all duration-300"
                onClick={() => navigate("/login")}>Login
              </Button>

              <Button className="bg-blue-500 hover:bg-blue-700 transition-all duration-300 text-white"
                onClick={() => navigate("/register")}>Signup
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile device */}
      <div className="flex md:hidden items-center justify-between px-4 h-full">
        <h1 className="font-semibold text-2xl">SportXpert</h1>
        <MobileNavbar user={user} handleLogout={handleLogout} />
      </div>
    </div >
  );
};

export default Navbar;

const MobileNavbar = ({ user, handleLogout }) => {
  const navigate = useNavigate();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" className="rounded-full hover:bg-gray-200" variant="outline">
          <Menu size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader className="flex flex-row items-center justify-between mt-2">
          <SheetTitle><Link to="/">SportXpert</Link></SheetTitle>
        </SheetHeader>
        <Separator className="mr-2" />

        <nav className="flex flex-col space-y-1">
          <SheetClose asChild>
            <Link to="/" className="dark:text-white hover:text-gray-500 px-3 py-2 rounded-md">Home</Link>
          </SheetClose>

          <SheetClose asChild>
            <Link to="/about" className="dark:text-white hover:text-gray-500 px-3 py-2 rounded-md">About</Link>
          </SheetClose>

          <SheetClose asChild>
            <Link to="/contact" className="dark:text-white hover:text-gray-500 px-3 py-2 rounded-md">Contact Us</Link>
          </SheetClose>

          <SheetClose asChild>
            <Link to="/services" className="dark:text-white hover:text-gray-500 px-3 py-2 rounded-md">Services</Link>
          </SheetClose>

          {/* Show My Tournaments only for normal users (not admins) */}
          {user && user?.role !== "admin" && (
            <SheetClose asChild>
              <Link to="/my-tournaments" className="dark:text-white hover:text-gray-500 px-3 py-2 rounded-md">
                My Tournaments
              </Link>
            </SheetClose>
          )}

          {/* Show Profile only when user is logged in */}
          {user && (
            <SheetClose asChild>
              <Link to="/profile" className="dark:text-white hover:text-gray-500 px-3 py-2 rounded-md">
                Edit Profile
              </Link>
            </SheetClose>
          )}

          {/* Show Admin Dashboard only for Admins */}
          {user?.role === "admin" && (
            <>
              <SheetClose asChild>
                <Link to="/admin/tournament" className="dark:text-white hover:text-gray-500 px-3 py-2 rounded-md">
                  Tournaments
                </Link>
              </SheetClose>
              <SheetFooter>
                <SheetClose asChild>
                  <Link to="/admin/dashboard" className="dark:text-white hover:text-gray-500 px-3 py-2 rounded-md">
                    Dashboard
                  </Link>
                </SheetClose>
              </SheetFooter>
            </>
          )}

          {/* Login / Logout Handling */}
          {user ? (
            <p className="text-red-600 hover:text-red-400 px-3 py-2 rounded-md cursor-pointer" onClick={handleLogout}>
              Logout
            </p>
          ) : (
            <div className="flex flex-col space-y-2">
              <SheetClose asChild>
                <Button variant="outline">
                  <Link to="/login">Login</Link>
                </Button>
              </SheetClose>

              <SheetClose asChild>
                <Button>
                  <Link to="/register">Signup</Link>
                </Button>
              </SheetClose>
            </div>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
};
