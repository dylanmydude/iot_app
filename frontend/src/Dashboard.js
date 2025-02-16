// src/Dashboard.js
import React from 'react';
import { Link } from "react-router-dom";
import DashboardLayout from './DashboardLayout';
import TopBar from './TopBar';

const Dashboard = () => {
  return (
    <div className="flex h-screen w-screen bg-gradient-to-br from-[#010200] via-[#161a66] via-[#02040a] via-[#0c1e42] to-[#010200]">

      {/* Sidebar */}
      <div className="w-1/6 flex flex-col p-4 pt-10 backdrop-blur-md bg-black/20 border border-gray-800/20 shadow-md">
        <h2 className="text-6xl mb-9 text-white pl-4">Special</h2>
        <ul className="space-y-4 pl-4 text-xl">
          <li>
            <a href="#" className="text-white">Home</a>
          </li>
          <li>
            <a href="#" className="text-white">Timelines</a>
          </li>
          <li>
            <a href="#" className="text-white">Devices</a>
          </li>
          <li>
            <a href="#" className="text-white">Notifications</a>
          </li>
          <li>
            <a href="#" className="text-white"></a>
          </li>
          <li>
            <a href="#" className="text-white"></a>
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
