import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import AppListScreen from '../screens/app/AppListScreen/AppListScreen';
import HomeScreen from '../screens/app/HomeScreen/HomeScreen';
import CodeScreen from '../screens/app/CodeScreen/CodeScreen';
import {ScreenWidth} from '../utils/Dimensions';
import {ThemeContext} from '../context/auth/ThemeContext';
import {light} from '../colors/colors';

const App = createMaterialTopTabNavigator();

const AppNavigator = () => {
  const themeContext = React.useContext(ThemeContext);
  const {theme, updateTheme} = themeContext;
  return (
    <App.Navigator
      initialRouteName="Home"
      backBehavior="initialRoute"
      initialLayout={{width: ScreenWidth}}
      sceneContainerStyle={{
        backgroundColor: theme === 'dark' ? '#000' : light.background,
      }}
      screenOptions={{header: () => null}}
      tabBar={() => null}>
      <App.Screen name="Code" component={CodeScreen} />
      <App.Screen name="Home" component={HomeScreen} />
      <App.Screen name="AppList" component={AppListScreen} />
    </App.Navigator>
  );
};

export default AppNavigator;
