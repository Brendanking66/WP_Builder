import React from 'react';

interface LayoutOption {
  value: string;
  label: string;
}

interface LayoutSelectorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: LayoutOption[];
}

const LayoutSelector: React.FC<LayoutSelectorProps> = ({
  label,
  value,
  onChange,
  options,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="grid grid-cols-2 gap-3">
        {options.map((option) => (
          <div
            key={option.value}
            className={`border rounded-md p-3 cursor-pointer transition-all ${
              value === option.value
                ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onClick={() => onChange(option.value)}
          >
            <div className="h-20 bg-gray-200 rounded mb-2 flex items-center justify-center text-xs text-gray-500">
              {option.value === 'standard' && (
                <div className="w-4/5 h-4/5 flex flex-col space-y-1">
                  <div className="h-2 bg-gray-300 rounded w-full"></div>
                  <div className="flex-grow flex space-x-1">
                    <div className="w-3/4 bg-gray-300 rounded"></div>
                    <div className="w-1/4 bg-gray-300 rounded"></div>
                  </div>
                </div>
              )}
              
              {option.value === 'modern' && (
                <div className="w-4/5 h-4/5 flex flex-col space-y-1">
                  <div className="h-2 bg-gray-300 rounded w-full"></div>
                  <div className="flex-grow grid grid-cols-3 gap-1">
                    <div className="col-span-2 bg-gray-300 rounded"></div>
                    <div className="bg-gray-300 rounded"></div>
                    <div className="bg-gray-300 rounded"></div>
                    <div className="col-span-2 bg-gray-300 rounded"></div>
                  </div>
                </div>
              )}
              
              {option.value === 'minimal' && (
                <div className="w-4/5 h-4/5 flex flex-col space-y-2">
                  <div className="h-2 bg-gray-300 rounded w-1/2 mx-auto"></div>
                  <div className="flex-grow bg-gray-300 rounded"></div>
                </div>
              )}
              
              {option.value === 'bold' && (
                <div className="w-4/5 h-4/5 flex flex-col space-y-1">
                  <div className="h-3 bg-gray-300 rounded w-full"></div>
                  <div className="flex-grow flex">
                    <div className="w-1/3 bg-gray-300 rounded-l"></div>
                    <div className="w-2/3 bg-gray-400 rounded-r"></div>
                  </div>
                </div>
              )}
            </div>
            <div className="text-center text-sm font-medium">
              {option.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LayoutSelector;