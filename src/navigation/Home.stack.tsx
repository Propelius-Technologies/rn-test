import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home.screen';
import CardsScreen from 'src/screens/Cards.screen';
import AddCardScreen from 'src/screens/AddCard.screen';
import AddChildScreen from 'src/screens/AddChild.screen';
import RegisterScreen from 'src/screens/Register.screen';
import LoginScreen from 'src/screens/Login.screen';
import UpdateCardScreen from 'src/screens/UpdateCard.screen';
import MakeAPurchaseScreenScreen from 'src/screens/MakeAPurchase.screen';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="AddChild"
        component={AddChildScreen}
        options={{ title: 'Add Child' }}
      />
      <Stack.Screen name="Cards" component={CardsScreen} />
      <Stack.Screen
        name="UpdateCard"
        component={UpdateCardScreen}
        options={{ title: 'Update Card' }}
      />
      <Stack.Screen
        name="MakeAPurchase"
        component={MakeAPurchaseScreenScreen}
        options={{ title: 'Purchase' }}
      />
      <Stack.Screen name="AddCard" component={AddCardScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
