import React from 'react';

interface ColorPickerProps {
  label: string;
  color: string;
  onChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ label, color, onChange }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <span className="text-xs text-gray-500">{color}</span>
      </div>
      <div className="flex items-center">
        <div 
          className="w-8 h-8 rounded-md mr-3 border border-gray-300" 
          style={{ backgroundColor: color }}
        />
        <input
          type="color"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className="hidden"
          id={`color-${label.replace(/\s+/g, '-').toLowerCase()}`}
        />
        <label 
          htmlFor={`color-${label.replace(/\s+/g, '-').toLowerCase()}`}
          className="btn-outline text-sm py-1 px-3 cursor-pointer"
        >
          Choose
        </label>
        <input
          type="text"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className="ml-2 flex-grow px-3 py-1 border border-gray-300 rounded-md text-sm"
          placeholder="#RRGGBB"
        />
      </div>
    </div>
  );
};

export default ColorPicker;