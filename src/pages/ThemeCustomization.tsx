import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Check, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

import ColorPicker from '../components/customization/ColorPicker';
import FontSelector from '../components/customization/FontSelector';
import LayoutSelector from '../components/customization/LayoutSelector';
import ThemePreview from '../components/customization/ThemePreview';
import { ThemeSettings } from '../types/Theme';

const initialTheme: ThemeSettings = {
  colors: {
    primary: '#3366CC',
    secondary: '#00A894',
    accent: '#FF7A45',
    text: '#333333',
    background: '#FFFFFF',
    lightBackground: '#F5F7FA',
  },
  fonts: {
    heading: 'Montserrat',
    body: 'Open Sans',
  },
  layout: 'standard',
  spacing: 'comfortable',
  borderRadius: 'medium',
  shadows: 'soft',
};

const ThemeCustomization: React.FC = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState<ThemeSettings>(initialTheme);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const handleColorChange = (key: string, value: string) => {
    setTheme({
      ...theme,
      colors: {
        ...theme.colors,
        [key]: value,
      },
    });
  };
  
  const handleFontChange = (key: string, value: string) => {
    setTheme({
      ...theme,
      fonts: {
        ...theme.fonts,
        [key]: value,
      },
    });
  };
  
  const handleLayoutChange = (layout: string) => {
    setTheme({
      ...theme,
      layout,
    });
  };
  
  const handleSpacingChange = (spacing: string) => {
    setTheme({
      ...theme,
      spacing,
    });
  };
  
  const handleBorderRadiusChange = (borderRadius: string) => {
    setTheme({
      ...theme,
      borderRadius,
    });
  };
  
  const handleShadowsChange = (shadows: string) => {
    setTheme({
      ...theme,
      shadows,
    });
  };
  
  const generateRandomTheme = () => {
    // Generate random primary color
    const hue = Math.floor(Math.random() * 360);
    const primary = `hsl(${hue}, 70%, 50%)`;
    
    // Generate complementary colors
    const secondaryHue = (hue + 180) % 360;
    const secondary = `hsl(${secondaryHue}, 60%, 45%)`;
    
    const accentHue = (hue + 90) % 360;
    const accent = `hsl(${accentHue}, 65%, 55%)`;
    
    setTheme({
      ...theme,
      colors: {
        ...theme.colors,
        primary,
        secondary,
        accent,
      },
    });
    
    toast.success('Random theme colors generated!');
  };
  
  const handleGenerateTheme = () => {
    setIsGenerating(true);
    
    // Simulate theme generation
    setTimeout(() => {
      setIsGenerating(false);
      toast.success('Theme generated successfully!');
    }, 2000);
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Customize Theme</h1>
        <p className="text-gray-600">
          Personalize your website's appearance with colors, fonts, and layout options.
        </p>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/3 flex-shrink-0 space-y-6">
          {/* Colors */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="subsection-title mb-4">Colors</h2>
            
            <div className="space-y-4">
              <ColorPicker
                label="Primary Color"
                color={theme.colors.primary}
                onChange={(value) => handleColorChange('primary', value)}
              />
              <ColorPicker
                label="Secondary Color"
                color={theme.colors.secondary}
                onChange={(value) => handleColorChange('secondary', value)}
              />
              <ColorPicker
                label="Accent Color"
                color={theme.colors.accent}
                onChange={(value) => handleColorChange('accent', value)}
              />
              <ColorPicker
                label="Text Color"
                color={theme.colors.text}
                onChange={(value) => handleColorChange('text', value)}
              />
              <ColorPicker
                label="Background Color"
                color={theme.colors.background}
                onChange={(value) => handleColorChange('background', value)}
              />
              <ColorPicker
                label="Light Background Color"
                color={theme.colors.lightBackground}
                onChange={(value) => handleColorChange('lightBackground', value)}
              />
              
              <button
                type="button"
                onClick={generateRandomTheme}
                className="btn-outline w-full flex items-center justify-center"
              >
                <RefreshCw size={16} className="mr-2" />
                Generate Random Colors
              </button>
            </div>
          </div>
          
          {/* Fonts */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="subsection-title mb-4">Typography</h2>
            
            <div className="space-y-4">
              <FontSelector
                label="Heading Font"
                font={theme.fonts.heading}
                onChange={(value) => handleFontChange('heading', value)}
              />
              <FontSelector
                label="Body Font"
                font={theme.fonts.body}
                onChange={(value) => handleFontChange('body', value)}
              />
            </div>
          </div>
          
          {/* Layout & Style */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="subsection-title mb-4">Layout & Style</h2>
            
            <div className="space-y-6">
              <LayoutSelector
                label="Layout Style"
                value={theme.layout}
                onChange={handleLayoutChange}
                options={[
                  { value: 'standard', label: 'Standard' },
                  { value: 'modern', label: 'Modern' },
                  { value: 'minimal', label: 'Minimal' },
                  { value: 'bold', label: 'Bold' },
                ]}
              />
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Spacing
                </label>
                <div className="flex gap-2">
                  {['compact', 'comfortable', 'spacious'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleSpacingChange(option)}
                      className={`flex-1 py-2 px-3 text-sm rounded-md border ${
                        theme.spacing === option
                          ? 'bg-blue-50 border-blue-500 text-blue-700'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                      {theme.spacing === option && <Check size={14} className="ml-1 inline" />}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Border Radius
                </label>
                <div className="flex gap-2">
                  {['none', 'small', 'medium', 'large'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleBorderRadiusChange(option)}
                      className={`flex-1 py-2 px-2 text-sm rounded-md border ${
                        theme.borderRadius === option
                          ? 'bg-blue-50 border-blue-500 text-blue-700'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                      {theme.borderRadius === option && <Check size={14} className="ml-1 inline" />}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Shadows
                </label>
                <div className="flex gap-2">
                  {['none', 'soft', 'medium', 'sharp'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleShadowsChange(option)}
                      className={`flex-1 py-2 px-2 text-sm rounded-md border ${
                        theme.shadows === option
                          ? 'bg-blue-50 border-blue-500 text-blue-700'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                      {theme.shadows === option && <Check size={14} className="ml-1 inline" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="subsection-title mb-0">Theme Preview</h2>
              <button
                type="button"
                onClick={handleGenerateTheme}
                className="btn-primary flex items-center"
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <RefreshCw size={16} className="mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <RefreshCw size={16} className="mr-2" />
                    Generate Theme
                  </>
                )}
              </button>
            </div>
            
            <ThemePreview theme={theme} />
          </div>
        </div>
      </div>
      
      <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between">
        <button
          type="button"
          onClick={() => navigate('/organize')}
          className="btn-outline"
        >
          Back
        </button>
        <button
          type="button"
          onClick={() => navigate('/preview')}
          className="btn-primary flex items-center"
        >
          Continue to Preview <ArrowRight size={18} className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default ThemeCustomization;