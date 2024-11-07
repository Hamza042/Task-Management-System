import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from '../types/AuthState.type';

const initialState: AuthState = {
  user: null,
  token: null,
  role: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ token: string, user: string, role: string }>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.role = action.payload.role;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', action.payload.user);
      localStorage.setItem('role', action.payload.role);
    },
    clearCredentials: (state) => {
      state.token = null;
      state.user = null;
      state.role = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('role');
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;

export default authSlice.reducer;
