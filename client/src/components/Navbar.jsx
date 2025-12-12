// import { Menu, Users } from 'lucide-react';
// import React, { useEffect } from "react";
// import { Button } from './ui/button';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from './ui/dropdown-menu';
// import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
// import {
//   Sheet,
//   SheetClose,
//   SheetContent,
//   SheetFooter,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from './ui/sheet';
// import { Separator } from '@radix-ui/react-dropdown-menu';
// import { Link, useNavigate } from "react-router-dom";
// import { useLogoutUserMutation } from '@/features/api/authApi';
// import { useSelector } from "react-redux";
// import { toast } from "sonner";

// const Navbar = () => {
//   const { user } = useSelector((store) => store.auth);
//   const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     await logoutUser().unwrap();
//   };

//   useEffect(() => {
//     if (isSuccess) {
//       toast.success(data?.message || "User log out.");
//       navigate("/login");
//     }
//   }, [isSuccess, data, navigate]);

//   return (
//     <div className="h-20 dark:bg-[#020817] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10">
//       {/* Desktop */}
//       <div className="max-w-7xl mx-auto px-4 md:px-8 hidden md:flex justify-between items-center gap-10 h-full">
//         <div className="flex items-center gap-2">
//             <Users size={"30"} />
//           <Link to="/">
//             <h1 className="hidden md:block font-semibold text-2xl">SportXpert</h1>
//           </Link>
//         </div>

//         <div className="flex items-center gap-6">
//           {user ? (
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>

//                 <Avatar>
//                   <AvatarImage src={user?.photoUrl || "https://static.vecteezy.com/system/resources/previews/036/280/650/non_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"} alt={user.name || "User"} />
//                   <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
//                 </Avatar>

//               </DropdownMenuTrigger>
//               <DropdownMenuContent className="w-56 mr-5">
//                 <DropdownMenuLabel>My Account</DropdownMenuLabel>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuGroup>
//                   <DropdownMenuItem><Link to="/profile">Edit Profile</Link></DropdownMenuItem>
//                   {user?.role !== "admin" && (
//                     <DropdownMenuItem>
//                       <Link to="/my-tournaments">My Tournaments</Link>
//                     </DropdownMenuItem>
//                   )}

//                   {user?.role === "admin" && (
//                     <>
//                       <DropdownMenuItem><Link to="/admin/tournament" className="dark:text-white hover:text-gray-500 rounded-md">Tournaments</Link></DropdownMenuItem>
//                       <DropdownMenuItem><Link to="/admin/dashboard">Dashboard</Link></DropdownMenuItem>
//                     </>
//                   )}
//                   <DropdownMenuSeparator />
//                   <DropdownMenuItem className="text-red-500 hover:bg-red-100 cursor-pointer" onClick={handleLogout}>
//                     Logout
//                   </DropdownMenuItem>
//                 </DropdownMenuGroup>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           ) : (
//             <div className="flex items-center gap-6">

//               <Button variant="outline" className="hover:bg-blue-500 hover:text-white transition-all duration-300"
//                 onClick={() => navigate("/login")}>Login
//               </Button>

//               <Button className="bg-blue-500 hover:bg-blue-700 transition-all duration-300 text-white"
//                 onClick={() => navigate("/register")}>Signup
//               </Button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Mobile device */}
//       <div className="flex md:hidden items-center justify-between px-4 h-full">
//         <Link to="/">
//           <h1 className="font-semibold text-2xl">SportXpert</h1>
//         </Link>
//         <MobileNavbar user={user} handleLogout={handleLogout} />
//       </div>
//     </div >
//   );
// };

// export default Navbar;

