import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Code2 } from 'lucide-react';

const ExampleSolution = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div 
        className="border-b p-4 cursor-pointer hover:bg-gray-50"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-2">
          <Code2 className="w-5 h-5 text-gray-600" />
          <h3 className="font-semibold">Example Solution</h3>
          {isExpanded ? (
            <ChevronDown className="w-4 h-4 text-gray-600" />
          ) : (
            <ChevronRight className="w-4 h-4 text-gray-600" />
          )}
        </div>
      </div>
      {isExpanded && (
        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium text-gray-700">Solution 1: Two Pointers</h4>
            <pre className="bg-gray-50 p-4 rounded text-sm overflow-x-auto">
{`public int removeElement(int[] nums, int val) {
    int k = 0;
    for (int i = 0; i < nums.length; i++) {
        if (nums[i] != val) {
            nums[k] = nums[i];
            k++;
        }
    }
    return k;
}`}
            </pre>
            <div className="text-sm text-gray-600">
              <p className="font-medium">Time Complexity: O(n)</p>
              <p className="font-medium">Space Complexity: O(1)</p>
              <p className="mt-2">This solution uses the two-pointer technique where one pointer (k) keeps track of the position where we should place the next element that's not equal to val.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExampleSolution;