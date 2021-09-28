import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UsersState } from 'src/types/users.types';

const initialState: UsersState = {
  users: [],
};

const users = createSlice({
  name: 'users',
  initialState,
  reducers: {
    registerUser: (state: UsersState, { payload }: PayloadAction<User>) => {
      state.users = [...state.users, payload];
    },
    createChild: (state: UsersState, {}: PayloadAction<any>) => {
      state.users;
    },
    deleteChild: (state: UsersState, {}: PayloadAction<any>) => {
      state.users;
    },
    createCard: (state: UsersState, {}: PayloadAction<any>) => {
      state.users;
    },
  },
});

export const { registerUser } = users.actions;

export default users.reducer;
