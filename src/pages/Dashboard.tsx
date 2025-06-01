import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, Palette, Layout, Download, Upload, Globe } from 'lucide-react';

import ProjectCard from '../components/dashboard/ProjectCard';
import { useProjects } from '../hooks/useProjects';

const Dashboard: React.FC = () => {
  const { projects, loading } = useProjects();
  
  const features = [
    {
      icon: <Upload size={24} />,
      title: 'Extract Data',
      description: 'Import data from Facebook, Google Business, or existing websites',
      link: '/extract',
    },
    {
      icon: <FileText size={24} />,
      title: 'Organize Content',
      description: 'Arrange and edit content for your website pages',
      link: '/organize',
    },
    {
      icon: <Palette size={24} />,
      title: 'Customize Theme',
      description: 'Personalize colors, fonts, and layouts',
      link: '/customize',
    },
    {
      icon: <Globe size={24} />,
      title: 'Preview Site',
      description: 'See how your website will look before exporting',
      link: '/preview',
    },
    {
      icon: <Download size={24} />,
      title: 'Export WordPress Files',
      description: 'Generate WordPress-ready files for your site',
      link: '/export',
    },
  ];
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">pressmatic.ai</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          AI-powered WordPress website builder that automates the creation of professional websites for small businesses in minutes.
        </p>
      </div>
      
      <div className="mb-12">
        <Link
          to="/extract"
          className="btn-primary inline-flex items-center text-lg justify-center w-full sm:w-auto"
        >
          Start New Project <ArrowRight className="ml-2" size={20} />
        </Link>
      </div>
      
      {/* Features */}
      <h2 className="section-title text-center mb-8">How It Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {features.map((feature, index) => (
          <div key={index} className="card group">
            <div className="text-blue-700 mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600 mb-4">{feature.description}</p>
            <Link 
              to={feature.link} 
              className="text-blue-700 font-medium inline-flex items-center group-hover:translate-x-1 transition-transform"
            >
              Get Started <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
        ))}
      </div>
      
      {/* Recent Projects */}
      <div className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="section-title mb-0">Recent Projects</h2>
          <Link to="/projects" className="text-blue-700 font-medium">View All</Link>
        </div>
        
        {loading ? (
          <div className="text-center py-12">Loading projects...</div>
        ) : projects && projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.slice(0, 3).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <Layout className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-xl font-medium text-gray-700 mb-2">No projects yet</h3>
            <p className="text-gray-500 mb-4">Start by creating your first project</p>
            <Link to="/extract" className="btn-primary">
              Create Project
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;