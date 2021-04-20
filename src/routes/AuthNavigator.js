import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/auth/Login/LoginScreen';

const Auth = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Auth.Navigator
      initialRouteName="Login"
      screenOptions={{header: () => null}}>
      <Auth.Screen name="Login" component={LoginScreen} />
    </Auth.Navigator>
  );
};

export default AuthNavigator;
