import { GlobalState } from 'src/types/global.types';
import { SettingsState } from 'src/types/settings.types';
import { Action, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import { UsersState } from 'src/types/users.types';

export interface RootReduxState {
  settings: SettingsState;
  global: GlobalState;
  users: UsersState;
}

export type AppDispatch = ThunkDispatch<
  RootReduxState,
  unknown,
  Action<string>
>;

export type AppThunk<T = Promise<void> | void> = ThunkAction<
  T,
  RootReduxState,
  unknown,
  Action<string>
>;
