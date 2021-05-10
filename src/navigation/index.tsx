import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeStack from './Home.stack';
import { clearErrors, clearSuccess } from 'src/redux/global/global.slice';
import Snackbar from 'react-native-snackbar';
import { useEffect } from 'react';
import { useTheme } from 'react-native-elements';
import { useSelector } from 'react-redux';
import {
  selectGlobalErrors,
  selectGlobalSuccess,
} from 'src/redux/global/global.selectors';
import { useAppDispatch } from 'src/hooks/useAppDispatch';

const MainNavigator: React.FC = () => {
  const dispatch = useAppDispatch();
  const { errors, errorMessage } = useSelector(selectGlobalErrors);
  const { success, successMessage } = useSelector(selectGlobalSuccess);
  const { theme } = useTheme();

  useEffect(() => {
    if (
      errors &&
      errors.errors?.findIndex(
        err => err.domain === 'global' || err.domain === 'nonFieldErrors',
      ) !== -1
    ) {
      Snackbar.show({
        text: errorMessage,
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: theme.colors.error,
        textColor: theme.colors.white,
        fontFamily: theme.fontFamily.medium,
      });

      dispatch(clearErrors());
    }
  }, [
    dispatch,
    errorMessage,
    errors,
    theme.colors.error,
    theme.colors.white,
    theme.fontFamily.medium,
  ]);

  useEffect(() => {
    if (success && successMessage) {
      Snackbar.show({
        text: successMessage,
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: theme.colors.grey5,
        textColor: theme.colors.black,
        fontFamily: theme.fontFamily.medium,
      });

      dispatch(clearSuccess());
    }
  }, [
    dispatch,
    success,
    successMessage,
    theme.colors.black,
    theme.colors.grey5,
    theme.fontFamily.medium,
  ]);

  return (
    <NavigationContainer>
      <HomeStack />
    </NavigationContainer>
  );
};

export default MainNavigator;
