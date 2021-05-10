import { createSlice } from '@reduxjs/toolkit';
import { SettingsState } from 'src/types/settings.types';

const initialState: SettingsState = {
  test: false,
};

const settings = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleTest: (state: SettingsState) => {
      state.test = !state.test;
    },
  },
});

export const { toggleTest } = settings.actions;

export default settings.reducer;
