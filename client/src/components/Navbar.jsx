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

const Navbar = () => {
  const user = true;
  return (
    <div className="h-20 dark:bg-[#020817] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10">
      {/* Desktop */}
      <div className="max-w-7xl mx-auto  hidden md:flex justify-between items-center gap-10 h-full">
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
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
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
                <DropdownMenuItem className="text-red-500 hover:bg-red-100"><Link to="/logout">Logout</Link></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-6">
              <Button variant="outline" className="hover:bg-blue-500 hover:text-white transition-all duration-300">
                <Link to="/login">Login</Link>
              </Button>
              <Button className="bg-blue-500 hover:bg-blue-700 transition-all duration-300 text-white">
                <Link to="/signup">Signup</Link>
              </Button>
            </div>
          )}
          <DarkMode />
        </div>
      </div>
      {/* Mobile device */}
      <div className="flex md:hidden items-center justify-between px-4 h-full">
        <h1 className="font-extrabold text-2xl">SportXpert</h1>
        <MobileNavbar />
      </div>
    </div>
  );
};

export default Navbar;

const MobileNavbar = () => {
  const role = 'instructor';
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
      </SheetContent>
    </Sheet>
  );
};