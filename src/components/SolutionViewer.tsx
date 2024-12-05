import React, { useState } from 'react';
import { Code2 } from 'lucide-react';

interface Solution {
  language: string;
  code: string;
}

const solutions: Solution[] = [
  {
    language: 'Java',
    code: `class Solution {
    public int removeElement(int[] nums, int val) {
        int k = 0;
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] != val) {
                nums[k] = nums[i];
                k++;
            }
        }
        return k;
    }
}`
  },
  {
    language: 'Python',
    code: `class Solution:
    def removeElement(self, nums: List[int], val: int) -> int:
        k = 0
        for i in range(len(nums)):
            if nums[i] != val:
                nums[k] = nums[i]
                k += 1
        return k`
  },
  {
    language: 'C++',
    code: `class Solution {
public:
    int removeElement(vector<int>& nums, int val) {
        int k = 0;
        for (int i = 0; i < nums.size(); i++) {
            if (nums[i] != val) {
                nums[k] = nums[i];
                k++;
            }
        }
        return k;
    }
};`
  }
];

const SolutionViewer = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('Java');
  const [isEditing, setIsEditing] = useState(false);
  const [editableCode, setEditableCode] = useState(solutions[0].code);

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    setEditableCode(solutions.find(s => s.language === language)?.code || '');
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="border-b p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Code2 className="w-5 h-5 text-gray-600" />
            <h3 className="font-semibold">Example Solution</h3>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={selectedLanguage}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="bg-gray-50 border rounded-md px-2 py-1 text-sm"
            >
              {solutions.map(solution => (
                <option key={solution.language} value={solution.language}>
                  {solution.language}
                </option>
              ))}
            </select>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              {isEditing ? 'View Mode' : 'Edit Mode'}
            </button>
          </div>
        </div>
      </div>
      <div className="p-4">
        {isEditing ? (
          <textarea
            value={editableCode}
            onChange={(e) => setEditableCode(e.target.value)}
            className="w-full h-[300px] font-mono text-sm p-4 bg-gray-50 border rounded-md"
          />
        ) : (
          <pre className="bg-gray-50 p-4 rounded-md overflow-x-auto">
            <code className="text-sm font-mono">
              {editableCode}
            </code>
          </pre>
        )}
      </div>
    </div>
  );
};

export default SolutionViewer;