import React, { useEffect } from 'react';
import RootNavigator from './src/navigators/RootNavigator';
import "react-native-gesture-handler";
import { Provider as ReduxProvider } from "react-redux";

import { store } from "./src/store";
import SplashScreen from 'react-native-splash-screen'
export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, [])
  return (
    <ReduxProvider store={store}>
      <RootNavigator />

    </ReduxProvider>
  );
}