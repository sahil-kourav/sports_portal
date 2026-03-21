import { Link } from "react-router-dom";
import { Trophy, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-slate-900 text-gray-400 border-t border-gray-800">
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        
        {/* Brand */}
        <div className="flex flex-col gap-4 max-w-sm">
          <div className="flex items-center gap-2">
            <Trophy size={22} className="text-blue-500" />
            <span className="text-white font-semibold text-lg tracking-tight">
              SportXpert
            </span>
          </div>

          <p className="text-sm text-gray-500 leading-relaxed">
            India’s ultimate sports portal — where top tournaments, expert guidance,
            and a passionate community come together.
          </p>

          <div className="flex items-center gap-4 mt-2">
            {[Instagram, Twitter, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="hover:text-white transition-colors duration-200"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-4">
          <h4 className="text-white font-semibold text-sm uppercase tracking-wide">
            Quick Links
          </h4>

          <ul className="space-y-2 text-sm">
            {[
              { label: "Home", to: "/" },
              { label: "Tournaments", to: "/tournaments" },
              { label: "About Us", to: "/about-us" },
              { label: "Contact Us", to: "/contact-us" },
            ].map(({ label, to }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="hover:text-white transition-colors duration-200"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Featured Sports */}
        <div className="flex flex-col gap-4">
          <h4 className="text-white font-semibold text-sm uppercase tracking-wide">
            Featured Sports
          </h4>

          <ul className="space-y-2 text-sm">
            {["Cricket", "Football", "Tennis", "Badminton"].map((sport) => (
              <li key={sport}>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-200"
                >
                  {sport}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} SportXpert. All rights reserved.
          </p>
          <p className="text-gray-600">Built for athletes, by athletes ⚡</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;