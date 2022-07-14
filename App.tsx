import React from 'react';
import RootNavigator from './src/navigators/RootNavigator';
import "react-native-gesture-handler";
import { Provider as ReduxProvider } from "react-redux";

import { store } from "./src/store";

export default function App() {
  return (
    <ReduxProvider store={store}>
      <RootNavigator />
 
    </ReduxProvider>
  );
}