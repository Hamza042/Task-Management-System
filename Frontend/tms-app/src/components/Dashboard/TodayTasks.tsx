import React from 'react';
import { TaskDetails } from '../../redux/types/TaskState.type';
import UserTasksCard from '../../components/UserTasksCard';

const TodayTasksCard: React.FC<{ tasks: TaskDetails[] }> = ({ tasks }) => {
  const today = new Date().toISOString().split('T')[0];

  const todayTasks = tasks.filter(task => {
    const taskDueDate = new Date(task.duedate).toISOString().split('T')[0];
    return taskDueDate === today;
  });

  return (
    <div className="bg-darkGrey p-4 rounded-lg shadow text-white max-w-72">
      <h2 className="text-lg font-bold mb-2">Today's Tasks</h2>
      {todayTasks.length > 0 ? (
        todayTasks.map(task => (
          <UserTasksCard key={task.id} task={task} />
        ))
      ) : (
        <p>No tasks due today.</p>
      )}
    </div>
  );
};

export default TodayTasksCard;
