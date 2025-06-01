import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Download, FileText, Code, Settings, RefreshCw, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

const Export: React.FC = () => {
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [exportOptions, setExportOptions] = useState({
    includePlugins: true,
    includeDemo: true,
    optimizeMedia: true,
    includeReadme: true,
  });
  
  const handleOptionChange = (option: string, value: boolean) => {
    setExportOptions({
      ...exportOptions,
      [option]: value,
    });
  };
  
  const handleGenerate = () => {
    setIsGenerating(true);
    
    // Simulate export generation
    setTimeout(() => {
      setIsGenerating(false);
      setIsGenerated(true);
      toast.success('WordPress export generated successfully!');
    }, 3000);
  };
  
  const handleDownload = (type: string) => {
    toast.success(`${type} downloaded successfully!`);
  };
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Export WordPress Files</h1>
        <p className="text-gray-600">
          Generate WordPress-ready files for your website and download everything you need.
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="subsection-title mb-4">Export Options</h2>
        
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="includePlugins"
                name="includePlugins"
                type="checkbox"
                checked={exportOptions.includePlugins}
                onChange={(e) => handleOptionChange('includePlugins', e.target.checked)}
                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="includePlugins" className="font-medium text-gray-700">
                Include Recommended Plugins
              </label>
              <p className="text-gray-500">
                Include essential plugins for your website (Contact Form 7, Yoast SEO, etc.)
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="includeDemo"
                name="includeDemo"
                type="checkbox"
                checked={exportOptions.includeDemo}
                onChange={(e) => handleOptionChange('includeDemo', e.target.checked)}
                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="includeDemo" className="font-medium text-gray-700">
                Include Demo Content
              </label>
              <p className="text-gray-500">
                Include demo content to help you get started quickly
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="optimizeMedia"
                name="optimizeMedia"
                type="checkbox"
                checked={exportOptions.optimizeMedia}
                onChange={(e) => handleOptionChange('optimizeMedia', e.target.checked)}
                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="optimizeMedia" className="font-medium text-gray-700">
                Optimize Media Files
              </label>
              <p className="text-gray-500">
                Compress and optimize images for better performance
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="includeReadme"
                name="includeReadme"
                type="checkbox"
                checked={exportOptions.includeReadme}
                onChange={(e) => handleOptionChange('includeReadme', e.target.checked)}
                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="includeReadme" className="font-medium text-gray-700">
                Include Documentation
              </label>
              <p className="text-gray-500">
                Generate setup instructions and documentation
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <button
            type="button"
            onClick={handleGenerate}
            className="btn-primary flex items-center"
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <RefreshCw size={18} className="mr-2 animate-spin" />
                Generating Files...
              </>
            ) : (
              <>
                {isGenerated ? (
                  <>
                    <Check size={18} className="mr-2" />
                    Regenerate Files
                  </>
                ) : (
                  <>
                    <ArrowRight size={18} className="mr-2" />
                    Generate WordPress Files
                  </>
                )}
              </>
            )}
          </button>
        </div>
      </div>
      
      {isGenerated && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="subsection-title mb-4">Download Files</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-md p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <FileText className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">WordPress Export</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    XML file containing all website content
                  </p>
                  <button
                    type="button"
                    onClick={() => handleDownload('WordPress Export')}
                    className="mt-3 btn-primary text-sm py-1 px-3 flex items-center"
                  >
                    <Download size={14} className="mr-1" />
                    Download XML
                  </button>
                </div>
              </div>
            </div>
            
            <div className="border rounded-md p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Code className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Theme Files</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Custom WordPress theme for your website
                  </p>
                  <button
                    type="button"
                    onClick={() => handleDownload('Theme Files')}
                    className="mt-3 btn-primary text-sm py-1 px-3 flex items-center"
                  >
                    <Download size={14} className="mr-1" />
                    Download ZIP
                  </button>
                </div>
              </div>
            </div>
            
            <div className="border rounded-md p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Settings className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Plugin Package</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Recommended plugins for your website
                  </p>
                  <button
                    type="button"
                    onClick={() => handleDownload('Plugin Package')}
                    className="mt-3 btn-primary text-sm py-1 px-3 flex items-center"
                  >
                    <Download size={14} className="mr-1" />
                    Download ZIP
                  </button>
                </div>
              </div>
            </div>
            
            <div className="border rounded-md p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <FileText className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Documentation</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Setup instructions and documentation
                  </p>
                  <button
                    type="button"
                    onClick={() => handleDownload('Documentation')}
                    className="mt-3 btn-primary text-sm py-1 px-3 flex items-center"
                  >
                    <Download size={14} className="mr-1" />
                    Download PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-md">
            <h3 className="font-medium text-blue-800 mb-2">Next Steps</h3>
            <ol className="list-decimal list-inside text-blue-700 space-y-1">
              <li>Download all the files above</li>
              <li>Log in to your WordPress admin panel</li>
              <li>Go to Appearance → Themes → Add New → Upload Theme</li>
              <li>Upload the theme ZIP file</li>
              <li>Go to Tools → Import → WordPress → Run Importer</li>
              <li>Upload the XML file</li>
              <li>Install and activate recommended plugins</li>
            </ol>
          </div>
        </div>
      )}
      
      <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between">
        <button
          type="button"
          onClick={() => navigate('/preview')}
          className="btn-outline"
        >
          Back
        </button>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="btn-primary"
        >
          Finish
        </button>
      </div>
    </div>
  );
};

export default Export;