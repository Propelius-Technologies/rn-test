import { createSelector } from '@reduxjs/toolkit';
import { RootReduxState } from 'src/types/redux.types';

const selectUsersState = (state: RootReduxState) => state.users;

export const selectUser = createSelector(
  [selectUsersState],
  users => users.user,
);

export const selectChildren = createSelector(
  [selectUser],
  user => user.children,
);
