import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useGetTasksByUsernameQuery } from '../../redux/api/tasksApi';
import { setTasks } from '../../redux/slices/TasksSlice';
import { TaskDetails } from '../../redux/types/TaskState.type';
import UserTasksCard from '../../components/UserTasksCard';
import { useApplyCategoryFilter } from '../../hooks/Filter';
import { useNavigate } from 'react-router-dom';

const UserTasks: React.FC = () => {
  const currentUser = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [tasks, setTasksLocal] = useState<TaskDetails[]>([]);
  const navigate = useNavigate();
  const { data: tasksData, error, isLoading } = useGetTasksByUsernameQuery(currentUser as string);

  useEffect(() => {
    if (tasksData) {
      dispatch(setTasks(tasksData));
    }
  }, [tasksData, dispatch]);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  useEffect(() => {
    if (tasksData) {
      const filteredTasks = useApplyCategoryFilter(tasksData, selectedCategory);
      setTasksLocal(filteredTasks);
    }
  }, [tasksData, selectedCategory]);

  const handleTaskClick = (id: number) => {
    navigate(`taskdetail/${id}`);
  };

  const handleCreateTask = () => {
    navigate('/create-task'); // Navigate to the new task creation page
  };

  return (
    <div className="bg-white min-h-screen p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl text-gray font-bold">Your Tasks</h1>
        <button 
          onClick={handleCreateTask}
          className="bg-blue-600 text-gray py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
          Create New Task
        </button>
      </div>
      <div className="mb-4">
        <label className="text-gray mr-2">Filter by Category:</label>
        <select 
          value={selectedCategory} 
          onChange={handleCategoryChange} 
          className="p-2 border rounded-lg border-blue bg-gray-800 text-white"
        >
          <option value="All">All</option>
          <option value="Development">Development</option>
          <option value="Design">Design</option>
          <option value="Testing">Testing</option>
          <option value="Management">Management</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading && <div className="text-gray">Loading tasks...</div>}
        {error && <div className="text-red-500">Error fetching tasks</div>}
        {tasks.length === 0 && !isLoading && (
          <div className="text-gray">No tasks available.</div>
        )}
        {tasks.map((task: TaskDetails) => (
          <div key={task.id} onClick={() => handleTaskClick(task.id)}>
            <UserTasksCard task={task} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserTasks;
