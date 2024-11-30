import React from "react";

const ApplicationStatus = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center p-6">
      {/* Main Container */}
      <div className="w-full max-w-5xl bg-white shadow-md rounded-lg p-6">
        {/* Header Section */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">
            Associate Software Engineer - .NET (Portfolio Companies)
          </h1>
          <p className="text-sm text-gray-600 mt-1">IFS - Colombo, Sri Lanka</p>
          <div className="flex items-center space-x-6 mt-4">
            {/* Application Steps */}
            <div className="flex items-center text-green-600">
              <div className="w-6 h-6 border-2 border-green-600 rounded-full flex items-center justify-center">
                <span className="block w-3 h-3 bg-green-600 rounded-full"></span>
              </div>
              <span className="ml-2">New</span>
            </div>
            <div className="flex items-center text-gray-400">
              <div className="w-6 h-6 border-2 border-gray-400 rounded-full flex items-center justify-center">
                <span className="block w-3 h-3 bg-gray-400 rounded-full"></span>
              </div>
              <span className="ml-2">In Review</span>
            </div>
            <div className="flex items-center text-gray-400">
              <div className="w-6 h-6 border-2 border-gray-400 rounded-full flex items-center justify-center">
                <span className="block w-3 h-3 bg-gray-400 rounded-full"></span>
              </div>
              <span className="ml-2">Interview</span>
            </div>
            <div className="flex items-center text-gray-400">
              <div className="w-6 h-6 border-2 border-gray-400 rounded-full flex items-center justify-center">
                <span className="block w-3 h-3 bg-gray-400 rounded-full"></span>
              </div>
              <span className="ml-2">Offered</span>
            </div>
          </div>
        </div>

        {/* Job Details */}
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-4">Job Details</h2>
          <div className="text-sm text-gray-600">
            <p>
              IFS is a billion-dollar revenue company with 6000+ employees on
              all continents. Our leading AI technology is the backbone of our
              award-winning enterprise software solutions, enabling our
              customers to be their best when it really matters...
            </p>
            <p className="text-blue-500 cursor-pointer mt-2">Show more</p>
          </div>
        </div>
      </div>

      {/* Sidebar Section */}
      <div className="w-full max-w-xs bg-white shadow-md rounded-lg p-6 mt-6">
        {/* My Applications */}
        <h3 className="text-lg font-bold mb-4">My Applications</h3>
        <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
          <span className="text-sm text-gray-800">
            Associate Software Engineer - .NET
          </span>
          <span className="px-2 py-1 bg-yellow-200 text-yellow-600 text-xs font-semibold rounded">
            New
          </span>
        </div>

        {/* Resume */}
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-4">Resume</h3>
          <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-between">
            <span className="text-sm text-gray-800">
              Associate Software Engineer - Nalinka G.K..pdf
            </span>
            <div className="flex items-center space-x-2">
              <button className="text-blue-500 text-sm font-semibold">
                Upload
              </button>
              <button className="text-red-500 text-sm font-semibold">
                Delete
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            10MB size limit | Choose a file or drop it here
          </p>
        </div>
      </div>
    </div>
  );
};

export default ApplicationStatus;
