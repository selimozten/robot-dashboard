import React from 'react';

const StatusIndicator = ({ icon, title, status, color }) => (
  <div className="flex items-center space-x-2 bg-gray-800 p-3 rounded-lg">
    {React.createElement(icon, { className: `h-6 w-6 ${color}` })}
    <span className="text-gray-300 text-sm">{title}:</span>
    <span className={`font-medium ${status ? 'text-green-500' : 'text-red-500'}`}>
      {status ? 'Normal' : 'Alert'}
    </span>
  </div>
);

export default StatusIndicator;