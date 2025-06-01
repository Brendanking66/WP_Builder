import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Facebook, AtSign, Globe, Loader, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

import SourceCard from '../components/extraction/SourceCard';
import ProjectNameForm from '../components/extraction/ProjectNameForm';
import { ProjectSource } from '../types/Project';
import { CrawlResult } from '../lib/crawler';

const DataExtraction: React.FC = () => {
  const navigate = useNavigate();
  const [projectName, setProjectName] = useState('');
  const [sources, setSources] = useState<ProjectSource[]>([]);
  const [loading, setLoading] = useState<string | null>(null);
  const [extractedData, setExtractedData] = useState<Record<string, CrawlResult>>({});
  
  const handleAddSource = (sourceType: 'facebook' | 'google' | 'website') => {
    const newSource: ProjectSource = {
      id: Date.now().toString(),
      type: sourceType,
      url: '',
      credentials: sourceType !== 'website' ? { username: '', password: '' } : undefined,
      status: 'pending',
    };
    
    setSources([...sources, newSource]);
  };
  
  const handleUpdateSource = (id: string, data: Partial<ProjectSource>) => {
    setSources(
      sources.map((source) => (source.id === id ? { ...source, ...data } : source))
    );
  };
  
  const handleRemoveSource = (id: string) => {
    setSources(sources.filter((source) => source.id !== id));
    setExtractedData(({ [id]: _, ...rest }) => rest);
  };
  
  const handleExtractData = async (id: string, data?: CrawlResult) => {
    const source = sources.find((s) => s.id === id);
    if (!source || !source.url) return;
    
    setLoading(id);
    
    try {
      if (data) {
        setExtractedData(prev => ({ ...prev, [id]: data }));
        handleUpdateSource(id, { status: 'completed' });
        toast.success(`Data extracted from ${source.url} successfully!`);
      } else {
        // Handle Facebook and Google sources here
        await new Promise(resolve => setTimeout(resolve, 2000));
        handleUpdateSource(id, { status: 'completed' });
        toast.success(`Data extracted from ${source.type} successfully!`);
      }
    } catch (error) {
      console.error('Error extracting data:', error);
      handleUpdateSource(id, { status: 'failed' });
      toast.error(`Failed to extract data from ${source.url}`);
    } finally {
      setLoading(null);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!projectName.trim()) {
      toast.error('Please enter a project name');
      return;
    }
    
    if (sources.length === 0) {
      toast.error('Please add at least one data source');
      return;
    }
    
    const incomplete = sources.some((source) => !source.url);
    if (incomplete) {
      toast.error('Please fill in all source URLs');
      return;
    }
    
    // Save project with extracted data
    const projectData = {
      name: projectName,
      sources,
      extractedData,
    };
    
    console.log('Project data:', projectData);
    toast.success('Project created successfully!');
    navigate('/organize');
  };
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Extract Data</h1>
        <p className="text-gray-600">
          Import your business data from Facebook, Google Business, or an existing website.
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <ProjectNameForm 
          projectName={projectName}
          setProjectName={setProjectName}
        />
        
        <div>
          <h2 className="subsection-title">Data Sources</h2>
          <p className="text-gray-600 mb-4">
            Add one or more sources to extract data from. You can combine multiple sources to create a complete website.
          </p>
          
          <div className="space-y-4 mb-6">
            {sources.map((source) => (
              <SourceCard
                key={source.id}
                source={source}
                onUpdate={(data) => handleUpdateSource(source.id, data)}
                onRemove={() => handleRemoveSource(source.id)}
                onExtract={(data) => handleExtractData(source.id, data)}
                loading={loading === source.id}
              />
            ))}
          </div>
          
          {sources.length === 0 && (
            <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
              <p className="text-gray-500 mb-4">No data sources added yet</p>
            </div>
          )}
          
          <div className="flex flex-wrap gap-4 mt-6">
            <button
              type="button"
              onClick={() => handleAddSource('facebook')}
              className="btn-outline flex items-center"
            >
              <Facebook size={18} className="mr-2 text-blue-600" />
              Add Facebook Page
            </button>
            <button
              type="button"
              onClick={() => handleAddSource('google')}
              className="btn-outline flex items-center"
            >
              <AtSign size={18} className="mr-2 text-red-500" />
              Add Google Business
            </button>
            <button
              type="button"
              onClick={() => handleAddSource('website')}
              className="btn-outline flex items-center"
            >
              <Globe size={18} className="mr-2 text-green-600" />
              Add Website URL
            </button>
          </div>
        </div>
        
        <div className="pt-6 border-t border-gray-200 flex justify-between">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="btn-outline"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-primary flex items-center"
            disabled={loading !== null}
          >
            {loading !== null ? (
              <>
                <Loader size={20} className="mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                Continue to Content Organization <ArrowRight size={18} className="ml-2" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DataExtraction;