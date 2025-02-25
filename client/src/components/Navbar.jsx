import { Menu, School } from 'lucide-react';
import React from 'react';
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
import DarkMode from '@/DarkMode';
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
import { Link } from 'react-router-dom';
import { useLogoutUserMutation } from '@/features/api/authApi';
import { useDispatch, useSelector } from 'react-redux';
import { userLoggedOut } from '@/features/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth); // Get user state from Redux
  const [logoutUser] = useLogoutUserMutation();

  const handleLogout = async () => {
    try {
      await logoutUser();
      dispatch(userLoggedOut());
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="h-20 dark:bg-[#020817] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10">
      {/* Desktop */}
      <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full">
        <div className="flex items-center gap-2">
          <School size={"30"} />
          <h1 className="hidden md:block font-bold text-2xl">SportXpert</h1>
        </div>
        {/* <div className="flex gap-6 item-end"> */}
        <div className="flex ml-auto gap-6 items-center">
          <Link to="/" className="dark:text-white hover:text-gray-500 px-3 py-2 rounded-md">Home</Link>
          <Link to="/about" className="dark:text-white hover:text-gray-500  px-3 py-2 rounded-md">About</Link>
          <Link to="/contact" className="dark:text-white hover:text-gray-500 px-3 py-2 rounded-md">Contact Us</Link>
          <Link to="/tournament" className="dark:text-white hover:text-gray-500 px-3 py-2 rounded-md">Tournament</Link>
        </div>
        {/* User icons and dark mode icon */}
        <div className="flex items-center gap-6">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage src={user.avatar || "https://github.com/shadcn.png"} alt={user.name || "User"} />
                  <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 mr-5">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>Dashboard</DropdownMenuItem>
                  <DropdownMenuItem><Link to="profile">Edit Profile</Link></DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-500 hover:bg-red-100 cursor-pointer" onClick={handleLogout}> 
                  Logout
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-6">

              <Button variant="outline" className="hover:bg-blue-500 hover:text-white transition-all duration-300">
                <Link to="/login">Login</Link>
              </Button>
              <Button className="bg-blue-500 hover:bg-blue-700 transition-all duration-300 text-white">
                <Link to="/register">Signup</Link>
              </Button>
            </div>
          )}
          <DarkMode />
        </div>


        {/* </div> */}
      </div>

      {/* Mobile device */}
      <div className="flex md:hidden items-center justify-between px-4 h-full">
        <h1 className="font-extrabold text-2xl">SportXpert</h1>
        <MobileNavbar user={user} handleLogout={handleLogout} />
      </div>
    </div >
  );
};

export default Navbar;

const MobileNavbar = ({ user, handleLogout }) => {
  const userRole = user?.role || "";
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" className="rounded-full hover:bg-gray-200" variant="outline">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader className="flex flex-row items-center justify-between mt-2">
          <SheetTitle>SportXpert</SheetTitle>

          <DarkMode />
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
    <Link to="/tournament" className="dark:text-white hover:text-gray-500 px-3 py-2 rounded-md">Tournament</Link>
  </SheetClose>

  {/* Show Edit Profile only when user is logged in */}
  {user && (
    <SheetClose asChild>
      <Link to="/profile" className="dark:text-white hover:text-gray-500 px-3 py-2 rounded-md">Edit Profile</Link>
    </SheetClose>
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
          <Link to="/signup">Signup</Link>
        </Button>
      </SheetClose>
    </div>
  )}
</nav>


{/* Show Dashboard button only for instructors */}
{userRole === 'instructor' && (
  <SheetFooter>
    <SheetClose asChild>
      <Button type="submit">Dashboard</Button>
    </SheetClose>
  </SheetFooter>
)}

<Separator className="mr-2" />


    </SheetContent>
    </Sheet >
  );
};










// import React from 'react';
// import { Menu, School } from 'lucide-react';
// import { Button } from './ui/button';
// import { Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { userLoggedOut } from '@/features/authSlice';
// import { useLogoutUserMutation } from '@/features/api/authApi';
// import DarkMode from '@/DarkMode';

// import {
//   DropdownMenu,
//   DropdownMenuTrigger,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
// } from './ui/dropdown-menu';

// import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
// import {
//   Sheet,
//   SheetClose,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from './ui/sheet';

// // ✅ Reusable NavLink Component for Navbar links
// const NavLink = ({ to, children }) => (
//   <Link to={to} className="dark:text-white hover:text-gray-500 px-3 py-2 rounded-md">
//     {children}
//   </Link>
// );

// const Navbar = () => {
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);
//   const [logoutUser] = useLogoutUserMutation();

//   const handleLogout = async () => {
//     try {
//       await logoutUser().unwrap();
//       dispatch(userLoggedOut());
//     } catch (error) {
//       console.error('Logout failed:', error);
//     }
//   };

//   return (
//     <div className="h-20 dark:bg-[#020817] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10">
//       {/* Desktop Navbar */}
//       <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full">
//         <div className="flex items-center gap-2">
//           <School size={30} />
//           <h1 className="hidden md:block font-bold text-2xl">SportXpert</h1>
//         </div>

