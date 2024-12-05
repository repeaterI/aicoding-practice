import React from 'react';
import { TestTube } from 'lucide-react';

interface Problem {
  id: string;
  number: string;
  title: string;
  titleCn: string;
}

interface TestCasesProps {
  problem: Problem;
}

const TestCases: React.FC<TestCasesProps> = ({ problem }) => {
  const testCases: Record<string, React.ReactNode> = {
    '1': (
      <div className="space-y-2">
        <div className="flex space-x-4">
          <div className="flex-1">
            <p className="text-sm text-gray-600">Input:</p>
            <pre className="bg-gray-50 p-2 rounded text-sm">
nums = [3,2,2,3]
val = 3</pre>
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-600">Expected Output:</p>
            <pre className="bg-gray-50 p-2 rounded text-sm">2, nums = [2,2,_,_]</pre>
          </div>
        </div>
        <p className="text-sm text-gray-600">
          Explanation: Your function should return k = 2, with the first two elements of nums being 2.
        </p>
      </div>
    ),
    '2': (
      <div className="space-y-2">
        <div className="flex space-x-4">
          <div className="flex-1">
            <p className="text-sm text-gray-600">Input:</p>
            <pre className="bg-gray-50 p-2 rounded text-sm">
matrix = [
  ["1","0","1","0","0"],
  ["1","0","1","1","1"],
  ["1","1","1","1","1"],
  ["1","0","0","1","0"]
]</pre>
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-600">Expected Output:</p>
            <pre className="bg-gray-50 p-2 rounded text-sm">4</pre>
          </div>
        </div>
      </div>
    ),
    '3': (
      <div className="space-y-2">
        <div className="flex space-x-4">
          <div className="flex-1">
            <p className="text-sm text-gray-600">Input:</p>
            <pre className="bg-gray-50 p-2 rounded text-sm">
k = 2
prices = [2,4,1]</pre>
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-600">Expected Output:</p>
            <pre className="bg-gray-50 p-2 rounded text-sm">2</pre>
          </div>
        </div>
        <p className="text-sm text-gray-600">
          Explanation: Buy on day 1 (price = 2) and sell on day 2 (price = 4), profit = 4-2 = 2.
        </p>
      </div>
    )
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex items-center space-x-2 mb-4">
        <TestTube className="w-5 h-5 text-gray-600" />
        <h3 className="font-semibold">Test Cases</h3>
      </div>
      {testCases[problem.id]}
    </div>
  );
};

export default TestCases;