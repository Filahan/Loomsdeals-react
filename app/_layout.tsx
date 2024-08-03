// _layout.js
import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { auth } from './config/Firebase';
import LoginScreen from './(LoginScreen)/LoginScreen';
import HomeScreen from './(Home)/HomeScreen';

const Stack = createStackNavigator();

const Layout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  if (isAuthenticated === null) {
    return null; // or a loading spinner
  }

  return (
    <Stack.Navigator>
      {isAuthenticated ? (
        <Stack.Screen name="(Home)" component={HomeScreen} options={{ headerShown: false }}/>
    ) : (
        <Stack.Screen name="(LoginScreen)" component={LoginScreen} options={{ headerShown: false }}/>
      )}
    </Stack.Navigator>
  );
};

export default Layout;
