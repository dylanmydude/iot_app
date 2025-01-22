import React from 'react';

const Timeline = ({ events = [] }) => {
    return (
        <div className="relative w-full h-16">
            {/* Horizontal Line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/50 -translate-y-1/2"></div>

            {/* Event Dots */}
            {events.map((event, index) => (
                <div
                    key={index}
                    className="absolute w-4 h-4 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 hover:scale-150 transition-transform duration-200"
                    style={{
                        left: `${event.position}%`,
                        top: '50%', 
                    }}
                    title={event.annotation}
                ></div>
            ))}
        </div>
    );
};

export default Timeline;
