// src/TopBar.js
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';

const TopBar = () => (
  <div className="h-12 backdrop-blur-md bg-white/10 border border-gray-800/20 shadow-md flex items-center justify-between px-4">
    {/* Left: Breadcrumbs */}
    <div className="text-sm text-white">Home &gt; Dashboard</div>

    {/* Right: Search, Sign In, Settings */}
    <div className="flex items-center space-x-4">
      <div className="flex items-center bg-gray-800/50 rounded-md px-2">
        <SearchIcon className="text-gray-400" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none ml-2 text-sm text-white placeholder-gray-400"
        />
      </div>

      <button className="flex items-center text-white hover:text-gray-200 text-sm">
        <PeopleIcon className="mr-1" />
        Sign In
      </button>

      <button className="text-white hover:text-gray-200">
        <SettingsIcon />
      </button>
    </div>
  </div>
);

export default TopBar;
