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
<<<<<<< HEAD
                  <DropdownMenuItem>Dashboard</DropdownMenuItem>
                  <DropdownMenuItem><Link to="profile">Edit Profile</Link></DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-500 hover:bg-red-100"><Link to="/logout">Logout</Link></DropdownMenuItem>
=======
                  <DropdownMenuItem><Link to="dashboard">Dashboard</Link></DropdownMenuItem>
                  <DropdownMenuItem><Link to="profile">Edit Profile</Link></DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                  Log out
                </DropdownMenuItem>
>>>>>>> aman_br
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-6">
<<<<<<< HEAD
              <Button variant="outline" className="hover:bg-blue-500 hover:text-white transition-all duration-300">
                <Link to="/login">Login</Link>
              </Button>
              <Button className="bg-blue-500 hover:bg-blue-700 transition-all duration-300 text-white">
                <Link to="/signup">Signup</Link>
              </Button>
            </div>
          )}
          <DarkMode />
=======
              <Button variant="outline"><Link to="login">Login</Link></Button>
              <Button><Link to="signup">Signup</Link></Button>
            </div>
          )}
>>>>>>> aman_br
        </div>
      </div>
      {/* Mobile device */}
      <div className="flex md:hidden items-center justify-between px-4 h-full">
        <h1 className="font-extrabold text-2xl">SportXpert</h1>
        <MobileNavbar user={user} handleLogout={handleLogout} />
      </div>
    </div>
  );
};

export default Navbar;

const MobileNavbar = ({ user, handleLogout }) => {
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
<<<<<<< HEAD
          <DarkMode />
        </SheetHeader>
        <Separator className="mr-2" />

        <nav className="flex flex-col space-y-1">
          <Link to="/" className="dark:text-white hover:text-gray-500 px-3 py-2 rounded-md">Home</Link>
          <Link to="/about" className="dark:text-white hover:text-gray-500 px-3 py-2 rounded-md">About</Link>
          <Link to="/contact" className="dark:text-white hover:text-gray-500 px-3 py-2 rounded-md">Contact Us</Link>
          <Link to="/tournament" className="dark:text-white hover:text-gray-500 px-3 py-2 rounded-md">Tournament</Link>
          <Link to="/profile" className="dark:text-white hover:text-gray-500 px-3 py-2 rounded-md">Edit Profile</Link>
          <p className="text-red-600 hover:text-red-400 px-3 py-2 rounded-md cursor-pointer">Log out</p>
        </nav>
        {role === 'instructor' && (
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Dashboard</Button>
            </SheetClose>
          </SheetFooter>
        )}
=======
        </SheetHeader>
        <Separator className="mr-2" />
        <nav className="flex flex-col space-y-4">
          <span><Link to="dashboard">Dashboard</Link></span>
          <span><Link to="profile">Edit Profile</Link></span>
          {user ? (
            <p onClick={handleLogout} className="cursor-pointer text-red-500">Log out</p>
          ) : (
            <>
              <Button variant="outline"><Link to="login">Login</Link></Button>
              <Button><Link to="signup">Signup</Link></Button>
            </>
          )}
        </nav>
>>>>>>> aman_br
      </SheetContent>
    </Sheet>
  );
};