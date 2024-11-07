import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from '../types/UserState.type';

const initialState: UserState = {
  id: localStorage.getItem('userId'),
  username: null,
  email: null,
  profilePictureUrl: null,
  contactInformation: null,
  phoneNumber: null,
  teamId: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{id:string, username: string; email: string }>) => {
      state.id=action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      localStorage.setItem('userId', action.payload.id)
    },
    setUserProfile:(state, action: PayloadAction<UserState>)=>{
      state.profilePictureUrl=action.payload.profilePictureUrl;
      state.phoneNumber=action.payload.phoneNumber;
      state.teamId=action.payload.teamId
    },
    clearUser: (state) => {
      state.id=null;
      state.username = null;
      state.email = null;
      state.profilePictureUrl = null;
      state.contactInformation = null;
      state.phoneNumber = null;
      state.teamId = null;
      localStorage.removeItem('userId');
    },
  },
});

export const { setUser, clearUser, setUserProfile } = userSlice.actions;
export default userSlice.reducer;
