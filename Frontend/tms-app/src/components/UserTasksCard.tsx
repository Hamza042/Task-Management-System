import React from "react";
import { TaskDetails } from "../redux/types/TaskState.type";

type UserTasksCardProps= {
  task: TaskDetails;
}

const UserTasksCard: React.FC<UserTasksCardProps> = ({ task }) => {
  return (
    <div
      className="flex flex-row bg-gray-200 p-4 items-center w-50 h-20 rounded-lg m-2 text-gray-500 text-lg
    justify-between hover:cursor-pointer"
    >
       
       <p className="">{task.name}</p>
      <div className="flex flex-row p-9 gap-2">
      
        <p className="p-2 bg-blue rounded-lg h-14 min-w-28 text-center m-auto">
          {task.category}
        </p>
        <p
          className="p-2 bg-gray-400 text-yellow rounded-lg
            h-14 min-w-28 text-center m-auto"
        >
          {new Date(task.duedate).toLocaleDateString()}
        </p>
        <p className="p-2 text-pink border-2 border-pink bg-gray-600 rounded-lg
            h-14 min-w-28 text-center m-auto">{task.priority}</p>
        <p className="p-2 bg-orange text-lightPink rounded-lg
            h-14 min-w-28 text-center m-auto">{task.status}</p>

<p className="p-2 bg-gray-600 text-lightPink rounded-lg
            h-14 min-w-28 text-center m-auto">Id: {task.id}</p>
      </div>
    </div>
  );
};

export default UserTasksCard;
