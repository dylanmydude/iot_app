// src/Timeline.js
import React from 'react';

const Timeline = ({ events = [] }) => {
  return (
    <div className="backdrop-blur-md bg-black/20 border border-gray-800/20 shadow-md rounded-lg col-span-5 row-span-1 p-4 relative flex items-center justify-center">
      {/* Top Label */}
      <div className="absolute top-2 text-white text-sm font-bold">
        Grow Room A
      </div>

      {/* Timeline Wrapper */}
      <div className="relative w-full h-8">
        {/* Horizontal Line */}
        <div className="absolute top-1/2 left-4 right-4 h-1 bg-white/50 -translate-y-1/2"></div>

        {/* Vertical Divider (Separating Past and Future) */}
        <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-white/50 -translate-x-1/2"></div>

        {/* Event Dots */}
        {events.map((event, index) => (
          <div
            key={index}
            className="absolute w-4 h-4 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 hover:scale-150 transition-transform duration-200"
            style={{
              left: `calc(${event.position}% + 4px)`, // Adjust dot alignment horizontally
              top: '50%', // Align dots to the horizontal line
            }}
            title={event.annotation}
          ></div>
        ))}
      </div>

      {/* Bottom Labels */}
      <div className="absolute bottom-2 w-full flex justify-between text-white text-xs px-4">
        <div>Past</div>
        <div>Future</div>
      </div>
    </div>
  );
};

export default Timeline;
