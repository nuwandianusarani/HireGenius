

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import image1 from "../assets/images/logopurple.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#2A2438] shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-6 px-6">
        {/* Logo Section */}
        <div className="flex items-center">
          <img src={image1} alt="HireGenius Logo" className="h-10 mr-3" />
          <span className="text-xl font-bold text-[#DBD8E3]">HireGenius</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 text-[#DBD8E3]">
          <a href="/" className="hover:text-[#5C5470] transition duration-300">Industries</a>
          <a href="/" className="hover:text-[#5C5470] transition duration-300">Solutions</a>
          <a href="/" className="hover:text-[#5C5470] transition duration-300">Customer Success</a>
          <a href="/" className="hover:text-[#5C5470] transition duration-300">Partners</a>
          <a href="/" className="hover:text-[#5C5470] transition duration-300">About</a>
          <button className="border border-[#DBD8E3] text-[#DBD8E3] rounded-md px-4 py-1 hover:bg-[#DBD8E3] hover:text-[#2A2438] transition duration-300">
            Book a Demo
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="text-[#DBD8E3] w-6 h-6" /> : <Menu className="text-[#DBD8E3] w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#352F44] text-[#DBD8E3] space-y-4 py-4 px-6">
          <a href="/" className="block hover:text-[#5C5470]">Industries</a>
          <a href="/" className="block hover:text-[#5C5470]">Solutions</a>
          <a href="/" className="block hover:text-[#5C5470]">Customer Success</a>
          <a href="/" className="block hover:text-[#5C5470]">Partners</a>
          <a href="/" className="block hover:text-[#5C5470]">About</a>
          <button className="w-full border border-[#DBD8E3] text-[#DBD8E3] rounded-md px-4 py-2 hover:bg-[#DBD8E3] hover:text-[#2A2438] transition duration-300">
            Book a Demo
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
