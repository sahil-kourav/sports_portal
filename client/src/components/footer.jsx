const Footer = () => {
  return (
    
    <footer className="w-full bg-gradient-to-r from-gray-900 to-black text-gray-300 py-12 px-6 bottom-0 left-0">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 text-center md:text-left">
        
        {/* Logo & Socials */}
        <div>
          <div className="flex justify-center md:justify-start items-center">
            <span className="text-5xl">🏆</span>
          </div>
          <p className="text-sm mt-3 opacity-75">&copy; 2025 TournamentHub, Inc.<br />All rights reserved.</p>
          <div className="flex justify-center md:justify-start mt-4 space-x-4">
            <a href="#" className="text-xl hover:text-yellow-400 transition"><i className="fab fa-facebook"></i></a>
            <a href="#" className="text-xl hover:text-yellow-400 transition"><i className="fab fa-twitter"></i></a>
            <a href="#" className="text-xl hover:text-yellow-400 transition"><i className="fab fa-instagram"></i></a>
            <a href="#" className="text-xl hover:text-yellow-400 transition"><i className="fab fa-youtube"></i></a>
          </div>
        </div>
        
        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-white text-lg mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-yellow-400 transition">Home</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition">Tournaments</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition">About</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition">Contact</a></li>
          </ul>
        </div>
        
        {/* Resources */}
        <div>
          <h3 className="font-semibold text-white text-lg mb-3">Resources</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-yellow-400 transition">Tournament Rules</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition">Player FAQs</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition">Organizer Tools</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition">Blog</a></li>
          </ul>
        </div>
        
        {/* Featured Sports */}
        <div>
          <h3 className="font-semibold text-white text-lg mb-3">Featured Sports</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-yellow-400 transition">Football</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition">Basketball</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition">Tennis</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition">Cricket</a></li>
          </ul>
        </div>
        
        {/* Partners */}
        <div>
          <h3 className="font-semibold text-white text-lg mb-3">Official Partners</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-yellow-400 transition">Nike</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition">Adidas</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition">Puma</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition">Under Armour</a></li>
          </ul>
        </div>
      </div>
      <div className="mt-10 text-center text-gray-500 text-sm w-full">
        Powered by <span className="text-yellow-400">TournamentHub</span> ⚡ Bringing Sports to Life!
      </div>
    </footer>
  );
};

export default Footer;
