import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSocialsOpen, setIsSocialsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleSocials = () => {
    setIsSocialsOpen(!isSocialsOpen);
  };

  return (
    <>
      <div
        id="mobile-menu-backdrop"
        className={`fixed inset-0 bg-black/40 z-40 ${isSidebarOpen ? '' : 'hidden'}`}
        onClick={toggleSidebar}
      ></div>
      <header className="glass p-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <Link to="/">
            <img src="/assets/navbar/logo.png" alt="Esportive Logo" className="h-10 select-none pointer-events-none" />
          </Link>
        </div>
        <nav className="hidden lg:flex items-center space-x-6 font-bold text-gray-200">
          <a href="mailto:support@espotive.in" className="hover:text-red-400 transition">Contact Us</a>
          <a href="mailto:work@espotive.in" className="hover:text-red-400 transition">Work With Us</a>
          <div className="group relative">
            <button className="flex items-center gap-1 hover:text-red-400 transition focus:outline-none">
              Our Socials <i className="fas fa-chevron-down text-xs ml-1 mt-0.5"></i>
            </button>
            <ul className="absolute right-0 mt-2 py-3 px-4 bg-black/80 backdrop-blur-lg rounded-xl shadow-lg space-y-2 w-48 border border-red-900/20 hidden group-hover:block">
              <li><a href="#" className="block hover:text-red-400 text-sm">Instagram</a></li>
              <li><a href="#" className="block hover:text-red-400 text-sm">Discord</a></li>
              <li><a href="#" className="block hover:text-red-400 text-sm">YouTube</a></li>
              <li><a href="#" className="block hover:text-red-400 text-sm">X</a></li>
              <li><a href="#" className="block hover:text-red-400 text-sm">WhatsApp Channel</a></li>
            </ul>
          </div>
        </nav>
        <button id="menu-toggle" onClick={toggleSidebar} className="lg:hidden text-red-500 hover:text-red-400 text-2xl focus:outline-none flex-shrink-0">
          <i className="fas fa-bars"></i>
        </button>
      </header>
      <nav id="sidebar" className={`fixed inset-y-0 left-0 z-50 w-64 p-6 glass backdrop-blur-xl transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out flex flex-col space-y-6 lg:hidden`}>
        <div className="flex justify-between items-right">
          <span className="text-lg font-black text-red-500">Esportive</span>
          <button id="close-sidebar" onClick={toggleSidebar} className="text-gray-300 hover:text-white text-2xl">&times;</button>
        </div>
        <ul className="space-y-4 text-white font-medium">
          <li><a href="mailto:support@espotive.in" className="block hover:text-red-400 transition">Contact Us</a></li>
          <li><a href="mailto:work@espotive.in" className="block hover:text-red-400 transition">Work With Us</a></li>
          <li>
            <button id="socials-toggle" onClick={toggleSocials} className="flex justify-between items-center w-full text-left hover:text-red-400 transition">
              Our Socials <i className={`fas fa-chevron-down text-sm ${isSocialsOpen ? 'rotate-180' : ''}`}></i>
            </button>
            <ul id="social-links" className={`mt-2 space-y-2 ${isSocialsOpen ? '' : 'hidden'} pl-3`}>
              <li><a href="#" className="block hover:text-red-400">Instagram</a></li>
              <li><a href="#" className="block hover:text-red-400">Discord</a></li>
              <li><a href="#" className="block hover:text-red-400">YouTube</a></li>
              <li><a href="#" className="block hover:text-red-400">X</a></li>
              <li><a href="#" className="block hover:text-red-400">WhatsApp Channel</a></li>
            </ul>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;