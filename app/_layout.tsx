// _layout.js
import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { auth } from './config/Firebase';
import LoginScreen from './(Login)/LoginScreen';
import LandingScreen from './(Landing)/LandingScreen';
import Main from './(Main)/_layout';
import Settings from './(Settings)/Settings';
import CatalogueScreen from './(Catalogue)/CatalogueScreen';
import StoreScreen from './(Store)/StoreScreen';
import Category from './(Category)/CategoryScreen';

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
        <>
        <Stack.Screen name="(Main)" component={Main} options={{ headerShown: false }}/>
        <Stack.Screen name="(Settings)" component={Settings} options={{ headerShown: false }}/>
        <Stack.Screen name="(Catalogue)" component={CatalogueScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="(Store)" component={StoreScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="(Category)" component={Category} options={{ headerShown: false }}/>

        </>

    ) : (
      <>
      <Stack.Screen name="(Landing)" component={LandingScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="(Login)" component={LoginScreen} options={{ headerShown: false }}/>
        </>
        
      )}
    </Stack.Navigator>
  );
};

export default Layout;
