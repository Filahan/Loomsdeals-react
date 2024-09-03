import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { auth } from './config/Firebase';
import Main from './(Main)/_layout';
import Settings from './(Settings)/Settings';
import CatalogueScreen from './(Catalogue)/CatalogueScreen';
import StoreScreen from './(Store)/StoreScreen';
import CategoryScreen from './(Main)/(Home)/CategoryScreen';
import SigninScreen from './(Auth)/SigninScreen';
import SignupScreen from './(Auth)/SignupScreen';
import ForgotPasswordScreen from './(Auth)/ForgotPasswordScreen';

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
          <Stack.Screen name="(Main)/(Home)" component={CategoryScreen} options={{ headerShown: false }}/>
        </>
      ) : (
        <>
          {/* <Stack.Screen name="(Landing)" component={LandingScreen} options={{ headerShown: false }}/> */}
          <Stack.Screen name="(Auth)/SigninScreen" component={SigninScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="(Auth)/SignupScreen" component={SignupScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="(Auth)/ForgotPasswordScreen" component={ForgotPasswordScreen} options={{ headerShown: false }}/>
        </>
      )}
    </Stack.Navigator>
  );
};

export default Layout;
