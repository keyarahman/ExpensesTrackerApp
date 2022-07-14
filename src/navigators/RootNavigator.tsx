import { View, Text } from 'react-native';
import React from 'react';
import { NavigationContainer, NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllExpensesScreen from '../screens/AllExpensesScreen';
import DrawerScreen from '../screens/DrawerScreen';
import AddExpanseNavigator, { AddExpanseParamList } from './AddExpanseNavigator';
import CategoryScreen from '../screens/CategoryScreen';

export type RootParamList = {
  List: undefined;
  AllExpenses: undefined;
  Category: {
    id: string;
  };
  AddExpanse: NavigatorScreenParams<AddExpanseParamList>;

};
const RootStack = createNativeStackNavigator<RootParamList>();
const RootNavigator = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="List">
        <RootStack.Screen
          name="AllExpenses"
          component={AllExpensesScreen}
          options={{ headerTitle: 'All Expenses' }}
        />
        <RootStack.Screen
          name="List"
          component={DrawerScreen}
          options={{ title: 'Menu' }}
        />
        <RootStack.Screen name="Category" component={CategoryScreen} />
        <RootStack.Screen name="AddExpanse" component={AddExpanseNavigator} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
