

import React from 'react';

const Footer = () => {
  return (
    <footer className="relative bg-[#2A2438] text-[#DBD8E3]">
      <div className="absolute inset-x-0 top-0 h-64 bg-[#2A2438] rounded-b-full"></div>
      <div className="relative max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* Industries Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-[#DBD8E3]">Industries</h3>
          <ul className="space-y-2 text-[#DBD8E3] opacity-80 hover:opacity-100 transition">
            <li>Aerospace and Defense</li>
            <li>Energy Utilities and Resources</li>
            <li>Construction and Engineering</li>
            <li>Manufacturing</li>
            <li>Service Industries</li>
            <li>Telecommunications</li>
          </ul>
        </div>

        {/* Solutions Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-[#DBD8E3]">Solutions</h3>
          <ul className="space-y-2 text-[#DBD8E3] opacity-80 hover:opacity-100 transition">
            <li>HireGenius Cloud</li>
            <li>Enterprise Resource Planning</li>
            <li>Enterprise Asset Management</li>
            <li>Field Service Management</li>
          </ul>
        </div>

        {/* Company Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-[#DBD8E3]">Company</h3>
          <ul className="space-y-2 text-[#DBD8E3] opacity-80 hover:opacity-100 transition">
            <li>About Us</li>
            <li>Careers</li>
            <li>Contact Us</li>
            <li>News</li>
          </ul>
        </div>

        {/* Customers & Partners Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-[#DBD8E3]">Customers & Partners</h3>
          <ul className="space-y-2 text-[#DBD8E3] opacity-80 hover:opacity-100 transition">
            <li>Customer Stories</li>
            <li>Find a HireGenius Partner</li>
            <li>Become a Partner</li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="bg-[#352F44] text-sm py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="space-x-4 mb-4 md:mb-0">
            <a href="/" className="hover:text-[#DBD8E3] transition">Privacy</a>
            <a href="/" className="hover:text-[#DBD8E3] transition">Legal</a>
            <a href="/" className="hover:text-[#DBD8E3] transition">Modern Slavery Act</a>
            <a href="/" className="hover:text-[#DBD8E3] transition">Careers</a>
            <a href="/" className="hover:text-[#DBD8E3] transition">Gender Pay Gap Report</a>
            <a href="/" className="hover:text-[#DBD8E3] transition">Report a Concern</a>
            <a href="/" className="hover:text-[#DBD8E3] transition">Cookies Settings</a>
          </div>
          <div className="text-center md:text-right">
            &copy; {new Date().getFullYear()} HireGenius. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
