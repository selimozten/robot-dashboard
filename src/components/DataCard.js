import React from 'react';

const DataCard = ({ icon, title, value, unit }) => (
  <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
    {React.createElement(icon, { className: "h-8 w-8 text-blue-500 mb-2" })}
    <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
    <p className="text-white text-2xl font-bold">{value.toFixed(2)} {unit}</p>
  </div>
);

export default DataCard;