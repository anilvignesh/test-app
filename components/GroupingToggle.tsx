'use client';

interface GroupingToggleProps {
  value: 'bank' | 'category';
  onChange: (value: 'bank' | 'category') => void;
}

export default function GroupingToggle({ value, onChange }: GroupingToggleProps) {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-gray-700 font-medium">Group by:</span>
      <div className="inline-flex rounded-lg border border-gray-300 overflow-hidden">
        <button
          onClick={() => onChange('bank')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            value === 'bank'
              ? 'bg-purple-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          Bank
        </button>
        <button
          onClick={() => onChange('category')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            value === 'category'
              ? 'bg-purple-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          Category
        </button>
      </div>
    </div>
  );
}
