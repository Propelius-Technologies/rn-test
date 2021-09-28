import { combineReducers } from 'redux';
import { RootReduxState } from 'src/types/redux.types';
import global from 'src/redux/global/global.slice';

import users from 'src/redux/users/users.slice';
import settings from 'src/redux/settings/settings.slice';

const rootReducer = combineReducers<RootReduxState>({
  settings,
  global,
  users,
});

export default rootReducer;
