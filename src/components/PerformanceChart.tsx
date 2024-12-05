import React from 'react';

const PerformanceChart = () => {
  return (
    <div className="bg-white p-4 rounded-lg border">
      <div className="h-64 flex items-end space-x-2">
        {[15, 25, 45, 65, 85, 95, 75, 55, 35, 20].map((height, index) => (
          <div
            key={index}
            className="flex-1 bg-blue-500 opacity-80 hover:opacity-100 transition-opacity"
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
      <div className="flex justify-between mt-4 text-sm text-gray-500">
        <span>0ms</span>
        <span>1ms</span>
        <span>2ms</span>
        <span>3ms</span>
        <span>4ms</span>
        <span>5ms+</span>
      </div>
    </div>
  );
};

export default PerformanceChart;