import React from 'react';

import image1 from '../assets/images/recruitment-agency-logo-vector.jpg';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="flex items-center">
          <img
            src={image1}
            alt="IFS Logo"
            className="h-8 mr-4"
          />
          <span className="text-xl font-bold text-purple-600">HireGenius</span>
        </div>
        <div className="flex space-x-6 text-gray-600">
          <a href="#" className="hover:text-purple-600">Industries</a>
          <a href="#" className="hover:text-purple-600">Solutions</a>
          <a href="#" className="hover:text-purple-600">Customer Success</a>
          <a href="#" className="hover:text-purple-600">Partners</a>
          <a href="#" className="hover:text-purple-600">About</a>
          <button className="border border-purple-600 text-purple-600 rounded-md px-4 py-1 hover:bg-purple-600 hover:text-white">
            Book a demo
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
