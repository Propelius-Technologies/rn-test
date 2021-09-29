import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UsersState } from 'src/types/users.types';

const initialState: UsersState = {
  user: null,
};

const users = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser: (state: UsersState, { payload }: PayloadAction<User>) => {
      state.user = payload;
    },
    createChild: (state: UsersState, {}: PayloadAction<any>) => {
      state.user;
    },
    deleteChild: (state: UsersState, {}: PayloadAction<any>) => {
      state.user;
    },
    createCard: (state: UsersState, {}: PayloadAction<any>) => {
      state.user;
    },
  },
});

export const { setUser } = users.actions;

export default users.reducer;
