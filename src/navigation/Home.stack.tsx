import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home.screen';
import CardsScreen from 'src/screens/Cards.screen';
import AddCardScreen from 'src/screens/AddCard.screen';
import AddChildScreen from 'src/screens/AddChild.screen';
import RegisterScreen from 'src/screens/Register.screen';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="AddChild" component={AddChildScreen} />
      <Stack.Screen name="Cards" component={CardsScreen} />
      <Stack.Screen name="AddCard" component={AddCardScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
