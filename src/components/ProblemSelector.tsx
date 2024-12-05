import React from 'react';
import { ChevronDown } from 'lucide-react';

interface Problem {
  id: string;
  number: string;
  title: string;
  titleCn: string;
}

const problems: Problem[] = [
  {
    id: '1',
    number: '27',
    title: 'Remove Element',
    titleCn: '移除元素'
  },
  {
    id: '2',
    number: '221',
    title: 'Maximal Square',
    titleCn: '最大正方形'
  },
  {
    id: '3',
    number: '188',
    title: 'Best Time to Buy and Sell Stock IV',
    titleCn: '买卖股票的最佳时机'
  }
];

interface ProblemSelectorProps {
  selectedProblem: Problem;
  onProblemChange: (problem: Problem) => void;
}

const ProblemSelector: React.FC<ProblemSelectorProps> = ({
  selectedProblem,
  onProblemChange
}) => {
  return (
    <div className="relative group">
      <button className="w-full px-4 py-2 text-left bg-white hover:bg-gray-50 flex items-center justify-between rounded-t-lg">
        <span className="font-medium">
          {selectedProblem.number}. {selectedProblem.title} ({selectedProblem.titleCn})
        </span>
        <ChevronDown className="w-4 h-4 text-gray-500" />
      </button>
      <div className="absolute hidden group-hover:block w-full bg-white border border-t-0 rounded-b-lg shadow-lg z-10">
        {problems.map(problem => (
          <button
            key={problem.id}
            className={`w-full px-4 py-2 text-left hover:bg-gray-50 ${
              problem.id === selectedProblem.id ? 'bg-blue-50' : ''
            }`}
            onClick={() => onProblemChange(problem)}
          >
            {problem.number}. {problem.title} ({problem.titleCn})
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProblemSelector;