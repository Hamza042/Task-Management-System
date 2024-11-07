import React from "react";
import { TaskDetails } from "../redux/types/TaskState.type";
import { useDeleteTaskMutation } from "../redux/api/tasksApi";
import { useAppDispatch } from "../redux/hooks";
import { deleteTask } from "../redux/slices/TasksSlice";
import { useNavigate } from "react-router-dom";


type TasksCardProps= {
  task: TaskDetails;
  onDelete: (taskId: number) => void; 
}



const AdminTasksCard: React.FC<TasksCardProps> = ({ task,onDelete }) => {

  const navigate=useNavigate();
  const onEdit=(id: number)=>{
    navigate(`taskdetail/${id}`)
  }
  

   
  return (
    <div
      className="flex flex-row bg-MediumGrey p-4 items-center w-2/3 h-20 rounded-lg m-2 text-white text-lg
    justify-between"
    >
      <p className="">{task.name}</p>
      <div className="flex flex-row gap-2">
        <button className="p-4 bg-green rounded-lg hover:cursor-pointer min-w-28"
        onClick={()=>onEdit(task.id)}>
          Edit
        </button>
        <button
          className="p-4 bg-orange text-yellow hover:cursor-pointer rounded-lg min-w-28 "
        onClick={()=>onDelete(task.id)}
        >
          Delete
        </button>
        <p className="p-2 bg-lightPurple text-lightPink rounded-lg
            h-14 min-w-28 text-center m-auto">{task.status}</p>
      </div>
    </div>
  );
};

export default AdminTasksCard;
