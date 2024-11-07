import React, { useState } from 'react';
import { TaskDetails } from '../../redux/types/TaskState.type';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const TaskCard: React.FC<{ title: string; value: number; color: string; isActive: boolean; onClick: () => void }> = ({ title, value, color, isActive, onClick }) => {
  const cardColor = isActive ? 'bg-blue' : 'bg-blue'; // Change color when active

  return (
    <div
      className={`flex flex-col justify-between items-center p-5  rounded-lg shadow flex-1 m-2  transition-all duration-300 transform hover:bg-gray-600 hover:scale-100 ${cardColor}`}
      onClick={onClick}
    >
      <h2 className="text-lg text-white hover:text-orange font-bold mb-2">{title}</h2>
      <ResponsiveContainer width="100%" height={50}>
        <PieChart>
          <Pie data={[{ name: title, value }]} dataKey="value" outerRadius={25} label>
            <Cell fill={color} />
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex justify-center mt-4 text-white font-semibold">{value} Tasks</div>
    </div>
  );
};

const RoundChartCard: React.FC<{ tasks: TaskDetails[] }> = ({ tasks }) => {
  const [activeCard, setActiveCard] = useState<string | null>(null); // State to track active card

  const taskStatuses = {
    completed: tasks.filter(task => task.status.trim().toLowerCase() === 'completed').length,
    inProgress: tasks.filter(task => task.status.trim().toLowerCase() === 'in progress').length,
    pending: tasks.filter(task => task.status.trim().toLowerCase() === 'pending').length,
  };

  const COLORS = ['orange', 'orange', 'orange'];

  return (
    <div className="flex flex-wrap justify-around">
      <TaskCard
        title="Completed"
        value={taskStatuses.completed}
        color={COLORS[0]}
        isActive={activeCard === 'Completed'}
        onClick={() => setActiveCard('Completed')}
      />
      <TaskCard
        title="In Progress"
        value={taskStatuses.inProgress}
        color={COLORS[1]}
        isActive={activeCard === 'In Progress'}
        onClick={() => setActiveCard('In Progress')}
      />
      <TaskCard
        title="Pending"
        value={taskStatuses.pending}
        color={COLORS[2]}
        isActive={activeCard === 'Pending'}
        onClick={() => setActiveCard('Pending')}
      />
    </div>
  );
};

export default RoundChartCard;
