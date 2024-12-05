import React from 'react';
import { ArrowLeft, Zap, HardDrive, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PerformanceChart from './PerformanceChart';
import SolutionViewer from './SolutionViewer';

const ComparisonPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <button
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Editor</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h1 className="text-2xl font-bold mb-6">Solution Performance Analysis</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-4">
                    <Zap className="w-5 h-5 text-yellow-500" />
                    <h2 className="text-lg font-semibold">Runtime Performance</h2>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">Your Solution: 2ms</p>
                    <p className="text-sm text-gray-600">Example Solution: 1ms</p>
                    <p className="text-sm font-medium text-blue-600">
                      Beats 85% of submissions
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-4">
                    <HardDrive className="w-5 h-5 text-purple-500" />
                    <h2 className="text-lg font-semibold">Memory Usage</h2>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">Your Solution: 42.1 MB</p>
                    <p className="text-sm text-gray-600">Example Solution: 41.8 MB</p>
                    <p className="text-sm font-medium text-blue-600">
                      Beats 92% of submissions
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Performance Distribution</h3>
                <PerformanceChart />
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Optimization Tips</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Consider using a two-pointer approach to reduce iterations</li>
                  <li>Minimize array copying operations</li>
                  <li>Avoid creating unnecessary temporary arrays</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <SolutionViewer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonPage;