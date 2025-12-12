import { Users } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-black text-gray-300 py-8 text-center">
      <div className="max-w-6xl mx-auto mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-sm px-4">
        <div className="flex flex-col items-center space-y-2">
          <Users size={30} />
          <p className="text-sm">&copy; 2025 SportXpert. All rights reserved.</p>
        </div>

        <div className="space-y-2 text-center sm:text-center">
          <h3 className="text-white font-semibold">Quick Links</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:text-gray-400">Home</a></li>
            <li><a href="#" className="hover:text-gray-400">Tournaments</a></li>
            <li><a href="#" className="hover:text-gray-400">About</a></li>
            <li><a href="#" className="hover:text-gray-400">Contact</a></li>
          </ul>
        </div>

        <div className="space-y-2 text-center sm:text-center">
          <h3 className="text-white font-semibold">Featured Sports</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:text-gray-400 ">Cricket</a></li>
            <li><a href="#" className="hover:text-gray-400">Football</a></li>
            <li><a href="#" className="hover:text-gray-400">Tennis</a></li>
            <li><a href="#" className="hover:text-gray-400">Other</a></li>
          </ul>
        </div>
      </div>
      <p className="mt-6 text-gray-500 text-sm px-4">Powered by <span className="text-white">SportXpert</span>⚡Bringing Sports to Life!</p>
    </footer>
  );
};

export default Footer;
