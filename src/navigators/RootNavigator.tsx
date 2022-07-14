import { View, Text } from 'react-native';
import React from 'react';
import { NavigationContainer, NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllExpensesScreen from '../screens/AllExpensesScreen';
import DrawerScreen from '../screens/DrawerScreen';
import AddExpanseNavigator, { AddExpanseParamList } from './AddExpanseNavigator';
import CategoryScreen from '../screens/CategoryScreen';
import FilterExpansesNavigator, {
  FilterExpanseParamList,
} from "./FilterExpansesNavigator";
import DefaultExpensesScreen from '../screens/DefaultExpensesScreen';
export type RootParamList = {
  List: undefined;
  AllExpenses: undefined;
  DefaultScreen: undefined;
  Category: {
    id: string;
  };
  AddExpanse: NavigatorScreenParams<AddExpanseParamList>;
  FilterExpanses: NavigatorScreenParams<FilterExpanseParamList>;
};
const RootStack = createNativeStackNavigator<RootParamList>();
const RootNavigator = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="List">
        <RootStack.Screen
          name="AllExpenses"
          component={AllExpensesScreen}
          options={{ headerTitle: 'All Expenses', headerShown: false }}
        />
        <RootStack.Screen
          name="List"
          component={DrawerScreen}
          options={{ title: 'Menu' }}
        />
        <RootStack.Screen name="Category" component={CategoryScreen} options={{ headerShown: false }} />
        <RootStack.Screen name="DefaultScreen" component={DefaultExpensesScreen} />
        <RootStack.Screen name="AddExpanse" component={AddExpanseNavigator} options={{ headerShown: false }} />
        <RootStack.Screen
          name="FilterExpanses"
          component={FilterExpansesNavigator}
          options={{ headerShown: false }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
