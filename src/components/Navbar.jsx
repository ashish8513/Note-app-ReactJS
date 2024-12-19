import React from "react";

const Header = () => {
  return (
    <header>
      <div className="max-w-5xl mt-4 mx-auto flex items-center justify-between p-4 rounded-full bg-gray-100 shadow-lg">
        <div className="flex items-center space-x-2">
          <img
            src="/logo.png" 
            alt="Logo"
            className="w-10 h-10"
          />
          <span className="text-yellow-400 font-bold text-lg">Varnav Infotech</span>
        </div>

        <nav className="hidden md:flex items-center space-x-8 text-white">
          <a href="/" className="hover:text-yellow-400 text-black transition">
            Home
          </a>
          <a href="/about" className="hover:text-yellow-400 text-black transition">
            About
          </a>
          <a href="/work" className="hover:text-yellow-400 text-black transition">
            Client Work
          </a>
          <a href="/contact" className="hover:text-yellow-400 text-black transition">
            Contact
          </a>
          <a href="/services" className="hover:text-yellow-400 text-black transition">
            Services
          </a>
        </nav>

        <div className="relative group">
          <img
            src="/avatar.png" 
            alt="Avatar"
            className="w-10 h-10 rounded-full border-2 border-green-500"
          />
          <div className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-sm rounded-md px-4 py-1 opacity-0 hover:duration-400 group-hover:opacity-100 transition-opacity">
             settings
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
