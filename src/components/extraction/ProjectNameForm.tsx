import React from 'react';

interface ProjectNameFormProps {
  projectName: string;
  setProjectName: (name: string) => void;
}

const ProjectNameForm: React.FC<ProjectNameFormProps> = ({ 
  projectName, 
  setProjectName 
}) => {
  return (
    <div>
      <h2 className="subsection-title">Project Information</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 mb-1">
            Project Name
          </label>
          <input
            type="text"
            id="projectName"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="My Business Website"
            className="input-field"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectNameForm;