import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Edit, ExternalLink } from 'lucide-react';
import { Project } from '../../types/Project';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const formattedDate = new Date(project.updatedAt).toLocaleDateString();
  
  return (
    <div className="card flex flex-col h-full">
      <div className="relative h-40 bg-gray-200 rounded-md mb-4 overflow-hidden">
        {project.previewImage ? (
          <img 
            src={project.previewImage} 
            alt={project.name} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No preview available
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent" />
        <div className="absolute bottom-0 left-0 p-3 text-white">
          <h3 className="font-semibold">{project.name}</h3>
        </div>
      </div>
      
      <div className="flex-grow">
        <p className="text-gray-600 text-sm mb-4">{project.description || 'No description'}</p>
        
        <div className="flex items-center text-gray-500 text-sm mb-4">
          <Clock size={16} className="mr-1" />
          <span>Updated {formattedDate}</span>
        </div>
        
        <div className="flex items-center text-sm mb-4">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            project.status === 'completed' ? 'bg-green-100 text-green-800' :
            project.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {project.status === 'completed' ? 'Completed' : 
             project.status === 'in-progress' ? 'In Progress' : 
             'Draft'}
          </span>
        </div>
      </div>
      
      <div className="flex gap-2 mt-auto pt-4 border-t border-gray-100">
        <Link 
          to={`/projects/${project.id}/edit`}
          className="btn-outline flex-1 flex items-center justify-center"
        >
          <Edit size={16} className="mr-2" /> Edit
        </Link>
        {project.status === 'completed' && (
          <Link 
            to={`/projects/${project.id}/preview`}
            className="btn-primary flex-1 flex items-center justify-center"
          >
            <ExternalLink size={16} className="mr-2" /> Preview
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;