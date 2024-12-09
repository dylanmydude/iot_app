// src/Dashboard.js
import React from 'react';
import DashboardLayout from './DashboardLayout';
import TopBar from './TopBar';

const Dashboard = () => {
  return (
    <div className="flex h-screen w-screen bg-gradient-to-br from-gray-950 via-indigo-900 to-blue-950">
      {/* Sidebar */}
      <div className="w-1/6 flex flex-col p-4 backdrop-blur-md bg-white/10 border border-gray-800/20 shadow-md">
        <h2 className="text-5xl font-bold mb-9 text-white">Halvore</h2>
        <ul>
          <li className="mb-2">
            <a href="#" className="text-white">Dashboard (home)</a>
          </li>
          <li className="mb-2">
            <a href="#" className="text-white">Graphs</a>
          </li>
          <li className="mb-2">
            <a href="#" className="text-white">Vision AI</a>
          </li>
          <li className="mb-2">
            <a href="#" className="text-white">LLMs</a>
          </li>
          <li className="mb-2">
            <a href="#" className="text-white">Profile</a>
          </li>
          <li className="mb-2">
            <a href="#" className="text-white">Settings</a>
          </li>
          <li className="mb-2">
            <a href="#" className="text-white">Documentation</a>
          </li>
          <li className="mb-2">
            <a href="#" className="text-white">Logout</a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Top Bar */}
        <TopBar />

        {/* Content Area */}
        <div className="flex-1 p-4 overflow-y-auto flex flex-col min-h-0">
          <DashboardLayout />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
