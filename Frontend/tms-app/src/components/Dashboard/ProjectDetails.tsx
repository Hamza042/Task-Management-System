import React from 'react';

const ProjectDetailsCard: React.FC = () => {
  return (
    <div className="bg-darkGrey p-4 rounded-lg shadow text-lightPink max-w-72">
      <h2 className="text-lg font-bold mb-2">Project Details</h2>
      <p><strong>Project Name:</strong> Example Project</p>
      <p><strong>Description:</strong> This is a dummy project description.</p>
      <p><strong>Deadline:</strong> 31st December 2024</p>
    </div>
  );
};

export default ProjectDetailsCard;
