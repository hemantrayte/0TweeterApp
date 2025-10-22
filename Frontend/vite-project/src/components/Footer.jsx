import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-200 mt-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-600">
        {/* Left Section */}
        <div className="flex items-center gap-2 mb-3 sm:mb-0">
          <div className="w-8 h-8 bg-blue-500 text-white flex items-center justify-center rounded-full font-bold">
            T
          </div>
          <span className="font-semibold text-gray-800">Tweeter</span>
        </div>

        {/* Center Links */}
        <nav className="flex flex-wrap justify-center gap-4 mb-3 sm:mb-0">
          <Link to="/" className="hover:text-blue-500 transition-colors">
            Home
          </Link>
          <Link to="/about" className="hover:text-blue-500 transition-colors">
            About
          </Link>
          <Link to="/contact" className="hover:text-blue-500 transition-colors">
            Contact
          </Link>
          <Link to="/privacy" className="hover:text-blue-500 transition-colors">
            Privacy
          </Link>
        </nav>

        {/* Right Section */}
        <p className="text-xs text-gray-500 text-center sm:text-right">
          © {new Date().getFullYear()} Tweeter — All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
