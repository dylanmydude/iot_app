// src/Dashboard.js
import React from 'react';
import DashboardLayout from './DashboardLayout';

const Dashboard = ({ children }) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/6 bg-gray-800 text-white">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Halvore</h2>
          <ul>
            <li className="mb-2"><a href="#" className="text-white">Dashboard (home)</a></li>
            <li className="mb-2"><a href="#" className="text-white">Graphs</a></li>
            <li className="mb-2"><a href="#" className="text-white">Vision AI</a></li>
            <li className="mb-2"><a href="#" className="text-white">LLMs</a></li>
            <li className="mb-2"><a href="#" className="text-white">Profile</a></li>
            <li className="mb-2"><a href="#" className="text-white">Settings</a></li>
            <li className="mb-2"><a href="#" className="text-white">Documentation</a></li>
            <li className="mb-2"><a href="#" className="text-white">Logout</a></li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="h-12 bg-white flex items-center px-6 shadow-md">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          {/* Add additional top bar items here */}
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-gray-100 p-8 overflow-y-auto">
          <DashboardLayout />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
