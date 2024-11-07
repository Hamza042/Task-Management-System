import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/AuthSlice';
import userReducer from './slices/UserSlice';
import tasksReducer from './slices/TasksSlice'
import { userApi } from './api/userApi';
import { authApi } from './api/authApi';
import { taskApi } from './api/tasksApi';

const preloadedState = {
    auth: {
      token: localStorage.getItem('token'),
      user: localStorage.getItem('user'),
      role: localStorage.getItem('role'),
    }
  };

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    tasks: tasksReducer,
    [userApi.reducerPath]: userApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [taskApi.reducerPath]: taskApi.reducer,
  },preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware, authApi.middleware, taskApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
