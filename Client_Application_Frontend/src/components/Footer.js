import React from 'react';

const Footer = () => {
  return (
    <footer className="relative bg-purple-900 text-white">
      <div className="absolute inset-x-0 top-0 h-64 bg-purple-900 rounded-b-full"></div>
      <div className="relative max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-8">
        {/* Industries Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Industries</h3>
          <ul className="space-y-2">
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
          <h3 className="text-lg font-semibold mb-4">Solutions</h3>
          <ul className="space-y-2">
            <li>HireGenius Cloud</li>
            <li>Enterprise Resource Planning</li>
            <li>Enterprise Asset Management</li>
            <li>Field Service Management</li>
          </ul>
        </div>

        {/* Company Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Company</h3>
          <ul className="space-y-2">
            <li>About Us</li>
            <li>Careers</li>
            <li>Contact Us</li>
            <li>News</li>
          </ul>
        </div>

        {/* Customers & Partners Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Customers & Partners</h3>
          <ul className="space-y-2">
            <li>Customer Stories</li>
            <li>Find a HireGenius Partner</li>
            <li>Become a Partner</li>
          </ul>
        </div>
      </div>

      <div className="bg-purple-800 text-sm py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="space-x-4 mb-4 md:mb-0">
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Legal</a>
            <a href="#" className="hover:underline">Modern Slavery Act</a>
            <a href="#" className="hover:underline">Careers</a>
            <a href="#" className="hover:underline">Gender Pay Gap Report</a>
            <a href="#" className="hover:underline">Report a Concern</a>
            <a href="#" className="hover:underline">Cookies Settings</a>
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