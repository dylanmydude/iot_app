// src/TopBar.js
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';

const TopBar = () => (
  <div className="h-12 bg-white flex items-center justify-between px-4 shadow-md">
    {/* Left: Breadcrumbs */}
    <div className="text-sm text-gray-600">Home &gt; Dashboard</div>

    {/* Right: Search, Sign In, Settings */}
    <div className="flex items-center space-x-4">
      <div className="flex items-center bg-gray-100 rounded-md px-2">
        <SearchIcon className="text-gray-500" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none ml-2 text-sm"
        />
      </div>

      <button className="flex items-center text-gray-700 hover:text-gray-900 text-sm">
        <PeopleIcon className="mr-1" />
        Sign In
      </button>

      <button className="text-gray-700 hover:text-gray-900">
        <SettingsIcon />
      </button>
    </div>
  </div>
);

export default TopBar;
