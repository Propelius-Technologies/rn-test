import { createSelector } from '@reduxjs/toolkit';
import { RootReduxState } from 'src/types/redux.types';

const selectUsersState = (state: RootReduxState) => state.users;

export const selectUsers = createSelector(
  [selectUsersState],
  users => users.users,
);
