import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import ProblemDescription from './ProblemDescription';
import TestCases from './TestCases';
import ProblemSelector from './ProblemSelector';

interface Problem {
  id: string;
  number: string;
  title: string;
  titleCn: string;
}

const ProblemArea: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedProblem, setSelectedProblem] = useState<Problem>({
    id: '1',
    number: '27',
    title: 'Remove Element',
    titleCn: '移除元素'
  });

  return (
    <div className="h-full flex flex-col bg-white rounded-lg shadow-md">
      <ProblemSelector
        selectedProblem={selectedProblem}
        onProblemChange={setSelectedProblem}
      />
      
      <div className={`flex-1 overflow-auto transition-all duration-300 ${
        isExpanded ? 'max-h-full' : 'max-h-0'
      }`}>
        <div className="p-4 space-y-4">
          <ProblemDescription problem={selectedProblem} />
          <TestCases problem={selectedProblem} />
        </div>
      </div>
      
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-2 w-full border-t flex items-center justify-center text-gray-500 hover:bg-gray-50"
      >
        {isExpanded ? (
          <>
            <ChevronUp className="w-4 h-4 mr-1" />
            <span>Collapse</span>
          </>
        ) : (
          <>
            <ChevronDown className="w-4 h-4 mr-1" />
            <span>Expand</span>
          </>
        )}
      </button>
    </div>
  );
};

export default ProblemArea;