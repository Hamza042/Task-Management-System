import React from 'react';
import { TaskDetails } from '../../redux/types/TaskState.type';
import UserTasksCard from '../../components/UserTasksCard';

const DevelopmentTasksCard: React.FC<{ tasks: TaskDetails[] }> = ({ tasks }) => {
  const developmentTasks = tasks.filter(task => task.category === 'Development');

  const totalTasks = developmentTasks.length;
  const completedTasks = developmentTasks.filter(task => task.status === 'Completed').length;
  const progress = (completedTasks / totalTasks) * 100;

  return (
    <div className="bg-darkGrey text-white max-w-72 p-4 rounded-lg shadow">
      <h2 className="text-lg font-bold mb-2">Development Tasks</h2>
      <div className="mb-4">
        <div className="h-4 w-full bg-gray-200 rounded">
          <div
            className="h-4 bg-blue rounded"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-right text-sm">{Math.round(progress)}% completed</p>
      </div>
    </div>
  );
};

export default DevelopmentTasksCard;
