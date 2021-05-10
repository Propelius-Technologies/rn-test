import { createSelector } from '@reduxjs/toolkit';
import { RootReduxState } from 'src/types/redux.types';

const selectSettings = (state: RootReduxState) => state.settings;

export const selectTest = createSelector(
  [selectSettings],
  settings => settings.test,
);
