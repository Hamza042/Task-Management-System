import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TaskDetails } from '../types/TaskState.type';

export const taskApi = createApi({
  reducerPath: 'taskApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5068/api/' }),
  endpoints: (builder) => ({
    getTasksByUsername: builder.query<TaskDetails[], string>({
      query: (username) => `tasks/user/${username}`,
    }),
    getTaskById: builder.query<TaskDetails, number>({
      query: (id) => `tasks/${id}`,
    }),
    getAllTasks: builder.query<TaskDetails[], void>({
        query: () => `tasks`,
      }),
    createTask: builder.mutation ({
        query:(task)=>({
            url:'tasks',
            method: 'POST',
            body: task
        })
    }),
    updateTask: builder.mutation<TaskDetails, Partial<TaskDetails>>({
        query: (task) => ({
          url: `tasks/${task.id}`,
          method: 'PUT',
          body: task,
        }),
      }),
      deleteTask: builder.mutation<void, number>({
        query: (taskId) => ({
          url: `tasks/${taskId}`,
          method: 'DELETE',
        }),
      }),
  }),
});

export const { useGetTasksByUsernameQuery, useGetAllTasksQuery, useCreateTaskMutation, 
    useDeleteTaskMutation, useUpdateTaskMutation, useGetTaskByIdQuery
} = taskApi;