import { Users } from "lucide-react";
import React, { useEffect } from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "@/features/api/authApi";
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
      toast.success(data?.message || "User logged out.");
      navigate("/login");
    }
  }, [isSuccess, data, navigate]);

  return (
    <div className="h-20 dark:bg-[#020817] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10">
      {/* ✅ Desktop Navbar */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 hidden md:flex justify-between items-center gap-10 h-full">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Users size={30} className="text-blue-600" />
          <Link to="/">
            <h1 className="font-semibold text-2xl tracking-tight">
              SportXpert
            </h1>
          </Link>
        </div>

        {/* Nav Links */}
        <div className="flex items-center gap-8 text-[15px] font-medium">
          <Link to="/" className="hover:text-blue-500 transition-colors">
            Home
          </Link>
          <Link
            to="/about-us"
            className="hover:text-blue-500 transition-colors"
          >
            About Us
          </Link>
          <Link
            to="/contact-us"
            className="hover:text-blue-500 transition-colors"
          >
            Contact Us
          </Link>
        </div>


        <div className="flex items-center gap-5">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer hover:opacity-90 transition-all">
                  <Avatar className="w-10 h-10">
                    <AvatarImage
                      src={
                        user?.photoUrl ||
                        "https://static.vecteezy.com/system/resources/previews/036/280/650/non_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"
                      }
                      alt={user?.name || "User"}
                    />
                    <AvatarFallback>
                      {user?.name?.charAt(0)?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                className="w-60 mr-4 mt-3 p-3 rounded-xl shadow-xl border dark:border-gray-700 bg-white dark:bg-[#0f172a]"
                align="end"
              >
                {/* User Info */}
                <div className="flex items-center gap-3 pb-3 border-b dark:border-gray-700">
                  <Avatar className="w-10 h-10">
                    <AvatarImage
                      src={
                        user?.photoUrl ||
                        "https://static.vecteezy.com/system/resources/previews/036/280/650/non_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"
                      }
                      alt={user?.name || "User"}
                    />
                    <AvatarFallback>
                      {user?.name?.charAt(0)?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm">{user?.name}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[140px]">
                      {user?.email}
                    </span>
                  </div>
                </div>

                {/* Role Links */}
                <div className="flex flex-col gap-3 mt-3 text-[15px]">
                  {user?.role === "admin" ? (
                    <>
                      <Link
                        to="/admin/dashboard"
                        className="cursor-pointer hover:bg-blue-50 dark:hover:bg-gray-800 rounded-md transition-all"
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/admin/tournament"
                        className="cursor-pointer hover:bg-blue-50 dark:hover:bg-gray-800 rounded-md transition-all"
                      >
                        Tournaments
                      </Link>
                    </>
                  ) : (
                    <Link
                      to="/my-tournaments"
                      className="cursor-pointer hover:bg-blue-50 dark:hover:bg-gray-800 rounded-md transition-all"
                    >
                      My Tournaments
                    </Link>
                  )}

                  <Link
                    to="/profile"
                    className="cursor-pointer hover:bg-blue-50 dark:hover:bg-gray-800 rounded-md transition-all"
                  >
                    Edit Profile
                  </Link>
                  <Link
                    className="text-red-700 cursor-pointer hover:bg-red-50 dark:hover:bg-gray-800 rounded-md transition-all"
                    onClick={handleLogout}
                  >
                    Logout
                  </Link>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                className="hover:bg-blue-500 hover:text-white transition-all"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
              <Button
                className="bg-blue-500 hover:bg-blue-700 text-white transition-all"
                onClick={() => navigate("/register")}
              >
                Signup
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* ✅ Mobile Navbar */}
      <div className="flex md:hidden items-center justify-between px-4 h-full">
        <Link to="/">
          <h1 className="font-semibold text-2xl tracking-tight">SportXpert</h1>
        </Link>

        <div className="flex items-center gap-3">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="w-9 h-9 cursor-pointer hover:opacity-90 transition-all">
                  <AvatarImage
                    src={
                      user?.photoUrl ||
                      "https://static.vecteezy.com/system/resources/previews/036/280/650/non_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"
                    }
                  />
                  <AvatarFallback>
                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              {/* Mobile Dropdown */}
              <DropdownMenuContent
                className="w-64 mr-2 mt-2 p-3 rounded-xl shadow-xl border dark:border-gray-700 bg-white dark:bg-[#0f172a] max-h-[80vh] overflow-y-auto"
                align="end"
              >
                {/* User Info */}
                <div className="flex items-center gap-3 pb-3 border-b dark:border-gray-700">
                  <Avatar className="w-10 h-10">
                    <AvatarImage
                      src={
                        user?.photoUrl ||
                        "https://static.vecteezy.com/system/resources/previews/036/280/650/non_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"
                      }
                    />
                    <AvatarFallback>
                      {user?.name?.charAt(0)?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm">{user?.name}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[130px]">
                      {user?.email}
                    </span>
                  </div>
                </div>

                {/* Links */}
                <div className="flex flex-col gap-2 mt-3 text-[15px] font-medium">
                  <Link to="/" className="hover:text-blue-500 transition-all">
                    Home
                  </Link>
                  <Link
                    to="/about-us"
                    className="hover:text-blue-500 transition-all"
                  >
                    About Us
                  </Link>
                  <Link
                    to="/contact-us"
                    className="hover:text-blue-500 transition-all"
                  >
                    Contact Us
                  </Link>

                  {user?.role === "admin" ? (
                    <>
                      <Link
                        to="/admin/dashboard"
                        className="hover:text-blue-500 transition-all"
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/admin/tournament"
                        className="hover:text-blue-500 transition-all"
                      >
                        Tournaments
                      </Link>
                    </>
                  ) : (
                    <Link
                      to="/my-tournaments"
                      className="hover:text-blue-500 transition-all"
                    >
                      My Tournaments
                    </Link>
                  )}
                  <Link
                    to={"/profile"}
                    className="cursor-pointer hover:bg-blue-50 dark:hover:bg-gray-800 rounded-md transition-all"
                  >
                    Edit Profile
                  </Link>
                  <Link
                    className="text-red-700 cursor-pointer hover:bg-red-50 dark:hover:bg-gray-800 rounded-md transition-all"
                    onClick={handleLogout}
                  >
                    Logout
                  </Link>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-3">
              <Button
                size="sm"
                variant="outline"
                className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-all rounded-md px-4"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>

              <Button
                size="sm"
                className="bg-blue-500 hover:bg-blue-600 text-white transition-all rounded-md px-4"
                onClick={() => navigate("/register")}
              >
                Signup
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;




















// const MobileNavbar = ({ user, handleLogout }) => {
//   const navigate = useNavigate();
//   return (
//     <Sheet>
//       <SheetTrigger asChild>
//         <Button
//           size="icon"
//           className="rounded-full hover:bg-gray-200"
//           variant="outline"
//         >
//           <Menu size={24} />
//         </Button>
//       </SheetTrigger>
//       <SheetContent className="flex flex-col">
//         <SheetHeader className="flex flex-row items-center justify-between mt-2">
//           <SheetTitle>
//             <Link to="/">SportXpert</Link>
//           </SheetTitle>
//         </SheetHeader>
//         <Separator className="mr-2" />

//         <nav className="flex flex-col space-y-1">
//           {/* <SheetClose asChild>
//             <Link to="/" className="dark:text-white hover:text-gray-500 px-3 py-2 rounded-md">Home</Link>
//           </SheetClose> */}

//           {/* <SheetClose asChild>
//             <Link to="/about" className="dark:text-white hover:text-gray-500 px-3 py-2 rounded-md">About</Link>
//           </SheetClose>

//           <SheetClose asChild>
//             <Link to="/contact" className="dark:text-white hover:text-gray-500 px-3 py-2 rounded-md">Contact Us</Link>
//           </SheetClose>

//           <SheetClose asChild>
//             <Link to="/services" className="dark:text-white hover:text-gray-500 px-3 py-2 rounded-md">Services</Link>
//           </SheetClose> */}

//           {/* Show My Tournaments only for normal users (not admins) */}
//           {user && user?.role !== "admin" && (
//             <SheetClose asChild>
//               <Link
//                 to="/my-tournaments"
//                 className="dark:text-white hover:text-gray-500 px-3 py-2 rounded-md"
//               >
//                 My Tournaments
//               </Link>
//             </SheetClose>
//           )}

//           {/* Show Profile only when user is logged in */}
//           {user && (
//             <SheetClose asChild>
//               <Link
//                 to="/profile"
//                 className="dark:text-white hover:text-gray-500 px-3 py-2 rounded-md"
//               >
//                 Edit Profile
//               </Link>
//             </SheetClose>
//           )}

//           {/* Show Admin Dashboard only for Admins */}
//           {user?.role === "admin" && (
//             <>
//               <SheetClose asChild>
//                 <Link
//                   to="/admin/tournament"
//                   className="dark:text-white hover:text-gray-500 px-3 py-2 rounded-md"
//                 >
//                   Tournaments
//                 </Link>
//               </SheetClose>
//               <SheetFooter>
//                 <SheetClose asChild>
//                   <Link
//                     to="/admin/dashboard"
//                     className="dark:text-white hover:text-gray-500 px-3 py-2 rounded-md"
//                   >
//                     Dashboard
//                   </Link>
//                 </SheetClose>
//               </SheetFooter>
//             </>
//           )}

//           {/* Login / Logout Handling */}
//           {user ? (
//             <p
//               className="text-red-600 hover:text-red-400 px-3 py-2 rounded-md cursor-pointer"
//               onClick={handleLogout}
//             >
//               Logout
//             </p>
//           ) : (
//             <div className="flex flex-col space-y-2">
//               <SheetClose asChild>
//                 <Button variant="outline">
//                   <Link to="/login">Login</Link>
//                 </Button>
//               </SheetClose>

//               <SheetClose asChild>
//                 <Button>
//                   <Link to="/register">Signup</Link>
//                 </Button>
//               </SheetClose>
//             </div>
//           )}
//         </nav>
//       </SheetContent>
//     </Sheet>
//   );
// };
