// src/TopBar.js
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';

const TopBar = () => (
  <div className="h-12 backdrop-blur-md bg-black/20 border border-gray-800/20 shadow-md flex items-center justify-between px-4">
    {/* Left: Breadcrumbs */}
    <div className="text-sm text-gray-400">Home / Dashboard</div>

    {/* Right: Search, Sign In, Settings */}
    <div className="flex items-center space-x-4">
      <div className="flex items-center bg-gray-600/30 rounded-full px-4 py-1">
        <SearchIcon className="text-gray-400" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none ml-2 text-sm text-gray-400 placeholder-gray-400 "
        />
      </div>

      <button className="flex items-center text-gray-400 hover:text-gray-300 text-sm">
        <PeopleIcon className="mr-1" />
        Sign In
      </button>

      <button className="text-gray-400 hover:text-gray-300">
        <SettingsIcon />
      </button>
    </div>
  </div>
);

export default TopBar;
