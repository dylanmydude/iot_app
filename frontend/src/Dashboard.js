// src/Dashboard.js
import React from 'react';

const Dashboard = ({ children }) => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/6 h-screen bg-gray-800 text-white">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Dashboard</h2>
          <ul>
            <li className="mb-2"><a href="#" className="text-white">Home</a></li>
            <li className="mb-2"><a href="#" className="text-white">Profile</a></li>
            <li className="mb-2"><a href="#" className="text-white">Settings</a></li>
            <li className="mb-2"><a href="#" className="text-white">Logout</a></li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-3/4 h-screen bg-gray-100 p-8">
        {children}
      </div>
    </div>
  );
};

export default Dashboard;
