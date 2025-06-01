import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Smartphone, Tablet, Monitor, RefreshCw, ArrowUpDown } from 'lucide-react';

const Preview: React.FC = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate preview loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const getPreviewWidth = () => {
    switch (viewMode) {
      case 'desktop':
        return '100%';
      case 'tablet':
        return '768px';
      case 'mobile':
        return '375px';
      default:
        return '100%';
    }
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Preview Website</h1>
        <p className="text-gray-600">
          See how your website will look before exporting to WordPress.
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => setViewMode('desktop')}
              className={`p-2 rounded-md ${
                viewMode === 'desktop'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
              title="Desktop view"
            >
              <Monitor size={20} />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('tablet')}
              className={`p-2 rounded-md ${
                viewMode === 'tablet'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
              title="Tablet view"
            >
              <Tablet size={20} />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('mobile')}
              className={`p-2 rounded-md ${
                viewMode === 'mobile'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
              title="Mobile view"
            >
              <Smartphone size={20} />
            </button>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              type="button"
              className="btn-outline flex items-center py-1 px-3 text-sm"
              onClick={() => setIsLoading(true)}
            >
              <RefreshCw size={16} className="mr-1" /> Refresh
            </button>
            <button
              type="button"
              className="btn-outline flex items-center py-1 px-3 text-sm"
            >
              <ArrowUpDown size={16} className="mr-1" /> Switch Pages
            </button>
          </div>
        </div>
        
        <div 
          className="border border-gray-300 rounded-md overflow-hidden mx-auto transition-all duration-300"
          style={{ 
            width: getPreviewWidth(),
            height: '600px',
          }}
        >
          {isLoading ? (
            <div className="h-full flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <RefreshCw size={32} className="animate-spin text-blue-500 mx-auto mb-4" />
                <p className="text-gray-500">Loading preview...</p>
              </div>
            </div>
          ) : (
            <div className="h-full bg-white">
              {/* Simulated website preview */}
              <div className="bg-blue-700 text-white p-4 flex items-center justify-between">
                <div className="font-bold text-xl">Business Name</div>
                <div className="hidden md:flex space-x-6">
                  <a href="#" className="hover:underline">Home</a>
                  <a href="#" className="hover:underline">About</a>
                  <a href="#" className="hover:underline">Services</a>
                  <a href="#" className="hover:underline">Contact</a>
                </div>
                <div className="md:hidden">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-600 to-teal-500 text-white text-center py-20 px-4">
                <h1 className="text-4xl font-bold mb-4">Welcome to Our Business</h1>
                <p className="text-xl mb-8">Your trusted partner for quality services</p>
                <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-md">
                  Learn More
                </button>
              </div>
              
              <div className="py-16 px-4 max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-blue-700 text-center mb-12">Our Services</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-gray-50 p-6 rounded-lg shadow-md">
                      <div className="w-12 h-12 bg-blue-700 rounded-full mb-4"></div>
                      <h3 className="text-xl font-bold mb-2">Service {i}</h3>
                      <p className="text-gray-600">
                        This is a description of the service that your business provides to customers.
                      </p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-16 bg-gray-50 p-8 rounded-lg shadow-md">
                  <h2 className="text-3xl font-bold text-blue-700 mb-6">About Us</h2>
                  <p className="mb-4 text-gray-600">
                    We are a dedicated team of professionals committed to providing the highest quality services to our clients. 
                    With years of experience in the industry, we have built a reputation for excellence and reliability.
                  </p>
                  <div className="w-16 h-1 bg-blue-700 mb-4"></div>
                  <p className="text-gray-600">
                    Our mission is to deliver innovative solutions that help our clients achieve their goals and overcome challenges.
                  </p>
                </div>
              </div>
              
              <div className="bg-gray-800 text-white py-8 px-4 text-center">
                <p>© 2025 Business Name. All rights reserved.</p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between">
        <button
          type="button"
          onClick={() => navigate('/customize')}
          className="btn-outline"
        >
          Back
        </button>
        <button
          type="button"
          onClick={() => navigate('/export')}
          className="btn-primary flex items-center"
        >
          Continue to Export <ArrowRight size={18} className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default Preview;