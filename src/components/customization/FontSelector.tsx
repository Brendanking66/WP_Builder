import React from 'react';

interface FontSelectorProps {
  label: string;
  font: string;
  onChange: (font: string) => void;
}

const FontSelector: React.FC<FontSelectorProps> = ({ label, font, onChange }) => {
  const fonts = [
    'Arial',
    'Helvetica',
    'Roboto',
    'Open Sans',
    'Lato',
    'Montserrat',
    'Poppins',
    'Source Sans Pro',
    'Raleway',
    'Playfair Display',
    'Merriweather',
    'Georgia',
    'Times New Roman',
  ];
  
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <span className="text-xs text-gray-500">{font}</span>
      </div>
      <div className="relative">
        <select
          value={font}
          onChange={(e) => onChange(e.target.value)}
          className="input-field appearance-none pr-10"
          style={{ fontFamily: font }}
        >
          {fonts.map((f) => (
            <option key={f} value={f} style={{ fontFamily: f }}>
              {f}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
      <p className="mt-2 text-sm" style={{ fontFamily: font }}>
        This is sample text in {font}.
      </p>
    </div>
  );
};

export default FontSelector;