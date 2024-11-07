import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useGetAllTasksQuery, useGetTasksByUsernameQuery } from '../../redux/api/tasksApi';
import { TaskDetails } from '../../redux/types/TaskState.type';
import { setTasks } from '../../redux/slices/TasksSlice';
import RoundChartCard from '../../components/Dashboard/RoundChart';
import CalendarCard from '../../components/Dashboard/Calendar/Calendar';



const UserDashboard: React.FC = () => {
  const currentUser=useAppSelector((state)=>state.auth.user)
  const dispatch = useAppDispatch();
  const { data: tasksData, error, isLoading } = useGetTasksByUsernameQuery(currentUser as string)
  const [tasks, setTasksLocal] = useState<TaskDetails[]>([]);

  useEffect(() => {
    if (tasksData) {
      setTasksLocal(tasksData);
      dispatch(setTasks(tasksData));
    }
  }, [tasksData, dispatch]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading tasks</div>;

  return (
    <div className='h-screen overflow-y-auto'>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 max-w-fit">
        <RoundChartCard tasks={tasks} />
        
        <CalendarCard />
         
       
      </div>
      <div className="mb-24"></div> {/* Increase margin to 4rem (16) for more space */}
    </div>
  );
};

export default UserDashboard;
