import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TasksState, TaskDetails } from '../types/TaskState.type';

const initialState: TasksState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<TaskDetails[]>) => {
      state.tasks = action.payload;
    },
    addTask: (state, action: PayloadAction<TaskDetails>) => {
      state.tasks.push(action.payload);
    },
    editTask: (state, action: PayloadAction<TaskDetails>) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
  },
});

export const { setTasks, addTask, editTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;
