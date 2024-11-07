import React, { useState } from "react";
import { TaskDetails } from "../redux/types/TaskState.type";
import AdminTasksCard from "./AdminTasksCard";

interface FilterButtonProps {
  tasks: TaskDetails[];
  category: string;
  onDelete: (taskId: number) => void; // onDelete callback function
}

const FilterButton: React.FC<FilterButtonProps> = ({ tasks, category, onDelete }) => {
  const [filteredTasks, setFilteredTasks] = useState<TaskDetails[]>(tasks);

  const handleFilter = () => {
    if (category === "All") {
      setFilteredTasks(tasks);
    } else {
      const filtered = tasks.filter(task => task.category === category);
      setFilteredTasks(filtered);
    }
  };

  return (
    <div>
      <button onClick={handleFilter} className="bg-blue p-4 rounded-lg text-white hover:cursor-pointer hover:bg-MediumGrey">
        Filter: {category}
      </button>
      <div className="flex-grow overflow-y-auto">
        {filteredTasks.map((task: TaskDetails) => (
          <div key={task.id} className="mb-4">
            <AdminTasksCard task={task} onDelete={onDelete} /> {/* Pass onDelete to AdminTasksCard */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterButton;
