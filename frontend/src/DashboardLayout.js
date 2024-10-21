// src/DashboardLayout.js
import React from 'react';

const DashboardLayout = () => {
  return (
    <div className="grid grid-cols-5 grid-rows-2 gap-6">
      {/* Left Section (spans 3 columns and 2 rows) */}
      <div className="col-span-3 row-span-2 grid grid-rows-2 grid-cols-3 gap-6">
        {/* Row 1: Three Square Cards */}
        <div className="bg-white rounded-lg shadow aspect-w-1 aspect-h-1">
          <div className="p-6">temp</div>
        </div>
        <div className="bg-white rounded-lg shadow aspect-w-1 aspect-h-1">
          <div className="p-6">rh</div>
        </div>
        <div className="bg-white rounded-lg shadow aspect-w-1 aspect-h-1">
          <div className="p-6">extra</div>
        </div>

        {/* Row 2: Graph Card spanning 3 columns */}
        <div className="col-span-3 bg-white rounded-lg shadow h-full">
          <div className="p-6">Graph</div>
        </div>
      </div>

      {/* Notifications Card (spans 2 columns and 2 rows) */}
      <div className="col-span-2 row-span-2 bg-white rounded-lg shadow h-full">
        <div className="h-full p-6">notifications</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
