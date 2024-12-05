import React from 'react';

interface Problem {
  id: string;
  number: string;
  title: string;
  titleCn: string;
}

interface ProblemDescriptionProps {
  problem: Problem;
}

const ProblemDescription: React.FC<ProblemDescriptionProps> = ({ problem }) => {
  const descriptions: Record<string, React.ReactNode> = {
    '1': (
      <div className="space-y-4">
        <p className="text-gray-700">
          Given an integer array <code className="bg-gray-100 px-1 rounded">nums</code> and a value <code className="bg-gray-100 px-1 rounded">val</code>, remove all instances of that value in-place and return the new length.
        </p>
        <p className="text-gray-700">
          The order of elements can be changed. It doesn't matter what you leave beyond the new length.
        </p>
      </div>
    ),
    '2': (
      <div className="space-y-4">
        <p className="text-gray-700">
          Given an m x n binary matrix filled with 0's and 1's, find the largest square containing only 1's and return its area.
        </p>
      </div>
    ),
    '3': (
      <div className="space-y-4">
        <p className="text-gray-700">
          You are given an integer array prices where prices[i] is the price of a given stock on the ith day, and an integer k.
        </p>
        <p className="text-gray-700">
          Find the maximum profit you can achieve. You may complete at most k transactions.
        </p>
      </div>
    )
  };

  return (
    <div className="space-y-4">
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">Description:</h3>
        {descriptions[problem.id]}
      </div>
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">Constraints:</h3>
        <ul className="list-disc list-inside text-gray-600">
          <li>The relative order of the elements may be changed.</li>
          <li>Return the new length after removing the elements.</li>
        </ul>
      </div>
    </div>
  );
};

export default ProblemDescription;