//         {/* Navbar Links */}
//         <div className="flex ml-auto gap-6 items-center">
//           <NavLink to="/">Home</NavLink>
//           <NavLink to="/about">About</NavLink>
//           <NavLink to="/contact">Contact Us</NavLink>
//           <NavLink to="/tournament">Tournament</NavLink>
//         </div>

//         {/* User Actions */}
//         <div className="flex items-center gap-6">
//           {user ? (
//             <UserDropdown user={user} handleLogout={handleLogout} />
//           ) : (
//             <div className="flex items-center gap-6">
//               <Button variant="outline" className="hover:bg-blue-500 hover:text-white transition-all duration-300">
//                 <Link to="/login">Login</Link>
//               </Button>
//               <Button className="bg-blue-500 hover:bg-blue-700 transition-all duration-300 text-white">
//                 <Link to="/register">Signup</Link>
//               </Button>
//             </div>
//           )}
//           <DarkMode />
//         </div>
//       </div>

//       {/* Mobile Navbar */}
//       <div className="flex md:hidden items-center justify-between px-4 h-full">
//         <h1 className="font-extrabold text-2xl">SportXpert</h1>
//         <MobileNavbar user={user} handleLogout={handleLogout} />
//       </div>
//     </div>
//   );
// };

// export default Navbar;

// // ✅ User Dropdown Component
// const UserDropdown = ({ user, handleLogout }) => (
//   <DropdownMenu>
//     <DropdownMenuTrigger asChild>
//       <Avatar>
//         <AvatarImage src={user.avatar || "https://github.com/shadcn.png"} alt={user.name || "User"} />
//         <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
//       </Avatar>
//     </DropdownMenuTrigger>
//     <DropdownMenuContent className="w-56 mr-5">
//       <DropdownMenuLabel>My Account</DropdownMenuLabel>
//       <DropdownMenuSeparator />
//       <DropdownMenuGroup>
//         <DropdownMenuItem><Link to="/dashboard">Dashboard</Link></DropdownMenuItem>
//         <DropdownMenuItem><Link to="/profile">Edit Profile</Link></DropdownMenuItem>
//       </DropdownMenuGroup>
//       <DropdownMenuSeparator />
//       <DropdownMenuItem className="text-red-500 hover:bg-red-100 cursor-pointer" onClick={handleLogout}>
//         Logout
//       </DropdownMenuItem>
//     </DropdownMenuContent>
//   </DropdownMenu>
// );

// // ✅ Mobile Navbar Component
// const MobileNavbar = ({ user, handleLogout }) => {
//   const userRole = user?.role || ""; // Handle undefined role

//   return (
//     <Sheet>
//       <SheetTrigger asChild>
//         <Button size="icon" className="rounded-full hover:bg-gray-200" variant="outline">
//           <Menu />
//         </Button>
//       </SheetTrigger>
//       <SheetContent className="flex flex-col">
//         <SheetHeader className="flex flex-row items-center justify-between mt-2">
//           <SheetTitle>SportXpert</SheetTitle>
//           <DarkMode />
//         </SheetHeader>

//         {/* Mobile Nav Links */}
//         <nav className="flex flex-col space-y-1 mt-4">
//           <NavLink to="/">Home</NavLink>
//           <NavLink to="/about">About</NavLink>
//           <NavLink to="/contact">Contact Us</NavLink>
//           <NavLink to="/tournament">Tournament</NavLink>
//           {user && <NavLink to="/profile">Edit Profile</NavLink>}
//         </nav>

//         {userRole === 'instructor' && (
//           <SheetClose asChild>
//             <Button className="mt-4 w-full">Dashboard</Button>
//           </SheetClose>
//         )}

//         {/* Auth Actions */}
//         <div className="mt-0 flex flex-col space-y-1">
//           {user ? (
//             <p onClick={handleLogout} className="cursor-pointer text-red-500">Log out</p>
//           ) : (
//             <>
//               <Button variant="outline"><Link to="/login">Login</Link></Button>
//               <Button><Link to="/register">Signup</Link></Button>
//             </>
//           )}
//         </div>
//       </SheetContent>
//     </Sheet>
//   );
// };






// import React, { useEffect, useState } from 'react';
// import { Menu, School } from 'lucide-react';
// import { Button } from './ui/button';
// import { Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { userLoggedOut, userLoggedIn } from '@/features/authSlice';
// import { useLogoutUserMutation } from '@/features/api/authApi';
// import DarkMode from '@/DarkMode';

// import {
//   DropdownMenu,
//   DropdownMenuTrigger,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
// } from './ui/dropdown-menu';

// import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
// import {
//   Sheet,
//   SheetClose,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from './ui/sheet';

// // ✅ Reusable NavLink Component
// const NavLink = ({ to, children }) => (
//   <Link to={to} className="dark:text-white hover:text-gray-500 px-3 py-2 rounded-md">
//     {children}
//   </Link>
// );

// const Navbar = () => {
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);
//   const [logoutUser] = useLogoutUserMutation();
//   const [authUser, setAuthUser] = useState(user);

//   // Persist user state even after refresh
//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem('user'));
//     if (storedUser) {
//       dispatch(userLoggedIn(storedUser)); // Restore user in Redux
//       setAuthUser(storedUser);
//     }
//   }, [dispatch]);

//   const handleLogout = async () => {
//     try {
//       await logoutUser().unwrap();
//       dispatch(userLoggedOut());
//       localStorage.removeItem('user'); // Remove from localStorage
//       setAuthUser(null);
//     } catch (error) {
//       console.error('Logout failed:', error);
//     }
//   };

//   return (
//     <div className="h-20 dark:bg-[#020817] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10">
//       {/* Desktop Navbar */}
//       <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full px-6">
//         <div className="flex items-center gap-2">
//           <School size={30} />
//           <h1 className="hidden md:block font-bold text-2xl">SportXpert</h1>
//         </div>

//         {/* Navbar Links */}
//         <div className="flex ml-auto gap-6 items-center">
//           <NavLink to="/">Home</NavLink>
//           <NavLink to="/about">About</NavLink>
//           <NavLink to="/contact">Contact Us</NavLink>
//           <NavLink to="/tournament">Tournament</NavLink>
//         </div>

//         {/* User Actions */}
//         <div className="flex items-center gap-6">
//           {authUser ? (
//             <UserDropdown user={authUser} handleLogout={handleLogout} />
//           ) : (
//             <div className="flex items-center gap-6">
//               <Button variant="outline">
//                 <Link to="/login">Login</Link>
//               </Button>
//               <Button className="bg-blue-500 hover:bg-blue-700 text-white">
//                 <Link to="/register">Signup</Link>
//               </Button>
//             </div>
//           )}
//           <DarkMode />
//         </div>
//       </div>

//       {/* Mobile Navbar */}
//       <div className="flex md:hidden items-center justify-between px-4 h-full">
//         <h1 className="font-extrabold text-2xl">SportXpert</h1>
//         <MobileNavbar user={authUser} handleLogout={handleLogout} />
//       </div>
//     </div>
//   );
// };

// export default Navbar;

// // ✅ User Dropdown Component
// const UserDropdown = ({ user, handleLogout }) => (
//   <DropdownMenu>
//     <DropdownMenuTrigger asChild>
//       <Avatar>
//         <AvatarImage src={user.avatar || "https://github.com/shadcn.png"} alt={user.name || "User"} />
//         <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
//       </Avatar>
//     </DropdownMenuTrigger>
//     <DropdownMenuContent className="w-56 mr-5">
//       <DropdownMenuLabel>My Account</DropdownMenuLabel>
//       <DropdownMenuSeparator />
//       <DropdownMenuGroup>
//         <DropdownMenuItem><Link to="/dashboard">Dashboard</Link></DropdownMenuItem>
//         <DropdownMenuItem><Link to="/profile">Edit Profile</Link></DropdownMenuItem>
//       </DropdownMenuGroup>
//       <DropdownMenuSeparator />
//       <DropdownMenuItem className="text-red-500 hover:bg-red-100 cursor-pointer" onClick={handleLogout}>
//         Logout
//       </DropdownMenuItem>
//     </DropdownMenuContent>
//   </DropdownMenu>
// );

// // ✅ Mobile Navbar Component
// const MobileNavbar = ({ user, handleLogout }) => {
//   const userRole = user?.role || ""; // Handle undefined role

//   return (
//     <Sheet>
//       <SheetTrigger asChild>
//         <Button size="icon" className="rounded-full hover:bg-gray-200" variant="outline">
//           <Menu />
//         </Button>
//       </SheetTrigger>
//       <SheetContent className="flex flex-col">
//         <SheetHeader className="flex flex-row items-center justify-between mt-2">
//           <SheetTitle>SportXpert</SheetTitle>
//           <DarkMode />
//         </SheetHeader>

//         {/* Mobile Nav Links */}
//         <nav className="flex flex-col space-y-1 mt-4">
//           <NavLink to="/">Home</NavLink>
//           <NavLink to="/about">About</NavLink>
//           <NavLink to="/contact">Contact Us</NavLink>
//           <NavLink to="/tournament">Tournament</NavLink>
//           {user && <NavLink to="/profile">Edit Profile</NavLink>}
//         </nav>

//         {userRole === 'instructor' && (
//           <SheetClose asChild>
//             <Button className="mt-4 w-full">Dashboard</Button>
//           </SheetClose>
//         )}

//         {/* Auth Actions */}
//         <div className="mt-4 flex flex-col space-y-1">
//           {user ? (
//             <p onClick={handleLogout} className="cursor-pointer text-red-500">Log out</p>
//           ) : (
//             <>
//               <Button variant="outline"><Link to="/login">Login</Link></Button>
//               <Button><Link to="/register">Signup</Link></Button>
//             </>
//           )}
//         </div>
//       </SheetContent>
//     </Sheet>
//   );
// };
