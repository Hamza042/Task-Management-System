import { TaskDetails } from "../redux/types/TaskState.type";

export const useApplyCategoryFilter = (tasks: TaskDetails[], category: string): TaskDetails[] => {
    if (category === "All") {
      return tasks;
    } else {
      return tasks.filter(task => task.category === category);
    }
  };