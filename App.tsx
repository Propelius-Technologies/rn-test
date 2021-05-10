import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { store } from 'src/redux/store';
import { ThemeProvider } from 'react-native-elements';
import MainNavigator from './src/navigation';
import { theme } from 'src/theme';
import { QueryClient, QueryClientProvider } from 'react-query';

// Create a client
const queryClient = new QueryClient();

const App = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <ThemeProvider theme={theme}>
            <StatusBar barStyle={'light-content'} animated translucent />
            <MainNavigator />
          </ThemeProvider>
        </SafeAreaProvider>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
