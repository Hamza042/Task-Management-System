import React from 'react';
import { TaskDetails } from '../../redux/types/TaskState.type';
import UserTasksCard from '../../components/UserTasksCard';

const TestingTasksCard: React.FC<{ tasks: TaskDetails[] }> = ({ tasks }) => {
  const TestingTasks = tasks.filter(task => task.category === 'Testing');

  const totalTasks = TestingTasks.length;
  const completedTasks = TestingTasks.filter(task => task.status === 'Completed').length;
  const progress = (completedTasks / totalTasks) * 100;

  return (
    <div className="bg-darkGrey text-white max-w-72 p-4 rounded-lg shadow">
      <h2 className="text-lg font-bold mb-2">Testing Tasks</h2>
      <div className="mb-4">
        <div className="h-4 w-full bg-gray-200 rounded">
          <div
            className="h-4 bg-green rounded"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-right text-sm">{Math.round(progress)}% completed</p>
      </div>
    
    </div>
  );
};

export default TestingTasksCard;
