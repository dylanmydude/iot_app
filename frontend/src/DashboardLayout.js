// src/DashboardLayout.js
import React from 'react';

const DashboardLayout = () => {
  return (
    <div className="grid grid-cols-5 grid-rows-6 gap-4 p-0">
      {/* Left Section (spans 3 columns and 3 rows) */}
      <div className="col-span-3 row-span-3 grid grid-rows-3 grid-cols-3 gap-4">
        {/* Row 1: Three Cards with reduced height */}
        <div className="bg-white rounded-lg shadow aspect-w-2 aspect-h-1 p-2">
          <div className="p-2">temp</div>
        </div>
        <div className="bg-white rounded-lg shadow aspect-w-2 aspect-h-1 p-2">
          <div className="p-2">rh</div>
        </div>
        <div className="bg-white rounded-lg shadow aspect-w-2 aspect-h-1 p-2">
          <div className="p-2">extra</div>
        </div>

        {/* Graph Card spanning 3 columns and 2 rows */}
        <div className="col-span-3 row-span-2 bg-white rounded-lg shadow p-2">
          <div className="p-2">Graph</div>
        </div>
      </div>

      {/* Notifications Card (spans 2 columns and 3 rows) */}
      <div className="col-span-2 row-span-3 bg-white rounded-lg shadow p-2">
        <div className="h-full p-2">notifications</div>
      </div>

      {/* Timeline Card (spans all 5 columns) */}
      <div className="col-span-5 row-span-1 bg-white rounded-lg shadow p-2">
        <div className="p-2">Timeline</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
