import React from 'react'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../src/screens/HomeScreen';
import Register from '../src/screens/Register';
import Login from '../src/screens/Login';
import ForgotPassword from '../src/screens/ForgotPassword';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
}