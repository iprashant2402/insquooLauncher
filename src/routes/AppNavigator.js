import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import AppListScreen from '../screens/app/AppListScreen/AppListScreen';
import HomeScreen from '../screens/app/HomeScreen/HomeScreen';
import CodeScreen from '../screens/app/CodeScreen/CodeScreen';

const App = createMaterialTopTabNavigator();

const AppNavigator = () => {
  return (
    <App.Navigator
      initialRouteName="Home"
      screenOptions={{header: () => null}}
      tabBar={() => null}>
      <App.Screen name="Code" component={CodeScreen} />
      <App.Screen name="Home" component={HomeScreen} />
      <App.Screen name="AppList" component={AppListScreen} />
    </App.Navigator>
  );
};

export default AppNavigator;
