import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import AppListScreen from '../screens/app/AppListScreen/AppListScreen';
import HomeScreen from '../screens/app/HomeScreen/HomeScreen';
import CodeScreen from '../screens/app/CodeScreen/CodeScreen';
import {ScreenWidth} from '../utils/Dimensions';
import {SettingsContext} from '../context/auth/SettingsContext';
import {createStackNavigator} from '@react-navigation/stack';
import {light} from '../colors/colors';
import Settings from '../screens/app/Settings/Settings';

const App = createMaterialTopTabNavigator();
const Home = createStackNavigator();

const HomeStack = () => {
  return (
    <Home.Navigator
      initialRouteName="Home"
      screenOptions={{header: () => null}}>
      <Home.Screen name="Home" component={HomeScreen} />
      <Home.Screen name="Settings" component={Settings} />
    </Home.Navigator>
  );
};

const AppNavigator = () => {
  const settingsContext = React.useContext(SettingsContext);
  const {settings} = settingsContext;
  const {theme} = settings;
  return (
    <App.Navigator
      initialRouteName="HomeStack"
      backBehavior="initialRoute"
      initialLayout={{width: ScreenWidth}}
      sceneContainerStyle={{
        backgroundColor: theme === 'dark' ? '#000' : light.background,
      }}
      screenOptions={{header: () => null}}
      tabBar={() => null}>
      <App.Screen name="Code" component={CodeScreen} />
      <App.Screen name="HomeStack" component={HomeStack} />
      <App.Screen name="AppList" component={AppListScreen} />
    </App.Navigator>
  );
};

export default AppNavigator;
